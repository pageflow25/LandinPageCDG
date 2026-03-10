alter table public.profiles
add column if not exists is_active boolean not null default true;

alter table public.profiles
drop constraint if exists profiles_role_check;

alter table public.profiles
add constraint profiles_role_check check (role in ('admin', 'comercial', 'indicator'));

create or replace function public.is_comercial()
returns boolean
language sql
stable
as $$
    select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role', '') = 'comercial';
$$;

create or replace function public.can_manage_referrals()
returns boolean
language sql
stable
as $$
    select public.is_admin() or public.is_comercial();
$$;

drop policy if exists "referrals_select_own_or_admin" on public.referrals;
create policy "referrals_select_own_or_admin"
on public.referrals
for select
using (
    affiliate_profile_id = auth.uid()
    or lower(affiliate_email) = lower(coalesce(auth.email(), ''))
    or public.can_manage_referrals()
);

drop policy if exists "referrals_admin_update" on public.referrals;
create policy "referrals_admin_update"
on public.referrals
for update
using (
    public.can_manage_referrals()
)
with check (
    public.can_manage_referrals()
);

drop policy if exists "referral_events_select_own_or_admin" on public.referral_events;
create policy "referral_events_select_own_or_admin"
on public.referral_events
for select
using (
    exists (
        select 1
        from public.referrals referral
        where referral.id = referral_events.referral_id
          and (
              referral.affiliate_profile_id = auth.uid()
              or lower(referral.affiliate_email) = lower(coalesce(auth.email(), ''))
              or public.can_manage_referrals()
          )
    )
);

create table if not exists public.referral_status_history (
    id uuid primary key default gen_random_uuid(),
    referral_id uuid not null references public.referrals(id) on delete cascade,
    old_status text,
    new_status text not null check (new_status in ('pending', 'contacted', 'converted', 'rejected')),
    note text,
    changed_by uuid not null references auth.users(id) on delete restrict,
    changed_by_email text,
    changed_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_referral_status_history_referral on public.referral_status_history (referral_id, changed_at desc);
create index if not exists idx_referral_status_history_actor on public.referral_status_history (changed_by, changed_at desc);

alter table public.referral_status_history enable row level security;

drop policy if exists "referral_status_history_select_admin_only" on public.referral_status_history;
create policy "referral_status_history_select_admin_only"
on public.referral_status_history
for select
using (public.is_admin());

drop policy if exists "referral_status_history_insert_staff" on public.referral_status_history;
create policy "referral_status_history_insert_staff"
on public.referral_status_history
for insert
with check (
    public.can_manage_referrals()
    and changed_by = auth.uid()
);

create table if not exists public.admin_user_actions (
    id uuid primary key default gen_random_uuid(),
    target_user_id uuid not null references auth.users(id) on delete restrict,
    action_type text not null check (action_type in ('create_user', 'update_user', 'reset_password', 'deactivate_user', 'reactivate_user')),
    payload jsonb,
    performed_by uuid not null references auth.users(id) on delete restrict,
    performed_by_email text,
    created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_admin_user_actions_target on public.admin_user_actions (target_user_id, created_at desc);
create index if not exists idx_admin_user_actions_actor on public.admin_user_actions (performed_by, created_at desc);

alter table public.admin_user_actions enable row level security;

drop policy if exists "admin_user_actions_select_admin_only" on public.admin_user_actions;
create policy "admin_user_actions_select_admin_only"
on public.admin_user_actions
for select
using (public.is_admin());

drop policy if exists "admin_user_actions_insert_admin_only" on public.admin_user_actions;
create policy "admin_user_actions_insert_admin_only"
on public.admin_user_actions
for insert
with check (
    public.is_admin()
    and performed_by = auth.uid()
);

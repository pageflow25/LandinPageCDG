create extension if not exists pgcrypto;

create table if not exists public.campaigns (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    name text not null,
    description text,
    active boolean not null default true,
    start_date date,
    end_date date,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    email text not null unique,
    role text not null default 'indicator' check (role in ('admin', 'indicator')),
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.referrals (
    id uuid primary key default gen_random_uuid(),
    campaign_id uuid references public.campaigns(id) on delete set null,
    campaign_slug text not null,
    source text not null default 'landing-page',
    status text not null default 'pending' check (status in ('pending', 'contacted', 'converted', 'rejected')),
    affiliate_profile_id uuid references public.profiles(id) on delete set null,
    affiliate_name text not null,
    affiliate_email text not null,
    affiliate_phone text not null,
    referred_name text not null,
    referred_email text not null,
    referred_phone text not null,
    payload_snapshot jsonb,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.referral_events (
    id uuid primary key default gen_random_uuid(),
    referral_id uuid not null references public.referrals(id) on delete cascade,
    event_type text not null,
    payload jsonb,
    created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_referrals_affiliate_email on public.referrals (affiliate_email);
create index if not exists idx_referrals_status on public.referrals (status);
create index if not exists idx_referrals_campaign_slug on public.referrals (campaign_slug);
create index if not exists idx_referrals_created_at on public.referrals (created_at desc);
create index if not exists idx_profiles_role on public.profiles (role);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = timezone('utc', now());
    return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
    select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role', '') = 'admin';
$$;

drop trigger if exists campaigns_set_updated_at on public.campaigns;
create trigger campaigns_set_updated_at
before update on public.campaigns
for each row execute procedure public.set_updated_at();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists referrals_set_updated_at on public.referrals;
create trigger referrals_set_updated_at
before update on public.referrals
for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, full_name, email, role)
    values (
        new.id,
        coalesce(new.raw_user_meta_data ->> 'full_name', ''),
        coalesce(new.email, ''),
        coalesce(new.raw_app_meta_data ->> 'role', new.raw_user_meta_data ->> 'role', 'indicator')
    )
    on conflict (id) do update
    set
        full_name = excluded.full_name,
        email = excluded.email,
        role = excluded.role,
        updated_at = timezone('utc', now());

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user_profile();

alter table public.campaigns enable row level security;
alter table public.profiles enable row level security;
alter table public.referrals enable row level security;
alter table public.referral_events enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
using (
    auth.uid() = id
    or public.is_admin()
);

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
on public.profiles
for update
using (
    auth.uid() = id
    or public.is_admin()
)
with check (
    auth.uid() = id
    or public.is_admin()
);

drop policy if exists "campaigns_admin_read" on public.campaigns;
create policy "campaigns_admin_read"
on public.campaigns
for select
using (
    public.is_admin()
);

drop policy if exists "referrals_select_own_or_admin" on public.referrals;
create policy "referrals_select_own_or_admin"
on public.referrals
for select
using (
    affiliate_profile_id = auth.uid()
    or lower(affiliate_email) = lower(coalesce(auth.email(), ''))
    or public.is_admin()
);

drop policy if exists "referrals_admin_update" on public.referrals;
create policy "referrals_admin_update"
on public.referrals
for update
using (
    public.is_admin()
)
with check (
    public.is_admin()
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
              or public.is_admin()
          )
    )
);

drop policy if exists "profiles_insert_admin_only" on public.profiles;
create policy "profiles_insert_admin_only"
on public.profiles
for insert
with check (
    auth.uid() = id
    or public.is_admin()
);

insert into public.campaigns (slug, name, description, active)
values (
    'educacao-comvida-2026',
    'Educação ComVida 2026',
    'Campanha principal de indicação da landing page.',
    true
)
on conflict (slug) do nothing;
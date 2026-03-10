create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
    select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role', '') = 'admin';
$$;

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

drop policy if exists "profiles_insert_admin_only" on public.profiles;
create policy "profiles_insert_admin_only"
on public.profiles
for insert
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
-- Update the handle_new_user function to support Google OAuth metadata.
-- Google OAuth provides the user's name under the "full_name" key (mapped by
-- Supabase) but may also appear as "name". We check both.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      ''
    )
  );
  return new;
end;
$$ language plpgsql security definer;

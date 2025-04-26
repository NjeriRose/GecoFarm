-- Drop existing tables, functions, and triggers
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.users cascade;

-- Create users table
create table public.users (
    id uuid references auth.users on delete cascade primary key,
    name text not null,
    email text not null unique,
    role jsonb not null,
    profile_photo text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.users enable row level security;

-- Create policies
create policy "Allow full access to authenticated users"
    on public.users
    using ( true )
    with check ( true );

-- Create function to handle user creation
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.users (id, name, email, role, profile_photo)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        new.email,
        case 
            when new.email = 'admin@gecofarm.com' then 
                '{"type": "admin", "position": "Farm Manager"}'::jsonb
            else 
                '{"type": "employee", "position": "Farm Attendant"}'::jsonb
        end,
        case 
            when new.email = 'admin@gecofarm.com' then 
                'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
            else 
                'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
        end
    );
    return new;
end;
$$;

-- Create trigger for new user creation
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user(); 
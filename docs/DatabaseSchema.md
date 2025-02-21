# CozyArcade Database Schema

## Core Philosophy

- Simple, yet extensible
- Minimize redundancy
- Support all MVP features
- Easy to query and maintain

## Tables

### ✅ profiles

_Extends Supabase Auth - Created automatically on user signup_

```sql
create table profiles (
  id uuid references auth.users primary key,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### ✅ games

_Core game information_

```sql
create table games (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description text,
  thumbnail_url text,
  game_url text not null,
  category text not null,
  is_featured boolean default false,
  play_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### ✅ user_game_progress

_Tracks individual user progress in games_

```sql
create table user_game_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) not null,
  game_id uuid references games(id) not null,
  high_score integer default 0,
  last_played_at timestamp with time zone,
  play_time_seconds integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, game_id)
);
```

## ✅ Indexes

```sql
-- For efficient username lookups
create index profiles_username_idx on profiles (username);

-- For game discovery
create index games_category_idx on games (category);
create index games_is_featured_idx on games (is_featured);

-- For leaderboards
create index user_game_progress_score_idx on user_game_progress (game_id, high_score desc);
```

## Row Level Security (RLS) Policies

### ✅ profiles

```sql
-- Anyone can view profiles
create policy "Profiles are viewable by everyone" on profiles
  for select using (true);

-- Users can only update their own profile
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);
```

### ✅ games

```sql
-- Anyone can view games
create policy "Games are viewable by everyone" on games
  for select using (true);

-- Only admins can modify games (handled through Supabase dashboard)
```

### ✅ user_game_progress

```sql
-- Users can view all progress (for leaderboards)
create policy "Progress is viewable by everyone" on user_game_progress
  for select using (true);

-- Users can only update their own progress
create policy "Users can update own progress" on user_game_progress
  for update using (auth.uid() = user_id);

-- Users can only insert their own progress
create policy "Users can insert own progress" on user_game_progress
  for insert with check (auth.uid() = user_id);
```

## Functions

### ✅ update_high_score

```sql
create or replace function update_high_score(
  p_user_id uuid,
  p_game_id uuid,
  p_score integer
) returns void as $$
begin
  insert into user_game_progress (user_id, game_id, high_score, last_played_at)
  values (p_user_id, p_game_id, p_score, now())
  on conflict (user_id, game_id)
  do update set
    high_score = greatest(user_game_progress.high_score, p_score),
    last_played_at = now(),
    updated_at = now();
end;
$$ language plpgsql security definer;
```

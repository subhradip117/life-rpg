-- ============================================================
-- LIFE RPG - INITIAL DATABASE MIGRATION
-- ============================================================

-- ============================================================
-- ENUM TYPES
-- ============================================================

create type public.task_category as enum (
  'intellect',
  'strength',
  'discipline',
  'stamina'
);

create type public.task_difficulty as enum (
  'easy',
  'medium',
  'hard',
  'epic'
);

create type public.shop_item_type as enum (
  'badge',
  'theme',
  'cosmetic',
  'title'
);


-- ============================================================
-- PROFILES
-- ============================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  username text not null unique,

  level integer not null default 1
    check (level >= 1),

  total_xp bigint not null default 0
    check (total_xp >= 0),

  gold bigint not null default 0
    check (gold >= 0),

  current_streak integer not null default 0
    check (current_streak >= 0),

  longest_streak integer not null default 0
    check (longest_streak >= 0),

  last_activity_date date,

  character_title text not null
    default 'Novice Adventurer',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- ATTRIBUTES
-- ============================================================

create table public.attributes (
  user_id uuid primary key
    references public.profiles(id)
    on delete cascade,

  strength integer not null default 0
    check (strength >= 0),

  intellect integer not null default 0
    check (intellect >= 0),

  discipline integer not null default 0
    check (discipline >= 0),

  stamina integer not null default 0
    check (stamina >= 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- TASKS / QUESTS
-- ============================================================

create table public.tasks (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  title text not null
    check (char_length(trim(title)) between 1 and 120),

  description text,

  category public.task_category not null,

  difficulty public.task_difficulty not null default 'easy',

  status text not null default 'pending'
    check (status in ('pending', 'completed')),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- TASK COMPLETION HISTORY
-- ============================================================

create table public.task_completions (
  id uuid primary key default gen_random_uuid(),

  task_id uuid not null unique
    references public.tasks(id)
    on delete restrict,

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  completed_at timestamptz not null default now(),

  xp_earned integer not null
    check (xp_earned > 0),

  gold_earned integer not null
    check (gold_earned >= 0),

  attribute public.task_category not null,

  attribute_gain integer not null default 1
    check (attribute_gain > 0)
);


-- ============================================================
-- DAILY ACTIVITY LOGS
-- ============================================================

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  activity_date date not null,

  tasks_completed integer not null default 0
    check (tasks_completed >= 0),

  xp_earned integer not null default 0
    check (xp_earned >= 0),

  gold_earned integer not null default 0
    check (gold_earned >= 0),

  created_at timestamptz not null default now(),

  unique (user_id, activity_date)
);


-- ============================================================
-- SHOP ITEMS
-- ============================================================

create table public.shop_items (
  id uuid primary key default gen_random_uuid(),

  name text not null,

  description text,

  item_type public.shop_item_type not null,

  price bigint not null
    check (price >= 0),

  image_url text,

  metadata jsonb not null default '{}'::jsonb,

  is_active boolean not null default true,

  created_at timestamptz not null default now()
);


-- ============================================================
-- INVENTORY
-- ============================================================

create table public.inventory (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  item_id uuid not null
    references public.shop_items(id)
    on delete restrict,

  quantity integer not null default 1
    check (quantity > 0),

  is_equipped boolean not null default false,

  purchased_at timestamptz not null default now(),

  unique (user_id, item_id)
);


-- ============================================================
-- TRAIT DEFINITIONS
-- ============================================================

create table public.trait_definitions (
  id uuid primary key default gen_random_uuid(),

  code text not null unique,

  name text not null,

  description text not null,

  created_at timestamptz not null default now()
);


-- ============================================================
-- USER TRAITS
-- ============================================================

create table public.user_traits (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  trait_id uuid not null
    references public.trait_definitions(id)
    on delete cascade,

  unlocked_at timestamptz not null default now(),

  unique (user_id, trait_id)
);


-- ============================================================
-- INDEXES
-- ============================================================

create index tasks_user_id_idx
on public.tasks(user_id);

create index tasks_created_at_idx
on public.tasks(created_at desc);

create index task_completions_user_id_idx
on public.task_completions(user_id);

create index task_completions_completed_at_idx
on public.task_completions(completed_at desc);

create index activity_logs_user_id_date_idx
on public.activity_logs(user_id, activity_date desc);

create index inventory_user_id_idx
on public.inventory(user_id);

create index user_traits_user_id_idx
on public.user_traits(user_id);


-- ============================================================
-- NEW USER PROFILE + ATTRIBUTE CREATION
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  generated_username text;
begin

  generated_username :=
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'username'), ''),
      'Player_' || substr(replace(new.id::text, '-', ''), 1, 8)
    );

  insert into public.profiles (
    id,
    username
  )
  values (
    new.id,
    generated_username
  );

  insert into public.attributes (
    user_id
  )
  values (
    new.id
  );

  return new;
end;
$$;


create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();


-- ============================================================
-- LEVEL CALCULATOR
-- ============================================================

create or replace function public.calculate_level(
  p_xp bigint
)
returns integer
language sql
immutable
as $$
  select greatest(
    1,
    floor(
      power(p_xp::numeric / 100, 2.0 / 3.0)
    )::integer + 1
  );
$$;


-- ============================================================
-- RLS
-- ============================================================

alter table public.profiles enable row level security;
alter table public.attributes enable row level security;
alter table public.tasks enable row level security;
alter table public.task_completions enable row level security;
alter table public.activity_logs enable row level security;
alter table public.shop_items enable row level security;
alter table public.inventory enable row level security;
alter table public.trait_definitions enable row level security;
alter table public.user_traits enable row level security;


-- ============================================================
-- PROFILES POLICIES
-- ============================================================

create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);


-- ============================================================
-- ATTRIBUTES POLICIES
-- ============================================================

create policy "Users can view own attributes"
on public.attributes
for select
to authenticated
using (auth.uid() = user_id);


-- ============================================================
-- TASK POLICIES
-- ============================================================

create policy "Users can view own tasks"
on public.tasks
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create own tasks"
on public.tasks
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own tasks"
on public.tasks
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own tasks"
on public.tasks
for delete
to authenticated
using (auth.uid() = user_id);


-- ============================================================
-- COMPLETION HISTORY POLICIES
-- ============================================================

create policy "Users can view own completion history"
on public.task_completions
for select
to authenticated
using (auth.uid() = user_id);


-- ============================================================
-- ACTIVITY LOG POLICIES
-- ============================================================

create policy "Users can view own activity logs"
on public.activity_logs
for select
to authenticated
using (auth.uid() = user_id);


-- ============================================================
-- SHOP POLICIES
-- ============================================================

create policy "Authenticated users can view shop"
on public.shop_items
for select
to authenticated
using (is_active = true);


-- ============================================================
-- INVENTORY POLICIES
-- ============================================================

create policy "Users can view own inventory"
on public.inventory
for select
to authenticated
using (auth.uid() = user_id);


-- ============================================================
-- TRAIT POLICIES
-- ============================================================

create policy "Authenticated users can view trait definitions"
on public.trait_definitions
for select
to authenticated
using (true);

create policy "Users can view own traits"
on public.user_traits
for select
to authenticated
using (auth.uid() = user_id);


-- ============================================================
-- COMPLETE TASK FUNCTION
-- ============================================================

create or replace function public.complete_task(
  p_task_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_task public.tasks%rowtype;

  v_xp integer;
  v_gold integer;

  v_old_level integer;
  v_new_level integer;

  v_old_xp bigint;
  v_new_xp bigint;

  v_new_streak integer;
  v_longest_streak integer;

  v_today date;
  v_last_activity date;

  v_level_up boolean := false;
  v_attribute_gain integer := 1;

  v_character_title text;
begin

  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'You must be logged in.';
  end if;


  -- Verify task ownership and lock the row.
  select *
  into v_task
  from public.tasks
  where id = p_task_id
    and user_id = v_user_id
  for update;

  if not found then
    raise exception 'Task not found or does not belong to you.';
  end if;


  -- Prevent duplicate completion.
  if v_task.status = 'completed'
     or exists (
       select 1
       from public.task_completions
       where task_id = p_task_id
     )
  then
    raise exception 'This task has already been completed.';
  end if;


  -- Trusted server-side rewards.
  case v_task.difficulty
    when 'easy' then
      v_xp := 50;
      v_gold := 10;

    when 'medium' then
      v_xp := 100;
      v_gold := 25;

    when 'hard' then
      v_xp := 175;
      v_gold := 50;

    when 'epic' then
      v_xp := 300;
      v_gold := 100;
  end case;


  -- Lock player profile.
  select
    level,
    total_xp,
    current_streak,
    longest_streak,
    last_activity_date
  into
    v_old_level,
    v_old_xp,
    v_new_streak,
    v_longest_streak,
    v_last_activity
  from public.profiles
  where id = v_user_id
  for update;

  if not found then
    raise exception 'Player profile not found.';
  end if;


  -- XP update.
  v_new_xp := v_old_xp + v_xp;


  -- Level update.
  v_new_level := public.calculate_level(v_new_xp);

  if v_new_level > v_old_level then
    v_level_up := true;
  end if;


  -- Streak calculation.
  v_today := current_date;

  if v_last_activity is null then
    v_new_streak := 1;

  elsif v_last_activity = v_today then
    v_new_streak := v_new_streak;

  elsif v_last_activity = v_today - 1 then
    v_new_streak := v_new_streak + 1;

  else
    v_new_streak := 1;
  end if;


  if v_new_streak > v_longest_streak then
    v_longest_streak := v_new_streak;
  end if;


  -- Update profile.
  update public.profiles
  set
    level = v_new_level,
    total_xp = v_new_xp,
    gold = gold + v_gold,
    current_streak = v_new_streak,
    longest_streak = v_longest_streak,
    last_activity_date = v_today,
    updated_at = now()
  where id = v_user_id;


  -- Update the correct attribute.
  if v_task.category = 'intellect' then

    update public.attributes
    set
      intellect = intellect + v_attribute_gain,
      updated_at = now()
    where user_id = v_user_id;

  elsif v_task.category = 'strength' then

    update public.attributes
    set
      strength = strength + v_attribute_gain,
      updated_at = now()
    where user_id = v_user_id;

  elsif v_task.category = 'discipline' then

    update public.attributes
    set
      discipline = discipline + v_attribute_gain,
      updated_at = now()
    where user_id = v_user_id;

  elsif v_task.category = 'stamina' then

    update public.attributes
    set
      stamina = stamina + v_attribute_gain,
      updated_at = now()
    where user_id = v_user_id;

  end if;


  -- Mark task completed.
  update public.tasks
  set
    status = 'completed',
    updated_at = now()
  where id = v_task.id
    and user_id = v_user_id;


  -- Permanent completion history.
  insert into public.task_completions (
    task_id,
    user_id,
    completed_at,
    xp_earned,
    gold_earned,
    attribute,
    attribute_gain
  )
  values (
    v_task.id,
    v_user_id,
    now(),
    v_xp,
    v_gold,
    v_task.category,
    v_attribute_gain
  );


  -- Daily activity log.
  insert into public.activity_logs (
    user_id,
    activity_date,
    tasks_completed,
    xp_earned,
    gold_earned
  )
  values (
    v_user_id,
    v_today,
    1,
    v_xp,
    v_gold
  )
  on conflict (user_id, activity_date)
  do update
  set
    tasks_completed =
      public.activity_logs.tasks_completed + 1,

    xp_earned =
      public.activity_logs.xp_earned + v_xp,

    gold_earned =
      public.activity_logs.gold_earned + v_gold;


  -- Curious.
  insert into public.user_traits (user_id, trait_id)
  select v_user_id, id
  from public.trait_definitions
  where code = 'curious'
    and (
      select intellect
      from public.attributes
      where user_id = v_user_id
    ) >= 10
  on conflict (user_id, trait_id) do nothing;


  -- Strong.
  insert into public.user_traits (user_id, trait_id)
  select v_user_id, id
  from public.trait_definitions
  where code = 'strong'
    and (
      select strength
      from public.attributes
      where user_id = v_user_id
    ) >= 10
  on conflict (user_id, trait_id) do nothing;


  -- Disciplined.
  insert into public.user_traits (user_id, trait_id)
  select v_user_id, id
  from public.trait_definitions
  where code = 'disciplined'
    and (
      select discipline
      from public.attributes
      where user_id = v_user_id
    ) >= 10
  on conflict (user_id, trait_id) do nothing;


  -- Energetic.
  insert into public.user_traits (user_id, trait_id)
  select v_user_id, id
  from public.trait_definitions
  where code = 'energetic'
    and (
      select stamina
      from public.attributes
      where user_id = v_user_id
    ) >= 10
  on conflict (user_id, trait_id) do nothing;


  -- Focused.
  insert into public.user_traits (user_id, trait_id)
  select v_user_id, id
  from public.trait_definitions
  where code = 'focused'
    and v_new_xp >= 500
  on conflict (user_id, trait_id) do nothing;


  -- Consistent.
  insert into public.user_traits (user_id, trait_id)
  select v_user_id, id
  from public.trait_definitions
  where code = 'consistent'
    and v_new_streak >= 7
  on conflict (user_id, trait_id) do nothing;


  -- Resilient.
  insert into public.user_traits (user_id, trait_id)
  select v_user_id, id
  from public.trait_definitions
  where code = 'resilient'
    and v_new_streak >= 30
  on conflict (user_id, trait_id) do nothing;


  -- Character title.
  select
    case

      when intellect >= strength
       and intellect >= discipline
       and intellect >= stamina
        then 'Curious Scholar'

      when strength >= intellect
       and strength >= discipline
       and strength >= stamina
        then 'Relentless Warrior'

      when discipline >= intellect
       and discipline >= strength
       and discipline >= stamina
        then 'Disciplined Strategist'

      when stamina >= intellect
       and stamina >= strength
       and stamina >= discipline
        then 'Resilient Runner'

      else
        'Balanced Adventurer'

    end
  into v_character_title
  from public.attributes
  where user_id = v_user_id;


  update public.profiles
  set
    character_title = v_character_title,
    updated_at = now()
  where id = v_user_id;


  return jsonb_build_object(
    'success', true,
    'task_id', v_task.id,
    'xp_earned', v_xp,
    'gold_earned', v_gold,
    'attribute', v_task.category,
    'attribute_gain', v_attribute_gain,
    'new_xp', v_new_xp,
    'new_level', v_new_level,
    'level_up', v_level_up,
    'current_streak', v_new_streak,
    'longest_streak', v_longest_streak,
    'character_title', v_character_title
  );

end;
$$;


-- ============================================================
-- SECURE EXECUTION FOR COMPLETE TASK
-- ============================================================

revoke execute on function public.complete_task(uuid)
from public;

revoke execute on function public.complete_task(uuid)
from anon;

grant execute on function public.complete_task(uuid)
to authenticated;


-- ============================================================
-- SECURE SHOP PURCHASE FUNCTION
-- ============================================================

create or replace function public.purchase_item(
  p_item_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;

  v_item public.shop_items%rowtype;

  v_current_gold bigint;
  v_new_gold bigint;
begin

  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'You must be logged in.';
  end if;


  -- Get active item.
  select *
  into v_item
  from public.shop_items
  where id = p_item_id
    and is_active = true;

  if not found then
    raise exception 'Shop item not found or unavailable.';
  end if;


  -- Lock profile balance.
  select gold
  into v_current_gold
  from public.profiles
  where id = v_user_id
  for update;

  if not found then
    raise exception 'Player profile not found.';
  end if;


  -- Check balance.
  if v_current_gold < v_item.price then
    raise exception 'Not enough Gold.';
  end if;


  v_new_gold := v_current_gold - v_item.price;


  -- Deduct Gold.
  update public.profiles
  set
    gold = v_new_gold,
    updated_at = now()
  where id = v_user_id;


  -- Add to inventory.
  insert into public.inventory (
    user_id,
    item_id,
    quantity,
    is_equipped
  )
  values (
    v_user_id,
    v_item.id,
    1,
    false
  )
  on conflict (user_id, item_id)
  do update
  set
    quantity = public.inventory.quantity + 1;


  return jsonb_build_object(
    'success', true,
    'item_id', v_item.id,
    'item_name', v_item.name,
    'price', v_item.price,
    'gold_remaining', v_new_gold
  );

end;
$$;


-- ============================================================
-- SECURE EXECUTION FOR SHOP PURCHASE
-- ============================================================

revoke execute on function public.purchase_item(uuid)
from public;

revoke execute on function public.purchase_item(uuid)
from anon;

grant execute on function public.purchase_item(uuid)
to authenticated;


-- ============================================================
-- TRAITS SEED DATA
-- ============================================================

insert into public.trait_definitions
  (code, name, description)
values
  (
    'curious',
    'Curious',
    'You consistently invest in learning and intellectual growth.'
  ),
  (
    'strong',
    'Strong',
    'You regularly challenge yourself physically.'
  ),
  (
    'disciplined',
    'Disciplined',
    'You consistently build and maintain productive routines.'
  ),
  (
    'energetic',
    'Energetic',
    'You maintain strong stamina through active habits.'
  ),
  (
    'focused',
    'Focused',
    'You have accumulated significant experience through completed quests.'
  ),
  (
    'consistent',
    'Consistent',
    'You have maintained a strong daily activity streak.'
  ),
  (
    'resilient',
    'Resilient',
    'You have demonstrated exceptional long-term consistency.'
  )
on conflict (code) do nothing;


-- ============================================================
-- SHOP SEED DATA
-- ============================================================

insert into public.shop_items
  (name, description, item_type, price)
values
  (
    'Silver Sword',
    'A cosmetic sword representing your growing strength.',
    'cosmetic',
    200
  ),
  (
    'Scholar Badge',
    'A badge for knowledge seekers.',
    'badge',
    200
  ),
  (
    'Focus Theme',
    'A special visual theme for focused adventurers.',
    'theme',
    250
  ),
  (
    'Explorer Crown',
    'A cosmetic crown for experienced adventurers.',
    'cosmetic',
    300
  ),
  (
    'Consistent Title',
    'A title earned through maintaining your streak.',
    'title',
    350
  );
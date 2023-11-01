This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Setup

### Install dependencies

```bash
npm install
```

### Environment variables

Create a .env file containing the following values.
Note: For development, set `NEXT_PUBLIC_PADDLE_SANDBOX` to true and `NEXT_PUBLIC_BASE_URL` to `http://localhost:3000`. Change this for production accordingly.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_TOKEN=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_PADDLE_VENDOR_ID=
NEXT_PUBLIC_PADDLE_PRODUCT_ID=
NEXT_PUBLIC_PADDLE_SANDBOX=true
PADDLE_API_KEY=
PADDLE_PUBLIC_KEY=
```

### Creating your Supabase instance

Create your organization and project at [Supbase](https://supabase.com/). Copy over the `anon` key, the `service_role` secret and the project URL into your newly created .env file.

Once that's done, go the SQL editor and execute the following query. This is a slight modification of the `User Management Starter` template and adds a credits column.

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  credits integer DEFAULT 3,    -- Set default value for credits
  
  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, credits)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 3);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');
```

### Setting up Paddle

In your Paddle account, create a new product and add the relevant environment variables. To test things out locally, I recommend using the [Paddle Sandbox](https://sandbox-vendors.paddle.com/). For the checkout process to work locally, you need to add a webhook which makes `/api/paddle-webhook` available on the web. I am using ngrok for this and thus my webhook looks something like this: `https://some-random-id.ngrok-free.app/api/paddle-webhook`.

When using the sandbox, you can use [Test Credit Cards](https://developer.paddle.com/concepts/payment-methods/credit-debit-card) Paddle provides for the checkout process.

## Learn More

To learn more about the stack, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Supabase Documentation](https://supabase.com/docs) - learn how to get up and running with Supabase through tutorials, APIs and platform resources.
- [Paddle Documentation](https://supabase.com/docs) - learn how to get up and running with Supabase through tutorials, APIs and platform resources.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

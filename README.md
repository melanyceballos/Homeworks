# Challenge 10 · Supabase tasks

## Local setup
1. Run `npm install`.
2. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and the public anon/publishable `VITE_SUPABASE_KEY`. Never use `service_role` in this client.
3. In the Supabase SQL Editor, run `supabase/schema.sql`. It creates the user scoped task table, RLS policies, a private `avatars` bucket, and owner only Storage policies.
4. Enable Email authentication in Authentication > Providers. Configure email confirmation as appropriate for the project.
5. In Database > Publications, enable `public.tasks` in `supabase_realtime`.
6. Run `npm run dev`.

The app uses one Supabase client, Supabase Auth, user scoped CRUD, Postgres change subscriptions, and signed URLs for private avatars. Without real project credentials, external Auth, Storage, RLS and Realtime have not been tested.

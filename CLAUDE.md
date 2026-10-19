# netflix-kul

Full-stack Netflix-style app: a React front end and a Supabase back end.

## Layout
- `front-end/` — React 19 + Vite 8 + react-router-dom app. `src/`, `public/` (posters), `app_outline/` (wireframes, style guide, user journey).
  - Run from `front-end/`: `npm run dev`, `npm run build`, `npm run preview`.
  - Build uses base `/netflix-kul/` and copies `index.html` to `404.html` for GitHub Pages SPA routing.
  - Auth is Supabase email/password; movies and watch history load from Supabase. Needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see `.env.example`; real values in the gitignored `.env.local`).
- `supabase/` — database files.
  - `schema.sql` — users profile table (linked to `auth.users`), `movies`, `watch_history`, `watchlist`, and RLS policies. Mirrors the applied migrations.
  - `seed.sql` — the 13-movie catalog.
  - `backups/` — CSV backups of the old `movies` and `watch_history` tables.
  - `rls_auto_enable()` is a pre-existing helper in the project; keep it.
- `.github/workflows/deploy.yml` — builds `front-end/` (with the Supabase repo secrets) and deploys `front-end/dist` to GitHub Pages on push to `main`.

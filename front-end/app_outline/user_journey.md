# User Journey — Netflix-style Streaming App

**What it is:** A Netflix-style movie app. Users browse movies, search by title or genre, watch them, and review what they've seen.

**Problem:** People want to be entertained, but finding something to watch is slow, and they lose track of what they've already seen.

**User:** One type — a viewer who wants to watch movies and see their own watch history.

## The journey

1. **Logs in** on the **Login** page (`/login`) → after login the user is taken to **Home** (`/`). Login unlocks the app: the user can watch movies and see their own history.
   - **Mistake:** wrong email or password → inline message under the form ("Incorrect email or password"). The email stays filled in.
2. **On Home**, sees a hero banner with a featured movie, then rows of posters (Trending Now, Continue Watching, and one row per genre).
   - First visit (nothing watched yet): the "Continue Watching" row is hidden.
3. **Searches** from the navbar by **title or genre** → results appear as a poster grid.
   - **No match** → "No movies match your search" + [Clear search].
4. **Browses genres** → **Genres** page (`/genres`) shows every genre; tapping one shows all movies of that type (`/genres/:name`).
5. **Taps a movie** → **Movie Detail** (`/movie/:id`) shows poster, description, genre, year and rating. Taps **Play** to watch it.
   - Watching a movie adds it to the user's history and records its genre.
6. **Opens History** (`/history`) → sees every movie they've watched, newest first, plus the genres they watch most.
   - Nothing watched yet → "You haven't watched anything yet" + [Browse movies].
7. **Unknown URL** → a friendly 404 page with a link back Home.

## Data rules

- Data collected: **movies the user watched** and **which genres they like best** (calculated from watch history).
- No backend, no API. All data lives in React state in the browser. **Refreshing the page resets everything** — that's expected for this unit.
- Seed the app with a small catalog (at least 12 movies across 4+ genres) and 2 already-watched movies so History isn't empty on first load.
- Permissions end after login: logged-in users can watch and see their history; there are no further roles.

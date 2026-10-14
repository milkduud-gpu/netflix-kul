# Home page — `/`

**As a** viewer, **I want to** see featured and recommended movies right away, **so that** I can start watching within seconds.

## On this page
- Fixed navbar: logo · Home · History · Genres · search · profile
- Hero banner: featured movie with title, short description, **Play** and **More Info** (→ `/movie/:id`)
- Poster rows: Continue Watching, Trending Now, and one row per genre. Tapping a poster opens `/movie/:id`.
- Search (by title or genre) in the navbar

## States
- **Empty:** nothing watched yet → hide the "Continue Watching" row.
- **Search with no results** → "No movies match your search" + [Clear search].

## Done when
- [ ] Play on the hero opens the featured movie without a full page reload
- [ ] Each genre row only shows movies of that genre
- [ ] Searching "action" or a movie title shows matching posters

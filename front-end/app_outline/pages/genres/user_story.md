# Genres page — `/genres`

**As a** viewer, **I want to** browse movies by genre, **so that** I can see all the types of movies available and pick one I'm in the mood for.

## On this page
- Grid of genre tiles (Action, Comedy, Drama, Horror, Sci-Fi, …). Tap → `/genres/:name`
- Genre view (`/genres/:name`): poster grid of every movie in that genre. Tap → `/movie/:id`
- Search box that filters by title or genre

## States
- Unknown genre → "We couldn't find that genre" + link to Genres
- Genre with no movies → "No movies in this genre yet"

## Done when
- [ ] Every seeded genre has a tile
- [ ] Opening "Comedy" shows only comedies
- [ ] Searching a title from the genre view shows matching posters

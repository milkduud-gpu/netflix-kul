# Movie Detail page — `/movie/:id`

**As a** viewer, **I want to** see a movie's details and watch it, **so that** I can decide and start right away.

## On this page
- Poster/backdrop, title, year, rating, genre tags, description
- **Play** (primary) → marks the movie as watched, adding it to History and updating top genres
- Back link to the previous page

## States
- Unknown id → "We couldn't find that movie" + link Home
- Already watched → show "Watch again" on the Play button

## Done when
- [ ] Play adds the movie to History
- [ ] The genre tags link to that genre's page
- [ ] An unknown id shows the not-found message

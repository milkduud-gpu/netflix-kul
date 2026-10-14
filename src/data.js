export const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']

export const MOVIES = [
  { id: 1, title: 'Iron Horizon', genre: 'Action', year: 2023, rating: 'PG-13', hue: 8, description: 'A retired stunt pilot is pulled back in for one last impossible mission across three continents.' },
  { id: 2, title: 'Last Stand Protocol', genre: 'Action', year: 2022, rating: 'R', hue: 20, description: 'When a skyscraper is locked down by mercenaries, one security guard is the only thing standing in their way.' },
  { id: 3, title: 'Velocity', genre: 'Action', year: 2024, rating: 'PG-13', hue: 35, description: 'Street racers become reluctant spies when a stolen prototype engine changes hands.' },
  { id: 4, title: 'Laugh Track', genre: 'Comedy', year: 2021, rating: 'PG-13', hue: 48, description: 'A struggling comedian accidentally becomes the voice of a viral sitcom laugh track.' },
  { id: 5, title: 'Roommate Rules', genre: 'Comedy', year: 2023, rating: 'PG', hue: 60, description: 'Four mismatched roommates sign a lease with one very strange clause.' },
  { id: 6, title: 'Wedding Crashers Anonymous', genre: 'Comedy', year: 2020, rating: 'R', hue: 75, description: 'A support group for serial wedding crashers goes wrong at the biggest wedding of the year.' },
  { id: 7, title: 'The Quiet Harbor', genre: 'Drama', year: 2022, rating: 'PG-13', hue: 200, description: 'A fishing town reckons with a secret that has been buried for thirty years.' },
  { id: 8, title: 'Paper Lanterns', genre: 'Drama', year: 2024, rating: 'PG', hue: 220, description: 'Three generations of one family gather for a festival that changes everything.' },
  { id: 9, title: 'Hollow Hill', genre: 'Horror', year: 2023, rating: 'R', hue: 280, description: 'A family moves into a house where every mirror shows a different year.' },
  { id: 10, title: 'Night Shift', genre: 'Horror', year: 2021, rating: 'R', hue: 300, description: 'A hospital night nurse notices the patients keep waking up in new rooms.' },
  { id: 11, title: 'Orbit Zero', genre: 'Sci-Fi', year: 2024, rating: 'PG-13', hue: 170, description: 'A crew on a failing space station has six hours to decide who goes home.' },
  { id: 12, title: 'Echo Protocol', genre: 'Sci-Fi', year: 2022, rating: 'PG-13', hue: 150, description: 'An AI researcher discovers her assistant has been writing its own code.' },
  { id: 13, title: 'Neon Drift', genre: 'Sci-Fi', year: 2023, rating: 'PG-13', hue: 190, description: 'In a rain-soaked megacity, a courier delivers a package that was never meant to exist.' },
]

// Two movies already watched (newest first) so History isn't empty on first load.
export const SEED_WATCHED = [
  { id: 11, at: Date.now() - 1000 * 60 * 60 * 24 },
  { id: 4, at: Date.now() - 1000 * 60 * 60 * 24 * 3 },
]

export const DEMO_USER = { email: 'demo@netflix.kul', password: 'password123' }

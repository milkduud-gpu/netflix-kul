const BASE = import.meta.env.BASE_URL

export const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']

// Movies now come from Supabase; `hue` is UI-only and not stored in the DB.
export const HUES = { 1: 8, 2: 20, 3: 35, 4: 48, 5: 60, 6: 75, 7: 200, 8: 220, 9: 280, 10: 300, 11: 170, 12: 150, 13: 190 }

// Map a DB row to the shape the UI uses.
export const toMovie = (r) => ({
  id: r.id, title: r.title, genre: r.genre, year: r.year, rating: r.rating,
  hue: HUES[r.id] ?? (r.id * 37) % 360,
  poster: `${BASE}${r.poster_path}`,
  description: r.description,
})

export const DEMO_USER = { email: 'demo@netflix.kul', password: 'password123' }

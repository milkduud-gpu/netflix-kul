const KEY = import.meta.env.VITE_TMDB_KEY
const IMG = 'https://image.tmdb.org/t/p/w500'

// Movie slot id -> real TMDB movie id.
export const TMDB_IDS = {
  1: 562, 2: 76341, 3: 245891,
  4: 8363, 5: 18785, 6: 12133,
  7: 278, 8: 13,
  9: 138843, 10: 419430,
  11: 157336, 12: 603, 13: 335984,
}

// Fetch title, poster, year and overview for one movie. Returns null on any failure.
async function fetchTmdb(tmdbId) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${KEY}`)
    if (!res.ok) throw new Error(`TMDB ${res.status}`)
    const d = await res.json()
    return {
      title: d.title,
      poster: d.poster_path ? `${IMG}${d.poster_path}` : null,
      year: d.release_date ? Number(d.release_date.slice(0, 4)) : null,
      description: d.overview || null,
    }
  } catch (e) {
    console.error('TMDB lookup failed', tmdbId, e)
    return null
  }
}

// Overlay TMDB data onto movies; anything missing keeps its existing value.
export async function withTmdb(movies) {
  if (!KEY) return movies
  return Promise.all(movies.map(async (m) => {
    const t = TMDB_IDS[m.id] && await fetchTmdb(TMDB_IDS[m.id])
    if (!t) return m
    return {
      ...m,
      title: t.title || m.title,
      poster: t.poster || m.poster,
      year: t.year || m.year,
      description: t.description || m.description,
    }
  }))
}

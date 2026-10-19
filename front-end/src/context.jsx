import { createContext, useContext, useEffect, useState } from 'react'
import { DEMO_USER, toMovie } from './data.js'
import { supabase } from './lib/supabase.js'

// TEMPORARY placeholder user until real auth exists. Do not treat as a real identity.
const DEV_USER_ID = '00000000-0000-0000-0000-00000000dead'

const AppContext = createContext(null)

// Movies and watch history are loaded from Supabase; the login gate is still client-side only.
export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [watched, setWatched] = useState([])
  const [movies, setMovies] = useState([])
  const [moviesLoading, setMoviesLoading] = useState(true)

  async function loadHistory() {
    const { data, error } = await supabase
      .from('watch_history').select('movie_id,watched_at')
      .eq('user_id', DEV_USER_ID).order('watched_at', { ascending: false })
    if (error) return console.error('Failed to load watch history', error)
    setWatched(data.map((r) => ({ id: r.movie_id, at: new Date(r.watched_at).getTime() })))
  }

  useEffect(() => {
    supabase.from('movies').select('*').order('id').then(({ data, error }) => {
      if (error) console.error('Failed to load movies', error)
      else setMovies(data.map(toMovie))
      setMoviesLoading(false)
    })
    loadHistory()
  }, [])

  function login(email, password) {
    if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
      setUser({ email: DEMO_USER.email })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  async function watch(id) {
    setWatched((w) => [{ id, at: Date.now() }, ...w.filter((x) => x.id !== id)])
    const { error } = await supabase.from('watch_history').upsert(
      { user_id: DEV_USER_ID, movie_id: id, watched_at: new Date().toISOString() },
      { onConflict: 'user_id,movie_id' },
    )
    if (error) { console.error('Failed to save watch', error); loadHistory() }
  }

  async function clearHistory() {
    setWatched([])
    const { error } = await supabase.from('watch_history').delete().eq('user_id', DEV_USER_ID)
    if (error) { console.error('Failed to clear history', error); loadHistory() }
  }

  return (
    <AppContext.Provider value={{ user, login, logout, watched, watch, clearHistory, movies, moviesLoading }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)

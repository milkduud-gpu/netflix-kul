import { createContext, useContext, useEffect, useState } from 'react'
import { toMovie } from './data.js'
import { supabase } from './lib/supabase.js'

const AppContext = createContext(null)

// Auth, movies and watch history all come from Supabase. RLS scopes history to the signed-in user.
export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [watched, setWatched] = useState([])
  const [movies, setMovies] = useState([])
  const [moviesLoading, setMoviesLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function loadHistory() {
    const { data, error } = await supabase
      .from('watch_history').select('movie_id,watched_at')
      .order('watched_at', { ascending: false })
    if (error) return console.error('Failed to load watch history', error)
    // Rows are newest first; keep only the latest watch of each movie.
    const seen = new Set()
    setWatched(data.filter((r) => !seen.has(r.movie_id) && seen.add(r.movie_id))
      .map((r) => ({ id: r.movie_id, at: new Date(r.watched_at).getTime() })))
  }

  // Load data when someone signs in; clear it when they sign out.
  const userId = user?.id
  useEffect(() => {
    if (!userId) {
      setWatched([])
      setMovies([])
      return
    }
    setMoviesLoading(true)
    supabase.from('movies').select('*').order('id').then(({ data, error }) => {
      if (error) console.error('Failed to load movies', error)
      else setMovies(data.map(toMovie))
      setMoviesLoading(false)
    })
    loadHistory()
  }, [userId])

  // Each returns an error message, or null on success.
  async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    return error ? 'Incorrect email or password' : null
  }

  async function signup(email, password) {
    const { data, error } = await supabase.auth.signUp({ email: email.trim(), password })
    if (error) return error.message
    // With email confirmation on, there is no session until the link is clicked.
    return data.session ? null : 'Check your email to confirm your account, then sign in.'
  }

  const logout = () => supabase.auth.signOut()

  async function watch(id) {
    setWatched((w) => [{ id, at: Date.now() }, ...w.filter((x) => x.id !== id)])
    const { error } = await supabase.from('watch_history').insert({ movie_id: id })
    if (error) { console.error('Failed to save watch', error); loadHistory() }
  }

  async function clearHistory() {
    setWatched([])
    const { error } = await supabase.from('watch_history').delete().eq('user_id', userId)
    if (error) { console.error('Failed to clear history', error); loadHistory() }
  }

  return (
    <AppContext.Provider value={{ user, authLoading, login, signup, logout, watched, watch, clearHistory, movies, moviesLoading }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)

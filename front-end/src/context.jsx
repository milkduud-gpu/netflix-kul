import { createContext, useContext, useState } from 'react'
import { DEMO_USER, SEED_WATCHED } from './data.js'

const AppContext = createContext(null)

// All data lives in React state — refreshing the page resets everything.
export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [watched, setWatched] = useState(SEED_WATCHED)

  function login(email, password) {
    if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
      setUser({ email: DEMO_USER.email })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  function watch(id) {
    setWatched((w) => [{ id, at: Date.now() }, ...w.filter((x) => x.id !== id)])
  }

  const clearHistory = () => setWatched([])

  return (
    <AppContext.Provider value={{ user, login, logout, watched, watch, clearHistory }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)

import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context.jsx'

export default function Navbar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState(params.get('q') ?? '')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Leaving the search results (e.g. "Clear search") resets and closes the box.
  useEffect(() => {
    if (pathname !== '/search') {
      setQ('')
      setOpen(false)
    }
  }, [pathname])

  function onSearch(e) {
    const value = e.target.value
    setQ(value)
    // Replace while already on results so Back doesn't step through every keystroke.
    navigate(value.trim() ? `/search?q=${encodeURIComponent(value)}` : '/', { replace: window.location.pathname === '/search' })
  }

  return (
    <header className={`navbar${scrolled ? ' solid' : ''}`}>
      <NavLink to="/" className="logo">NETFLIX-KUL</NavLink>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/genres">Genres</NavLink>
      </nav>
      <div className="nav-right">
        {open && (
          <input
            autoFocus
            type="search"
            aria-label="Search by title or genre"
            placeholder="Titles, genres"
            value={q}
            onChange={onSearch}
            onBlur={() => !q && setOpen(false)}
          />
        )}
        <button className="icon-btn" aria-label="Search" onClick={() => setOpen(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="10" cy="10" r="7" /><path d="M21 21l-6-6" /></svg>
        </button>
        <button className="avatar" onClick={logout} title={`Sign out ${user.email}`} aria-label="Sign out">
          D
        </button>
      </div>
    </header>
  )
}

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context.jsx'
import { MOVIES } from '../data.js'
import { posterStyle } from '../components/Poster.jsx'

export default function History() {
  const { watched, clearHistory } = useApp()
  const dialog = useRef(null)
  const items = watched
    .map((w) => ({ ...w, movie: MOVIES.find((m) => m.id === w.id) }))
    .filter((w) => w.movie)

  if (items.length === 0) {
    return (
      <div className="page empty">
        <h1>History</h1>
        <p>You haven't watched anything yet</p>
        <Link to="/" className="btn white">Browse movies</Link>
      </div>
    )
  }

  const counts = {}
  items.forEach(({ movie }) => { counts[movie.genre] = (counts[movie.genre] ?? 0) + 1 })
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])

  return (
    <div className="page">
      <div className="page-head">
        <h1>History</h1>
        <button className="btn gray" onClick={() => dialog.current.showModal()}>Clear history</button>
      </div>
      <dialog ref={dialog} className="confirm" aria-labelledby="clear-title">
        <h2 id="clear-title">Clear your watch history?</h2>
        <p className="muted">This removes all {items.length} watched movies and your top genres. It can't be undone.</p>
        <div className="confirm-actions">
          <button className="btn gray" autoFocus onClick={() => dialog.current.close()}>Cancel</button>
          <button className="btn red" onClick={() => { clearHistory(); dialog.current.close() }}>Clear history</button>
        </div>
      </dialog>
      <h2>Your top genres</h2>
      <ol className="top-genres">
        {top.map(([g, n]) => (
          <li key={g}><Link to={`/genres/${g}`}>{g}</Link> <span className="muted">· {n} watched</span></li>
        ))}
      </ol>
      <h2>Watched</h2>
      <ul className="history-list">
        {items.map(({ movie, at }) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <span className="thumb" style={posterStyle(movie)}><img src={movie.poster} alt="" /></span>
              <span>
                <strong>{movie.title}</strong>
                <small className="muted">{movie.genre} · {new Date(at).toLocaleDateString()}</small>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

import { useApp } from '../context.jsx'
import { Link, useSearchParams } from 'react-router-dom'
import Poster from '../components/Poster.jsx'

export default function Search() {
  const { movies } = useApp()
  const [params] = useSearchParams()
  const q = (params.get('q') ?? '').trim().toLowerCase()
  if (!q) {
    return (
      <div className="page empty">
        <p>Type a title or genre to search</p>
        <Link to="/" className="btn white">Back to Home</Link>
      </div>
    )
  }
  const results = movies.filter((m) => m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q))

  return (
    <div className="page">
      <h1>Results for “{params.get('q')}”</h1>
      {results.length === 0 ? (
        <div className="empty">
          <p>No movies match your search</p>
          <Link to="/" className="btn white">Clear search</Link>
        </div>
      ) : (
        <div className="grid">{results.map((m) => <Poster key={m.id} movie={m} />)}</div>
      )}
    </div>
  )
}

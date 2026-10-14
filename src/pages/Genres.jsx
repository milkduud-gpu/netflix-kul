import { Link, useParams } from 'react-router-dom'
import { GENRES, MOVIES } from '../data.js'
import Poster from '../components/Poster.jsx'

export default function Genres() {
  const { name } = useParams()

  if (!name) {
    return (
      <div className="page">
        <h1>Genres</h1>
        <div className="genre-grid">
          {GENRES.map((g, i) => (
            <Link key={g} to={`/genres/${g}`} className="genre-tile"
              style={{ background: `linear-gradient(135deg, hsl(${i * 70} 60% 30%), #181818)` }}>
              {g}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const genre = GENRES.find((g) => g.toLowerCase() === name.toLowerCase())
  if (!genre) {
    return (
      <div className="page empty">
        <p>We couldn't find that genre</p>
        <Link to="/genres" className="btn white">Back to Genres</Link>
      </div>
    )
  }
  const movies = MOVIES.filter((m) => m.genre === genre)
  return (
    <div className="page">
      <Link to="/genres" className="back">← Genres</Link>
      <h1>{genre}</h1>
      {movies.length === 0 ? <p className="muted">No movies in this genre yet</p> : (
        <div className="grid">{movies.map((m) => <Poster key={m.id} movie={m} />)}</div>
      )}
    </div>
  )
}

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context.jsx'
import { posterStyle } from '../components/Poster.jsx'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { watched, watch, movies } = useApp()
  const movie = movies.find((m) => String(m.id) === id)

  if (!movie) {
    return (
      <div className="page empty">
        <p>We couldn't find that movie</p>
        <Link to="/" className="btn white">Go Home</Link>
      </div>
    )
  }

  const seen = watched.some((w) => w.id === movie.id)
  return (
    <>
      <section className="hero detail" style={posterStyle(movie)}>
        <div className="hero-shade" />
        <img className="hero-poster" src={movie.poster} alt="" />
        <div className="hero-body">
          <button className="link back" onClick={() => navigate(-1)}>← Back</button>
          <h1>{movie.title}</h1>
          <p className="meta">
            <span className="match">{movie.year}</span> <span className="tag">{movie.rating}</span>{' '}
            <Link className="tag" to={`/genres/${movie.genre}`}>{movie.genre}</Link>
          </p>
          <p>{movie.description}</p>
          <div className="hero-actions">
            <button className="btn white" onClick={() => watch(movie.id)}>
              ▶ {seen ? 'Watch again' : 'Play'}
            </button>
            {seen && <Link to="/history" className="btn gray">Added to History ✓</Link>}
          </div>
        </div>
      </section>
    </>
  )
}

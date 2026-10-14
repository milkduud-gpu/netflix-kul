import { Link } from 'react-router-dom'

export function posterStyle(m) {
  return {
    background: `linear-gradient(160deg, hsl(${m.hue} 70% 35%), hsl(${(m.hue + 40) % 360} 60% 12%))`,
  }
}

export default function Poster({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="poster" style={posterStyle(movie)} aria-label={movie.title}>
      <span className="poster-title">{movie.title}</span>
      <span className="poster-hover">
        <strong>{movie.title}</strong>
        <small>{movie.year} · {movie.rating} · {movie.genre}</small>
      </span>
    </Link>
  )
}

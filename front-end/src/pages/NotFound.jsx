import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page empty">
      <h1>Lost your way?</h1>
      <p>Sorry, we can't find that page.</p>
      <Link to="/" className="btn white">netflix-kul Home</Link>
    </div>
  )
}

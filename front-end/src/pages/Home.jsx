import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context.jsx'
import { GENRES } from '../data.js'
import Row from '../components/Row.jsx'
import Poster from '../components/Poster.jsx'
import { posterStyle } from '../components/Poster.jsx'
import { helloWorld } from '../lib/functions.js'

export default function Home() {
  const { watched, watch, movies } = useApp()
  const [greeting, setGreeting] = useState('')
  useEffect(() => {
    helloWorld()
      .then((d) => setGreeting(typeof d === 'string' ? d : d?.message ?? JSON.stringify(d)))
      .catch(() => {})
  }, [])
  const featured = movies.find((m) => m.id === 13)
  if (!featured) return null
  const continueWatching = watched.map((w) => movies.find((m) => m.id === w.id)).filter(Boolean)

  return (
    <>
      <section className="hero" style={posterStyle(featured)}>
        <div className="hero-shade" />
        <img className="hero-poster" src={featured.poster} alt="" />
        <div className="hero-body">
          {greeting && <p className="hero-greeting">{greeting}</p>}
          <h1>{featured.title}</h1>
          <p>{featured.description}</p>
          <div className="hero-actions">
            <Link to={`/movie/${featured.id}`} className="btn white" onClick={() => watch(featured.id)}>▶ Play</Link>
            <Link to={`/movie/${featured.id}`} className="btn gray">More Info</Link>
          </div>
        </div>
      </section>
      <div className="rows">
        {continueWatching.length > 0 && <Row title="Continue Watching" movies={continueWatching} />}
        <section className="row">
          <h2>Top 10 Movies Today</h2>
          <div className="row-scroll">
            {[...movies].sort((a, b) => b.year - a.year).slice(0, 10).map((m, i) => (
              <div key={m.id} className="ranked">
                <span className="rank" aria-hidden="true">{i + 1}</span>
                <Poster movie={m} />
              </div>
            ))}
          </div>
        </section>
        {GENRES.map((g) => (
          <Row key={g} title={g} movies={movies.filter((m) => m.genre === g)} />
        ))}
      </div>
      <footer className="footer">
        <p>Questions? Call 1-800-NETFLIX-KUL</p>
        <p>Help Center · Account · Terms of Use · Privacy · Cookie Preferences</p>
      </footer>
    </>
  )
}

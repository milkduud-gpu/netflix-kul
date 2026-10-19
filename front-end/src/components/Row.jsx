import Poster from './Poster.jsx'

export default function Row({ title, movies }) {
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="row-scroll">
        {movies.map((m) => <Poster key={m.id} movie={m} />)}
      </div>
    </section>
  )
}

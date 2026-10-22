import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './context.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import History from './pages/History.jsx'
import Genres from './pages/Genres.jsx'
import Search from './pages/Search.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import Checkout from './pages/Checkout.jsx'
import NotFound from './pages/NotFound.jsx'

function Protected() {
  const { user, authLoading, moviesLoading } = useApp()
  const location = useLocation()
  if (authLoading) return null
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Navbar />
      <main id="main" tabIndex={-1} key={location.pathname}>
        {moviesLoading ? null : <Outlet />}
      </main>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Protected />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:name" element={<Genres />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

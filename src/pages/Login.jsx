import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context.jsx'
import { DEMO_USER } from '../data.js'

export default function Login() {
  const { user, login } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})

  if (user) return <Navigate to="/" replace />

  function submit(e) {
    e.preventDefault()
    const next = {}
    if (!email.trim()) next.email = 'Enter your email'
    if (!password) next.password = 'Enter your password'
    if (Object.keys(next).length) return setErrors(next)
    if (login(email, password)) {
      navigate(location.state?.from ?? '/', { replace: true })
    } else {
      setErrors({ form: 'Incorrect email or password' })
      setPassword('')
    }
  }

  return (
    <div className="login-wrap">
      <span className="logo big">NETFLIX-KUL</span>
      <form className="login-card" onSubmit={submit} noValidate>
        <h1>Sign In</h1>
        {errors.form && <p className="error banner" role="alert">{errors.form}</p>}
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'invalid' : ''} autoComplete="email" />
        {errors.email && <p className="error">{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <div className="pw">
          <input id="password" type={show ? 'text' : 'password'} value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'invalid' : ''} autoComplete="current-password" />
          <button type="button" className="link" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit" className="btn red full">Sign In</button>
        <p className="hint">Demo account: {DEMO_USER.email} / {DEMO_USER.password}</p>
      </form>
    </div>
  )
}

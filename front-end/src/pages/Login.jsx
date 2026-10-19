import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context.jsx'

export default function Login() {
  const { user, login, signup } = useApp()
  const location = useLocation()
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const signingIn = mode === 'signin'

  // Once signed in, return to the page the user originally asked for.
  if (user) return <Navigate to={location.state?.from ?? '/'} replace />

  async function submit(e) {
    e.preventDefault()
    const next = {}
    if (!email.trim()) next.email = 'Enter your email'
    if (!password) next.password = signingIn ? 'Enter your password' : 'Choose a password'
    else if (!signingIn && password.length < 6) next.password = 'Use at least 6 characters'
    if (Object.keys(next).length) return setErrors(next)
    setBusy(true)
    const message = await (signingIn ? login : signup)(email, password)
    setBusy(false)
    if (message) {
      setErrors({ form: message })
      if (signingIn) setPassword('')
    }
  }

  function switchMode() {
    setMode(signingIn ? 'signup' : 'signin')
    setErrors({})
    setPassword('')
  }

  return (
    <main className="login-wrap">
      <span className="logo big">NETFLIX-KUL</span>
      <form className="login-card" onSubmit={submit} noValidate>
        <h1>{signingIn ? 'Sign In' : 'Create Account'}</h1>
        {errors.form && <p className="error banner" role="alert">{errors.form}</p>}
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'invalid' : ''} autoComplete="email" />
        {errors.email && <p className="error">{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <div className="pw">
          <input id="password" type={show ? 'text' : 'password'} value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'invalid' : ''}
            autoComplete={signingIn ? 'current-password' : 'new-password'} />
          <button type="button" className="link" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit" className="btn red full" disabled={busy}>
          {signingIn ? 'Sign In' : 'Create Account'}
        </button>
        <p className="hint">
          {signingIn ? 'New here? ' : 'Already have an account? '}
          <button type="button" className="link" onClick={switchMode}>
            {signingIn ? 'Create an account' : 'Sign in'}
          </button>
        </p>
      </form>
    </main>
  )
}

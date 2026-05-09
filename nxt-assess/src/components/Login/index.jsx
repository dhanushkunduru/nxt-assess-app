import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const logoUrl =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="48" viewBox="0 0 180 48"><rect width="180" height="48" rx="12" fill="%23164687"/><text x="18" y="31" font-family="Arial" font-size="22" font-weight="800" fill="white">Nxt Assess</text></svg>'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const onSubmitForm = async event => {
    event.preventDefault()

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })

    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      navigate('/', {replace: true})
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-left">
          <img
            src={logoUrl}
            alt="login website logo"
            className="login-main-logo"
          />

          <h1 className="login-big-heading">
            Start Your Online Assessment
          </h1>

          <p className="login-big-text">
            Login, answer questions, track time, and view your result instantly.
          </p>
        </div>

        <form className="login-form" onSubmit={onSubmitForm}>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Please login to continue</p>

          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder="Enter username"
          />

          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Enter password"
          />

          <div className="show-password-row">
            <input
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={event => setShowPassword(event.target.checked)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          {errorMsg !== '' && <p className="error-msg">*{errorMsg}</p>}

          <div className="demo-card">
            <p>Demo Login</p>
            <span>rahul / rahul@2021</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
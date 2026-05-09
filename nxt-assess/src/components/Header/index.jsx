import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const logoUrl =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="48" viewBox="0 0 180 48"><rect width="180" height="48" rx="12" fill="%23164687"/><text x="18" y="31" font-family="Arial" font-size="22" font-weight="800" fill="white">Nxt Assess</text></svg>'

const Header = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    localStorage.removeItem('assessmentData')
    navigate('/login', {replace: true})
  }

  return (
    <nav className="header">
      <Link to="/">
        <img src={logoUrl} alt="website logo" className="header-logo" />
      </Link>

      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Header
import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <section className="notfound-page card">
    <h1>Page Not Found</h1>
    <p>The page you were looking for does not exist.</p>
    <Link to="/" className="notfound-link">
      Return to Home
    </Link>
  </section>
)

export default NotFound

import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-page">
      <div className="home-card">
        <div className="home-content">
          <p className="welcome-text">Welcome to Nxt Assess</p>
          <h1>Instructions</h1>

          <ol className="instructions-list">
            <li>Total Questions: 10</li>
            <li>Types of Questions: MCQs</li>
            <li>Duration: 10 Mins</li>
            <li>Marking Scheme: Every Correct response, get 1 mark</li>
            <li>All the progress will be lost, if you reload during the assessment</li>
          </ol>

          <Link to="/assessment" className="start-link">
            <button type="button" className="start-btn">
              Start Assessment
            </button>
          </Link>
        </div>

        <div className="home-image-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-assess-assessment-img.png"
            alt="assessment"
            className="assessment-img"
          />
        </div>
      </div>
    </div>
  </>
)

export default Home
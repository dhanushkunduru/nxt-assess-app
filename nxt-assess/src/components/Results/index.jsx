import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Results = () => {
  const navigate = useNavigate()

  const assessmentData = JSON.parse(localStorage.getItem('assessmentData')) || {
    score: 0,
    timeTaken: 0,
    isTimeUp: false,
  }

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(
      2,
      '0',
    )}:${String(secs).padStart(2, '0')}`
  }

  const onClickReattempt = () => {
    localStorage.removeItem('assessmentData')
    navigate('/assessment')
  }

  return (
    <>
      <Header />
      <div className="results-page">
        <div className="results-card">
          {assessmentData.isTimeUp ? (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-assess-time-up-img.png"
                alt="time up"
                className="results-img"
              />
              <p>You did not complete the assessment within the time</p>
              <p>Your score</p>
              <p>{assessmentData.score}</p>
            </>
          ) : (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-assess-submit-img.png"
                alt="submit"
                className="results-img"
              />
              <h1>Congrats! You completed the assessment</h1>
              <p>Time Taken</p>
              <p>{formatTime(assessmentData.timeTaken)}</p>
              <p>Your score</p>
              <p>{assessmentData.score}</p>
            </>
          )}

          <button
            type="button"
            className="reattempt-btn"
            onClick={onClickReattempt}
          >
            Reattempt
          </button>
        </div>
      </div>
    </>
  )
}

export default Results

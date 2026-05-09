import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Assessment = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [questions, setQuestions] = useState([])
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(600)

  const selectedAnswersRef = useRef({})
  const questionsRef = useRef([])
  const navigate = useNavigate()

  const getOptionType = question =>
    question.option_type || question.options_type

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(
      2,
      '0',
    )}:${String(secs).padStart(2, '0')}`
  }

  const calculateScore = () => {
    let score = 0

    questionsRef.current.forEach(question => {
      const selectedId = selectedAnswersRef.current[question.id]
      const selectedOption = question.options.find(
        option => option.id === selectedId,
      )

      if (
        selectedOption &&
        (selectedOption.is_correct === 'true' ||
          selectedOption.isCorrect === true)
      ) {
        score += 1
      }
    })

    return score
  }

  const submitAssessment = isTimeUp => {
    const score = calculateScore()
    const timeTaken = 600 - timeLeft

    localStorage.setItem(
      'assessmentData',
      JSON.stringify({
        score,
        timeTaken: isTimeUp ? 600 : timeTaken,
        isTimeUp,
      }),
    )

    navigate('/results', {replace: true})
  }

  const getQuestions = async () => {
    setApiStatus(apiStatusConstants.loading)

    const response = await fetch('https://apis.ccbp.in/assess/questions')

    if (response.ok) {
      const data = await response.json()
      setQuestions(data.questions)
      questionsRef.current = data.questions
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])

  useEffect(() => {
    if (apiStatus !== apiStatusConstants.success) return undefined

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerId)

          const score = calculateScore()

          localStorage.setItem(
            'assessmentData',
            JSON.stringify({
              score,
              timeTaken: 600,
              isTimeUp: true,
            }),
          )

          navigate('/results', {replace: true})
          return 0
        }

        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [apiStatus, navigate])

  const onSelectOption = optionId => {
    const updatedAnswers = {
      ...selectedAnswersRef.current,
      [questions[activeQuestionIndex].id]: optionId,
    }

    selectedAnswersRef.current = updatedAnswers
    setSelectedAnswers(updatedAnswers)
  }

  const onChangeQuestion = index => {
    setActiveQuestionIndex(index)
  }

  const onNextQuestion = () => {
    setActiveQuestionIndex(prevIndex => prevIndex + 1)
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <div className="loader" />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We are having some trouble fetching the questions.</p>
      <button type="button" onClick={getQuestions} className="retry-btn">
        Retry
      </button>
    </div>
  )

  const renderOptions = () => {
    const activeQuestion = questions[activeQuestionIndex]
    const optionType = getOptionType(activeQuestion)
    const selectedOptionId = selectedAnswers[activeQuestion.id]

    if (optionType === 'IMAGE') {
      return (
        <ul className="image-options-list">
          {activeQuestion.options.map(option => (
            <li key={option.id}>
              <button
                type="button"
                className={
                  selectedOptionId === option.id
                    ? 'image-option selected-option'
                    : 'image-option'
                }
                onClick={() => onSelectOption(option.id)}
              >
                <img
                  src={option.image_url}
                  alt={option.text}
                  className="option-img"
                />
              </button>
            </li>
          ))}
        </ul>
      )
    }

    if (optionType === 'SINGLE_SELECT') {
      return (
        <select
          className="select-option"
          value={selectedOptionId || ''}
          onChange={event => onSelectOption(event.target.value)}
        >
          <option value="" disabled>
            Select Answer
          </option>
          {activeQuestion.options.map(option => (
            <option key={option.id} value={option.id}>
              {option.text}
            </option>
          ))}
        </select>
      )
    }

    return (
      <ul className="default-options-list">
        {activeQuestion.options.map(option => (
          <li key={option.id}>
            <button
              type="button"
              className={
                selectedOptionId === option.id
                  ? 'default-option selected-option'
                  : 'default-option'
              }
              onClick={() => onSelectOption(option.id)}
            >
              {option.text}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  const renderSuccessView = () => {
    const activeQuestion = questions[activeQuestionIndex]
    const answeredCount = Object.keys(selectedAnswers).length
    const unansweredCount = questions.length - answeredCount

    return (
      <div className="assessment-page">
        <div className="question-section">
          <div className="question-top-row">
            <p className="question-count">
              Question {activeQuestionIndex + 1} of {questions.length}
            </p>
            <p className="timer">{formatTime(timeLeft)}</p>
          </div>

          <p className="question-text">{activeQuestion.question_text}</p>

          {renderOptions()}

          <div className="question-buttons-row">
            {activeQuestionIndex !== questions.length - 1 && (
              <button
                type="button"
                className="next-btn"
                onClick={onNextQuestion}
              >
                Next Question
              </button>
            )}

            <button
              type="button"
              className="submit-btn"
              onClick={() => submitAssessment(false)}
            >
              Submit Assessment
            </button>
          </div>
        </div>

        <div className="sidebar">
          <div className="count-container">
            <div>
              <p className="count-number answered-count">{answeredCount}</p>
              <p>Answered Questions</p>
            </div>

            <div>
              <p className="count-number unanswered-count">{unansweredCount}</p>
              <p>Unanswered Questions</p>
            </div>
          </div>

          <h1 className="questions-heading">Questions</h1>

          <ul className="question-numbers-list">
            {questions.map((question, index) => (
              <li key={question.id}>
                <button
                  type="button"
                  className={
                    selectedAnswers[question.id]
                      ? 'question-number-btn answered-question'
                      : 'question-number-btn'
                  }
                  onClick={() => onChangeQuestion(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const renderAssessment = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return renderLoader()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      {renderAssessment()}
    </>
  )
}

export default Assessment

import { useState } from 'react'
import './App.css'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistic = (props) => {
  if(!props.isReviewed){
    return (
      <div>
        <p className='title'>statistics</p>
        <p>No feedback given!</p>
      </div>
    )
  }

  return (
    <div>
      <p className='title'>statistics</p>
      <table>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='average' value={props.average} />
        <StatisticLine text='positive' value={`${props.positiveProportion * 100}%`} />
      </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [positiveProportion, setPositiveProportion] = useState(0)

  const updateStatistic = (reviewList) => {
    const reviewCount = reviewList.reduce((total, current) => total + current, 0)
    const newAverage = (reviewList[0] - reviewList[2]) / reviewCount
    const newProportion = reviewList[0] / reviewCount
    setAverage(newAverage)
    setPositiveProportion(newProportion)
  }

  const handleGoodClick = () => {
    const newGood = good + 1
    const reviewList = [newGood, neutral, bad]
    setGood(newGood)
    updateStatistic(reviewList)
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1
    const reviewList = [good, newNeutral, bad]
    setNeutral(newNeutral)
    updateStatistic(reviewList)
  }

  const handleBadClick = () => {
    const newBad = bad + 1
    const reviewList = [good, neutral, newBad]
    setBad(newBad)
    updateStatistic(reviewList)
  }

  return (
    <div>
      <p className='title'>give feedback</p>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Statistic good={good} neutral={neutral} bad={bad} average={average} positiveProportion={positiveProportion} isReviewed={good + neutral + bad}/>
    </div>
  )
}

export default App
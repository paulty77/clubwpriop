import React from 'react'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import '../styles/ResultWidget.css'
import { COLOR_LOGAVIV } from '../lib/globals'

const ResultWidget = ({ result: { label, points } }) => {
  return (
    <div>
      <div className='result'>
        <div className='summary'>
          <h2>{label}</h2>
        </div>
        <div className='points'>
          {points} <ToggleStar color={COLOR_LOGAVIV} />
        </div>
      </div>
    </div>
  )
}

export default ResultWidget

import React from 'react'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import { colors } from 'material-ui/styles'
import '../styles/ResultWidget.css'

const ResultWidget = ({ result: { label, points } }) => {
  return (
    <div>
      <div className='result'>
        <div className='summary'>
          <h2>{label}</h2>
        </div>
        <div className='points'>
          {points} <ToggleStar color={colors.orange400} />
        </div>
      </div>
    </div>
  )
}

export default ResultWidget

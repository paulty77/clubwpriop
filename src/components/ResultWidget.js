import React from 'react'
import '../styles/ResultWidget.css'

const ResultWidget = ({ label, points, number, total }) => {
  const percent = Math.round(points * 100 / total)
  const width = `${percent}%`
  return (
    <div className='result'>
      <div className='summary'>
        <div className='title'>{number} {label}</div>
        <div className='bar' style={{width}}>
          <div className='title'>{number} {label}</div>
        </div>
      </div>
      <div className='points'>
        {width}
      </div>
    </div>

  )
}

export default ResultWidget

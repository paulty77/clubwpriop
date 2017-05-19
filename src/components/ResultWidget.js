import React from 'react'
import '../styles/ResultWidget.css'

const ResultWidget = ({ label, points, total }) => {
  const percent = Math.round(points * 100 / total)
  const width = `${percent}%`
  return (
    <div className='result' style={{margin: '0 0 8px 0'}}>
      <div className='summary'>
        <div className='title'>{label}</div>
        <div className='bar' style={{width}}>
          <div className='title'>{label}</div>
        </div>
      </div>
      <div className='points'>
        {width}
      </div>
    </div>

  )
}

export default ResultWidget

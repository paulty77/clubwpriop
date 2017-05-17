import React from 'react'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RateStar from './RateStar'
import '../styles/SubjectWidget.css'

const SubjectWidget = ({subject: { label, points }, onAdd, onRemove, canAdd, canRemove}) => {
  const buttonAdd = <FloatingActionButton mini className='button' onClick={onAdd} disabled={!canAdd}><ContentAdd /></FloatingActionButton>
  const buttonRemove = <FloatingActionButton mini secondary className='button' onClick={onRemove} disabled={!canRemove}><ContentRemove /> </FloatingActionButton>

  return (
    <div>
      <div className='subject'>
        <div className='summary'>
          <h2>{label}</h2>
        </div>
        <div className='actions'>
          {buttonAdd}
          {buttonRemove}
        </div>
      </div>
      <RateStar total={points} />
    </div>
  )
}

export default SubjectWidget
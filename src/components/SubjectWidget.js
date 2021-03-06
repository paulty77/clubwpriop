import React from 'react'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RateStar from './RateStar'
import '../styles/SubjectWidget.css'
import { COLOR_LOGAVIV } from '../lib/globals'

const SubjectWidget = ({subject: { label, points, number }, onAdd, onRemove, canAdd, canRemove}) => {
  const buttonAdd = <FloatingActionButton mini className='button' backgroundColor={COLOR_LOGAVIV} onClick={onAdd} disabled={!canAdd}><ContentAdd /></FloatingActionButton>
  const buttonRemove = <FloatingActionButton mini secondary className='button' onClick={onRemove} disabled={!canRemove}><ContentRemove /> </FloatingActionButton>

  return (
    <div>
      <div className='subject'>
        <div className='summary'>
          <h4><p>{number}&nbsp;</p> <p>{label}</p></h4>
        </div>
        {buttonRemove}
        {buttonAdd}
      </div>
      <RateStar total={points} />
    </div>
  )
}

export default SubjectWidget

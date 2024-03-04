import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { colors } from 'material-ui/styles'

const OpenClose = ({ onSetStatusVote, statusVote }) => {
  const label = !statusVote ? 'Is Closed' : 'Is Opened'
  const color = !statusVote ? colors.red400 : colors.green600

  return (
    <RaisedButton className='fixButton' label={label} backgroundColor={color} labelColor={colors.white} onClick={onSetStatusVote} />
  )
}

export default OpenClose

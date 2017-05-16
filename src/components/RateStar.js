import {ToggleStar} from 'material-ui/svg-icons'
import React from 'react'
import { colors } from 'material-ui/styles'

const RateStar = ({total}) => {
  const stars = []
  for (var i = total; i >= 1; i--) {
    stars.push(<ToggleStar key={i} color={colors.orange400} />)
  }

  return (<div>{
    stars.map((star) => star)
  }</div>
  )
}

export default RateStar

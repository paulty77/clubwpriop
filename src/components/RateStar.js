import ToggleStar from 'material-ui/svg-icons/toggle/star'
import React from 'react'
import { COLOR_GRAINBOW } from '../lib/globals'

const RateStar = ({total}) => {
  const stars = []
  for (var i = total; i >= 1; i--) {
    stars.push(<ToggleStar key={i} color={COLOR_GRAINBOW} style={{verticalAlign: 'bottom'}} />)
  }

  return (<span>{stars.map((star) => star)}</span>)
}

export default RateStar

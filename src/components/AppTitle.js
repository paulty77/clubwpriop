import React from 'react'
import LogoAgrimarket from '../icons/logo_agrimarket_white.svg'

const AppTitle = () => {
  return (
    <div className='AppTitle'>
      <div className='title'>Lancement Nouvelle Version</div>
      <div className='logo'><img src={LogoAgrimarket} /></div>
    </div>
  )
}

export default AppTitle

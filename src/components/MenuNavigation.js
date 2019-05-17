import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Settings from 'material-ui/svg-icons/action/settings'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import Home from 'material-ui/svg-icons/action/home'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { Link } from 'react-router-dom'
import React from 'react'

const MenuNavigation = ({onClose, open, logOut}) => {
  return (
    <Drawer open={open} docked={false} onRequestChange={onClose}>
      <MenuItem leftIcon={<Home />} containerElement={<Link to='/' />} onTouchTap={onClose}>Accueil</MenuItem>
      <MenuItem leftIcon={<ToggleStar />} containerElement={<Link to='/vote' />} onTouchTap={onClose}>Accéder au sondage</MenuItem>
      <MenuItem leftIcon={<Settings />} containerElement={<Link to='/change' />} onTouchTap={onClose}>Changer son email</MenuItem>
      <MenuItem leftIcon={<NavigationClose />} onTouchTap={logOut}>Se déconnecter</MenuItem>
    </Drawer>
  )
}

export default MenuNavigation

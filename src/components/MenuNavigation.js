import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Settings from 'material-ui/svg-icons/action/settings'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import Home from 'material-ui/svg-icons/action/home'
import { Link } from 'react-router-dom'
import React from 'react'

const MenuNavigation = ({onClose, open}) => {
  return (
    <Drawer open={open} docked={false} onRequestChange={onClose}>
      <MenuItem leftIcon={<Home />} containerElement={<Link to='/' />} onTouchTap={onClose}>Accueil</MenuItem>
      <MenuItem leftIcon={<ToggleStar />} containerElement={<Link to='/vote' />} onTouchTap={onClose}>Accéder au sondage</MenuItem>
      <MenuItem leftIcon={<Settings />} containerElement={<Link to='/change' />} onTouchTap={onClose}>Changer son email</MenuItem>
    </Drawer>
  )
}

export default MenuNavigation

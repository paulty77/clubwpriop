import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Settings from 'material-ui/svg-icons/action/settings'
import Home from 'material-ui/svg-icons/action/home'
import { Link } from 'react-router-dom'
import React from 'react'

const MenuNavigation = ({menuEmail, onClose, open}) => {
  const menuItem = menuEmail
      ? <MenuItem leftIcon={<Settings />} containerElement={<Link to='/change' />} onTouchTap={onClose}>Changer son email</MenuItem>
      : <MenuItem leftIcon={<Home />} containerElement={<Link to='/' />} onTouchTap={onClose}>Accueil</MenuItem>

  return (
    <Drawer open={open} docked={false} onRequestChange={onClose}>
      {menuItem}
    </Drawer>
  )
}

export default MenuNavigation

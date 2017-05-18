import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Settings from 'material-ui/svg-icons/action/settings'
import Home from 'material-ui/svg-icons/action/home'
import { Link } from 'react-router-dom'

export class MenuNavigation extends Component {
  render () {
    const menuItem = this.props.menuEmail
      ? <MenuItem leftIcon={<Settings />} containerElement={<Link to='/change' />} onTouchTap={this.props.onClose}>Changer son email</MenuItem>
      : <MenuItem leftIcon={<Home />} containerElement={<Link to='/' />} onTouchTap={this.props.onClose}>Accueil</MenuItem>

    return (
      <Drawer open={this.props.open} docked={false} onRequestChange={this.props.onClose}>
        {menuItem}
      </Drawer>
    )
  }
}

export default MenuNavigation

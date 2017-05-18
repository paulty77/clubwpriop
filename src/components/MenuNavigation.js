import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Settings from 'material-ui/svg-icons/action/settings'
import { Link } from 'react-router-dom'

export class MenuNavigation extends Component {
  render () {
    return (
      <Drawer open={this.props.open} docked={false} onRequestChange={this.props.onClose}>
        <MenuItem leftIcon={<Settings />} containerElement={<Link to='/change' />} >Changer son email</MenuItem>
      </Drawer>
    )
  }
}

export default MenuNavigation

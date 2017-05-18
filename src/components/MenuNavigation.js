import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Settings from 'material-ui/svg-icons/action/settings'
import { Link } from 'react-router-dom'

export class MenuNavigation extends Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  componentWillReceiveProps (nextProps) {
    this.setState({open: nextProps.open})
  }

  render () {
    return (
      <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
        <MenuItem leftIcon={<Settings />} containerElement={<Link to='/change' />} >Changer son email</MenuItem>
      </Drawer>
    )
  }
}

export default MenuNavigation

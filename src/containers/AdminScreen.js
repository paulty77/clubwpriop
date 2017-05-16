import React, {Component} from 'react'
import {connect} from 'react-redux'
import SettingsScreen from './SettingsScreen'
import LoginScreen from './LoginScreen'

export class AdminScreen extends Component {
  render () {
    return this.props.loginState === 'logged'
      ? <SettingsScreen />
      : <LoginScreen />
  }
}
const mapStateToProps = ({admin: {loginState}}) => ({loginState})

export default connect(mapStateToProps)(AdminScreen)

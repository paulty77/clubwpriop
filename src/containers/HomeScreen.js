import React, {Component} from 'react'
import InfoScreen from './InfoScreen'
import EmailScreen from './EmailScreen'
import { connect } from 'react-redux'

export class HomeScreen extends Component {
  render () {
    return !this.props.email || this.props.subjects.length === 0
      ? <EmailScreen />
      : <InfoScreen />
  }
}

const mapStateToProps = ({currentUser: {email}, subjects}) => ({email, subjects})

export default connect(mapStateToProps)(HomeScreen)

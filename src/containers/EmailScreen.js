import React, {Component} from 'react'
import {Card, CardActions, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { emailIn } from '../action-creators'
import Snackbar from 'material-ui/Snackbar'
import '../styles/Login.css'
import AppTitle from '../components/AppTitle'
import AppBar from 'material-ui/AppBar'
import Sticky from 'react-stickynode'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'

export class EmailScreen extends Component {
  constructor (props) {
    super(props)
    this.login = this.login.bind(this)
  }

  login (event) {
    event.preventDefault()
    this.props.dispatch(emailIn(this.userEmail))
  }

  render () {
    const snackbar = this.props && this.props.apiState === 'error'
      ? <Snackbar open message='Vote clos pour le moment' autoHideDuration={3000} />
      : ''
    const logInIcon = this.props.apiState === 'pending' ? <span className='loader' /> : <ArrowForward />

    return (
      <DocumentTitle title='Identifiez-vous'>
        <form onSubmit={this.login}>
          <Sticky innerZ={100}>
            <AppBar className='AppBar'
              title={<AppTitle />} showMenuIconButton={false} />
          </Sticky>
          <Card style={{margin: '10px'}}>
            <CardText>
              <TextField type='email'
                hintText='email@domaine.com'
                floatingLabelText='E-mail'
                fullWidth
                autoFocus
                required
                onChange={(event) => { this.userEmail = event.target.value }} />
            </CardText>
            <CardActions style={{ padding: '12px' }}>
              <RaisedButton label='Se connecter' icon={logInIcon} labelPosition='before' secondary type='submit' />
            </CardActions>
          </Card>
          {snackbar}
        </form>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({currentUser: {statusVote, apiState}}) => ({statusVote, apiState})
export default connect(mapStateToProps)(EmailScreen)

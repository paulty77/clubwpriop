import React, {Component} from 'react'
import {Card, CardActions, CardText, CardTitle} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { emailIn } from '../action-creators'
import Snackbar from 'material-ui/Snackbar'
import '../styles/Login.css'

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
    const snackbar = this.props && this.props.statusVote === 'error'
      ? <Snackbar open message='Vote clos pour le moment' autoHideDuration={3000} />
      : ''

    return (
      <DocumentTitle title='Identifiez-vous'>
        <form onSubmit={this.login}>
          <Card className='login'>
            <CardTitle title='Club Wpriop' />
            <CardText>
              <TextField type='email'
                hintText='email@domaine.com'
                floatingLabelText='E-mail'
                fullWidth
                autoFocus
                required
                onChange={(event) => { this.userEmail = event.target.value }} />
            </CardText>
            <CardActions>
              <RaisedButton label='Se connecter' labelPosition='before' primary type='submit' />
            </CardActions>
          </Card>
          {snackbar}
        </form>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({currentUser: {statusVote}}) => ({statusVote})
export default connect(mapStateToProps)(EmailScreen)

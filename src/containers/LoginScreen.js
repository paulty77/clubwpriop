import React, {Component} from 'react'
import {Card, CardActions, CardText, CardTitle} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { adminLogIn } from '../action-creators'
import '../styles/Login.css'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'

export class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.login = this.login.bind(this)
  }

  login (event) {
    event.preventDefault()
    this.props.dispatch(adminLogIn(this.userLogin, this.userPassWord))
  }

  render () {
    const snackbar = this.props && this.props.loginState === 'not-logged'
      ? <Snackbar open message='Identifiant ou mot de passe invalide' autoHideDuration={3000} />
      : ''

    const logInIcon = this.props.loginState === 'pending' ? <span className='loader' /> : <ArrowForward />

    return (
      <DocumentTitle title='Identifiez-vous'>
        <form onSubmit={this.login}>
          <Card className='login'>
            <CardTitle title='Lancement Nouvelle Version' subtitle='Admin' />
            <CardText>
              <TextField type='text'
                hintText='mon login'
                floatingLabelText='Identifiant'
                fullWidth
                autoFocus
                required
                onChange={(event) => { this.userLogin = event.target.value }} />

              <TextField
                type='password'
                floatingLabelText='Mot de passe'
                hintText='mon mot de passe'
                fullWidth
                autoFocus
                required
                onChange={(event) => { this.userPassWord = event.target.value }} />

            </CardText>
            <CardActions>
              <RaisedButton label='Se connecter' icon={logInIcon} labelPosition='before' secondary type='submit' />
            </CardActions>
          </Card>
          {snackbar}
        </form>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({admin: {loginState}}) => ({loginState})

export default connect(mapStateToProps)(LoginScreen)

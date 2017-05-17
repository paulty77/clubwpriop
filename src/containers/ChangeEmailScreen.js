import React, {Component} from 'react'
import {connect} from 'react-redux'
import { emailChange } from '../action-creators'
import DocumentTitle from 'react-document-title'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardText} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import Sticky from 'react-stickynode'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import { Link } from 'react-router-dom'

export class ChangeEmailScreen extends Component {
  constructor (props) {
    super(props)
    this.change = this.change.bind(this)
    this.state = {value: ''}
  }

  componentWillReceiveProps (nextProps) {
    this.setState({value: nextProps.email})
  }

  change (event) {
    event.preventDefault()
    this.props.dispatch(emailChange(this.props.idUser, this.state.value)).then(() =>
      this.setState({formState: 'submit'})
    )
  }

  render () {
    const snackbar = this.props && this.props.apiState === 'error' && this.state.formState === 'submit'
      ? <Snackbar open message='Email non modifiée' autoHideDuration={3000} />
      : ''

    return (
      <DocumentTitle title='Changer son email'>
        <form onSubmit={this.change}>
          <Card>
            <Sticky innerZ={100}>
              <AppBar
                title='Club Wpriop'
                showMenuIconButton={false}
              />
            </Sticky>
            <CardText>
              <TextField type='email'
                hintText='email@domaine.com'
                floatingLabelText='E-mail'
                fullWidth
                required
                value={this.state.value}
                onChange={(event) => this.setState({value: event.target.value, formState: null})} />
            </CardText>
            <CardActions>
              <RaisedButton label='Retour' secondary containerElement={<Link to='/' />} />
              <RaisedButton label='modifier' labelPosition='before' primary type='submit' />
            </CardActions>
          </Card>
          {snackbar}
        </form>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({subjects, currentUser: {email, idUser, statusVote, apiState}}) => ({subjects, email, idUser, statusVote, apiState})

export default connect(mapStateToProps)(ChangeEmailScreen)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { emailChange, toggleMenu } from '../action-creators'
import DocumentTitle from 'react-document-title'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardText} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import Sticky from 'react-stickynode'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import MenuNavigation from '../components/MenuNavigation'

export class ChangeEmailScreen extends Component {
  constructor (props) {
    super(props)
    this.change = this.change.bind(this)
    this.state = {value: props.email ? props.email : ''}
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
    const { dispatch, apiState, menuOpen } = this.props
    const snackbar = this.props && this.state.formState === 'submit'
      ? <Snackbar open message={apiState === 'success' ? 'Email modifié' : 'Email non modifiée'} autoHideDuration={3000} />
      : ''

    return (
      <DocumentTitle title='Changer son email'>
        <div>
          <MenuNavigation open={menuOpen} onClose={() => dispatch(toggleMenu(false))} />
          <form onSubmit={this.change}>
            <Card>
              <Sticky innerZ={100}>
                <AppBar
                  title='Club Wpriop' onLeftIconButtonTouchTap={() => dispatch(toggleMenu(true))} />
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
                <RaisedButton label='modifier' labelPosition='before' primary type='submit' />
              </CardActions>
            </Card>
            {snackbar}
          </form>
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({subjects, currentUser: {email, idUser, statusVote, apiState, menuOpen}}) => ({subjects, email, idUser, statusVote, apiState, menuOpen})

export default connect(mapStateToProps)(ChangeEmailScreen)

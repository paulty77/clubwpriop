import React, {Component} from 'react'
import {connect} from 'react-redux'
import { emailChange, toggleMenu, currentUserApiStateReset } from '../action-creators'
import DocumentTitle from 'react-document-title'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardText} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import Sticky from 'react-stickynode'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import MenuNavigation from '../components/MenuNavigation'
import AppTitle from '../components/AppTitle'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import {red800, green700} from 'material-ui/styles/colors'

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
    this.props.dispatch(emailChange(this.props.idUser, this.state.value))
  }

  render () {
    const { dispatch, apiState, menuOpen } = this.props
    const snackbar = this.props && (apiState === 'error' || apiState === 'success')
      ? <Snackbar open message={apiState === 'error' ? 'Email non modifié' : 'Email modifié'} onRequestClose={() => dispatch(currentUserApiStateReset())} bodyStyle={{ backgroundColor: apiState === 'error' ? red800 : green700 }} autoHideDuration={3000} />
      : ''
    const logInIcon = apiState === 'pending' ? null : <ArrowForward />

    return (
      <DocumentTitle title='Changer son email'>
        <div>
          <MenuNavigation open={menuOpen} onClose={() => dispatch(toggleMenu(false))} />
          <form onSubmit={this.change}>
            <Sticky innerZ={100}>
              <AppBar className='AppBar'
                title={<AppTitle />} onLeftIconButtonTouchTap={() => dispatch(toggleMenu(true))} />
            </Sticky>
            <Card style={{margin: '10px'}}>
              <CardText>
                <TextField type='email'
                  hintText='email@domaine.com'
                  floatingLabelText='E-mail'
                  fullWidth
                  required
                  value={this.state.value}
                  onChange={(event) => this.setState({value: event.target.value})} />
              </CardText>
              <CardActions style={{ padding: '12px' }}>
                <RaisedButton label='modifier' icon={logInIcon} labelPosition='before' secondary type='submit' />
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

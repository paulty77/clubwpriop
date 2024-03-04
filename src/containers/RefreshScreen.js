import React, {Component} from 'react'
import {Card, CardActions, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import {emailIn, toggleMenu, currentUserApiStateReset} from '../action-creators'
import Snackbar from 'material-ui/Snackbar'
import '../styles/Login.css'
import AppTitle from '../components/AppTitle'
import AppBar from 'material-ui/AppBar'
import Sticky from 'react-stickynode'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import MenuNavigation from '../components/MenuNavigation'

export class RefreshScreen extends Component {
  constructor (props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

  refresh (event) {
    event.preventDefault()
    this.props.dispatch(emailIn(this.props.email))
  }

  render () {
    const { dispatch, apiState, menuOpen } = this.props
    const snackbar = this.props && apiState === 'error'
      ? <Snackbar open message='Erreur de Rafraichissement' autoHideDuration={3000} onRequestClose={() => dispatch(currentUserApiStateReset())} />
      : ''
    const logInIcon = apiState === 'pending' ? null : <ArrowForward />

    return (
      <DocumentTitle title='Rafraichir la liste'>
        <div>
          <MenuNavigation open={menuOpen} onClose={() => dispatch(toggleMenu(false))} />
          <form onSubmit={this.refresh}>
            <Card>
              <Sticky innerZ={100}>
                <AppBar className='AppBar'
                  title={<AppTitle />} onLeftIconButtonTouchTap={() => dispatch(toggleMenu(true))} />
              </Sticky>
              <CardText>
                Cliquez sur le bouton pour rafraichir la liste des évolutions
              </CardText>
              <CardActions style={{ textAlign: 'center' }}>
                <RaisedButton label='Rafraichir la liste' icon={logInIcon} labelPosition='before' primary type='submit' />
              </CardActions>
            </Card>
            {snackbar}
          </form>
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({currentUser: {email, apiState, menuOpen}}) => ({email, apiState, menuOpen})
export default connect(mapStateToProps)(RefreshScreen)

import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardText} from 'material-ui/Card'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Sticky from 'react-stickynode'
import FlatButton from 'material-ui/FlatButton'
import MenuNavigation from '../components/MenuNavigation'
import { toggleMenu } from '../action-creators'

export class InfoScreen extends Component {
  render () {
    const { dispatch, statusVote, menuOpen } = this.props
    return (
      <DocumentTitle title='Informations'>
        <div>
          <MenuNavigation open={menuOpen} onClose={() => dispatch(toggleMenu(false))} />
          <Card>
            <Sticky innerZ={100}>
              <AppBar
                title='Club Wpriop' onLeftIconButtonTouchTap={() => dispatch(toggleMenu(true))} iconElementRight={<FlatButton label={statusVote === 'vote-opened' ? 'Voter' : 'Voir les votes'}
                  containerElement={<Link to='/vote' />} />} />
            </Sticky>
            <CardText>
              <p>Information en attente</p>
            </CardText>
            <CardActions>
              <RaisedButton
                label={this.props.statusVote === 'vote-opened' ? 'Voter' : 'Voir les votes'}
                secondary
                containerElement={<Link to='/vote' />} />
            </CardActions>
          </Card>
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({currentUser: { statusVote, menuOpen }}) => ({ statusVote, menuOpen })

export default connect(mapStateToProps)(InfoScreen)

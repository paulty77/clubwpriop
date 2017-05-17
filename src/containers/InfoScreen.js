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

export class InfoScreen extends Component {
  constructor (props) {
    super(props)
    this.openMenu = this.openMenu.bind(this)
    this.state = {open: false}
  }

  openMenu (event) {
    event.preventDefault()
    this.setState({open: true})
  }

  render () {
    return (
      <DocumentTitle title='Informations'>
        <div>
          <MenuNavigation open={this.state.open} />
          <Card>
            <Sticky innerZ={100}>
              <AppBar
                title='Club Wpriop' onLeftIconButtonTouchTap={this.openMenu} iconElementRight={<FlatButton label={this.props.statusVote === 'vote-opened' ? 'Voter' : 'Voir les votes'}
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

const mapStateToProps = ({currentUser: { statusVote }}) => ({statusVote})

export default connect(mapStateToProps)(InfoScreen)

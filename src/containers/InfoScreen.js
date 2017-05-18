import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardText} from 'material-ui/Card'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Sticky from 'react-stickynode'
import MenuNavigation from '../components/MenuNavigation'
import { toggleMenu } from '../action-creators'

export class InfoScreen extends Component {
  render () {
    const { dispatch, statusVote, menuOpen } = this.props
    return (
      <DocumentTitle title='Informations'>
        <div>
          <MenuNavigation open={menuOpen} onClose={() => dispatch(toggleMenu(false))} menuEmail={() => true} />
          <Card>
            <Sticky innerZ={100}>
              <AppBar
                title='Club Logo - 8 juin 2017' onLeftIconButtonTouchTap={() => dispatch(toggleMenu(true))} />
            </Sticky>
            <CardText >
              Cher client,<br /><br />
              Bienvenue au Club WPRIOP !<br />
              Vous disposez de 10 * à répartir pour l’ensemble de la liste des évolutions proposées ci-dessous en fonction de vos intérêts.
              Vous n’êtes pas limités à un nombre d’étoiles par item.
            </CardText>
            <CardActions style={{ textAlign: 'center' }}>
              <RaisedButton
                label={statusVote === 'vote-opened' ? 'Accèdez au sondage' : 'Voir les votes'}
                primary
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

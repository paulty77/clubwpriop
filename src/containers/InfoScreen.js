import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardText} from 'material-ui/Card'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Sticky from 'react-stickynode'
import MenuNavigation from '../components/MenuNavigation'
import { toggleMenu, logOut } from '../action-creators'
import AppTitle from '../components/AppTitle'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import { COLOR_GRAINBOW } from '../lib/globals'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { red400 } from 'material-ui/styles/colors'

export class InfoScreen extends Component {
  render () {
    const { dispatch, statusVote, menuOpen } = this.props
    return (
      <DocumentTitle title='Informations'>
        <div>
          <MenuNavigation logOut={() => dispatch(logOut())} open={menuOpen} onClose={() => dispatch(toggleMenu(false))} />
          <Sticky innerZ={100}>
            <AppBar className='AppBar'
              title={<AppTitle />} onLeftIconButtonTouchTap={() => dispatch(toggleMenu(true))} />
          </Sticky>

          <Card style={{margin: '10px'}}>
            <CardText >
              <p>
                Cher(e) client(e)
              </p>
              <p>
                C'est maintenant l'occasion de vous exprimer ! Votez pour les prochaines évolutions de la solution.
              </p>
              <br />
              <u><b>Déroulé</b></u> :
              <p>
                Vous disposez de 10 <ToggleStar color={COLOR_GRAINBOW} style={{verticalAlign: 'middle', margin: '0 5px'}} /> à répartir en fonction de vos intérêts à l'aide des boutons
                <FloatingActionButton iconStyle={{width: '30px', height: '30px'}} style={{verticalAlign: 'middle', margin: '5px'}} backgroundColor={COLOR_GRAINBOW}><ContentAdd style={{width: '20px', height: '30px'}} /></FloatingActionButton>
                et <FloatingActionButton iconStyle={{width: '30px', height: '30px'}} backgroundColor={red400} style={{verticalAlign: 'middle', margin: '5px'}} ><ContentRemove style={{width: '20px', height: '30px'}} /></FloatingActionButton><br />
                Vous êtes limité à  5 étoiles maximum par item.
              </p>
            </CardText>
            <CardActions style={{ textAlign: 'center', padding: '12px' }}>
              <RaisedButton
                label={statusVote === 'vote-opened' ? 'Accédez au sondage' : 'Voir les votes'}
                secondary
                style={{margin: 0}}
                icon={<ArrowForward />}
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

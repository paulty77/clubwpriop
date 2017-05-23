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
import AppTitle from '../components/AppTitle'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import { COLOR_LOGAVIV } from '../lib/globals'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import FloatingActionButton from 'material-ui/FloatingActionButton'

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
                title={<AppTitle />} onLeftIconButtonTouchTap={() => dispatch(toggleMenu(true))} />
            </Sticky>
            <CardText >
              Cher client,<br />Bienvenue au Club WPRIOP<br /><br />
              Donnez-nous votre avis sur les prochaines évolutions de  la solution.<br /><br />
              <u><b>Déroulé</b></u> :<br /><br />
              Vous disposez de 10 <ToggleStar color={COLOR_LOGAVIV} style={{verticalAlign: 'middle', margin: '0 5px'}} /> à répartir en fonction de vos intérêts à l'aide des boutons
              <FloatingActionButton iconStyle={{width: '30px', height: '30px'}} style={{verticalAlign: 'middle', margin: '5px'}} backgroundColor={COLOR_LOGAVIV}><ContentAdd style={{width: '20px', height: '20px'}} /></FloatingActionButton>
              et <FloatingActionButton iconStyle={{width: '30px', height: '30px'}} secondary style={{verticalAlign: 'middle', margin: '5px'}} ><ContentRemove style={{width: '20px', height: '20px'}} /></FloatingActionButton><br />
              Vous êtes limité à  5 étoiles maximum par item.
            </CardText>
            <CardActions style={{ textAlign: 'center' }}>
              <RaisedButton
                label={statusVote === 'vote-opened' ? 'Accédez au sondage' : 'Voir les votes'}
                primary
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

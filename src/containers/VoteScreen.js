import React, {Component} from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import {Card, CardActions, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { Link, Redirect } from 'react-router-dom'
import { addPoint, removePoint, MAX_POINTS, toggleMenu, currentUserApiStateReset, logOut } from '../action-creators'
import SubjectWidget from '../components/SubjectWidget'
import RateStar from '../components/RateStar'
import Sticky from 'react-stickynode'
import AppBar from 'material-ui/AppBar'
import '../styles/Vote.css'
import MenuNavigation from '../components/MenuNavigation'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Snackbar from 'material-ui/Snackbar'
import LinearProgress from 'material-ui/LinearProgress'

export class VoteScreen extends Component {
  componentDidMount () {
    if (!this.props.email || this.props.subjects.length === 0) {
      return (<Redirect to='/' />)
    }
  }

  render () {
    if (!this.props.email || this.props.subjects.length === 0) {
      return (<Redirect to='/' />)
    }

    const { subjects, dispatch, statusVote, idUser, menuOpen } = this.props
    const totalSubjects = subjects.length !== 0 ? subjects.reduce((tot, subject) => ({points: tot.points + subject.points})) : 0
    const total = statusVote === 'vote-opened' ? MAX_POINTS - totalSubjects.points : 0
    const stars = statusVote === 'vote-closed'
      ? <span className='share-ended'>Les votes sont clos</span>
      : total === 0
        ? (<span className='share-ended'>Nombres d'étoiles atteint, vous pouvez modifier votre vote jusqu'à la fin de la présentation</span>)
        : (<span className='to-share'>A répartir : <RateStar total={total} /></span>)
    const snackbar = this.props && this.props.apiState === 'error'
      ? <Snackbar open message='Pas de réseau' autoHideDuration={3000} onRequestClose={() => dispatch(currentUserApiStateReset())} />
      : ''
    const linearPending = this.props && this.props.apiState === 'pending'
      ? <LinearProgress mode='indeterminate' style={{backgroundColor: 'white'}} />
      : null

    return (
      <DocumentTitle title='Votez'>
        <div>
          <MenuNavigation logOut={() => dispatch(logOut())} open={menuOpen} onClose={() => dispatch(toggleMenu(false))} />
          <Sticky innerZ={100}>
            <AppBar title='Evolutions à voter' onLeftIconButtonTouchTap={() => dispatch(toggleMenu(true))} />
            <div style={{height: 8, backgroundColor: 'white'}}>{linearPending}</div>
            <div className='stars'>{stars}</div>
          </Sticky>

          <Card style={{margin: '10px'}}>
            <CardText style={{paddingTop: 0}}>
              {
                subjects.map((subject) =>
                  <SubjectWidget
                    subject={subject}
                    key={subject.id}
                    canAdd={statusVote !== 'vote-closed' && total > 0 && subject.points < 5}
                    canRemove={statusVote !== 'vote-closed' && subject.points > 0}
                    onAdd={() => dispatch(addPoint(subject, idUser, totalSubjects.points))}
                    onRemove={() => dispatch(removePoint(subject, idUser))} />
                )
              }
            </CardText>
            <CardActions style={{textAlign: 'right', padding: '12px'}}>
              <RaisedButton style={{margin: 0}} label='Retour' icon={<ArrowBack />} secondary containerElement={<Link to='/' />} />
            </CardActions>
          </Card>
          {snackbar}
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({subjects, currentUser: { email, idUser, statusVote, menuOpen, apiState }}) => ({subjects, email, idUser, statusVote, menuOpen, apiState})

export default connect(mapStateToProps)(VoteScreen)

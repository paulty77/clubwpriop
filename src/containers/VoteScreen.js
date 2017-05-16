import React, {Component} from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import {Card, CardActions, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { Link, Redirect } from 'react-router-dom'
import { addPoint, removePoint, MAX_POINTS } from '../action-creators'
import SubjectWidget from '../components/SubjectWidget'
import RateStar from '../components/RateStar'
import Sticky from 'react-stickynode'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import '../styles/Vote.css'

export class VoteScreen extends Component {
  componentDidMount () {
    if (!this.props.email || this.props.subjects.length === 0) {
      return (<Redirect to='/' />)
    }
  }

  render () {
    const { subjects, dispatch, statusVote, idUser } = this.props
    const totalSubjects = subjects.length !== 0
      ? subjects.reduce((tot, subject) => ({points: tot.points + subject.points})) : 0

    const total = statusVote === 'vote-opened' ? MAX_POINTS - totalSubjects.points : 0
    const stars = statusVote === 'vote-closed' ? 'Les votes sont clos' : <RateStar total={total} />
    return (
      <DocumentTitle title='Votez'>
        <div>
          <Card>
            <Sticky innerZ={100}>
              <AppBar title='Club Wpriop' showMenuIconButton={false} iconElementRight={<FlatButton label='Info' containerElement={<Link to='/' />} />} />
              <div className='stars'>{stars}</div>
            </Sticky>
            <CardText>
              {
                subjects.map((subject) =>
                  <SubjectWidget
                    subject={subject}
                    key={subject.id}
                    canAdd={statusVote !== 'vote-closed' && total > 0}
                    canRemove={statusVote !== 'vote-closed' && subject.points > 0}
                    onAdd={() => dispatch(addPoint(subject, idUser, totalSubjects.points))}
                    onRemove={() => dispatch(removePoint(subject, idUser))} />
                )
              }
            </CardText>
            <CardActions>
              <RaisedButton label='Retour' secondary containerElement={<Link to='/' />} />
            </CardActions>
          </Card>
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({subjects, currentUser: { email, idUser, statusVote }}) => ({subjects, email, idUser, statusVote})

export default connect(mapStateToProps)(VoteScreen)

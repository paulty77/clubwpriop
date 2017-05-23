import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import {Card, CardText, CardTitle} from 'material-ui/Card'
import ResultWidget from '../components/ResultWidget'
import OpenClose from '../components/OpenClose'
import {setStatusVote} from '../action-creators'
import callAPI from '../lib/api'
import { REFRESH_INTERVAL } from '../lib/globals'

export class SettingsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {results: []}
  }

  async setData () {
    const data = await callAPI({
      action: '/vote',
      method: 'GET'
    })
    this.setState({results: data})
  }

  componentDidMount () {
    this.timer = setInterval(() => this.setData(), REFRESH_INTERVAL)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const subjectsCummulate = this.state.results.length !== 0
      ? this.state.results.reduce((tot, subject) => ({points: tot.points + subject.points}))
      : 0
    return (
      <DocumentTitle title='Tableau de board'>
        <Card>
          <CardTitle title={<div>
                      Paramètres
                      <OpenClose
                        statusVote={this.props.statusVote}
                        onSetStatusVote={() => this.props.dispatch(setStatusVote(!this.props.statusVote))} />
          </div>} />
          <CardText>
            Résultats des votes
            {
              this.state.results.map((result) =>
                <ResultWidget label={result.label} points={result.points} number={result.number} total={subjectsCummulate.points} key={result.id} />
              )
            }
          </CardText>
        </Card>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({admin: { statusVote }}) => ({statusVote})

export default connect(mapStateToProps)(SettingsScreen)

import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import {Card, CardText, CardTitle} from 'material-ui/Card'
import ResultWidget from '../components/ResultWidget'
import OpenClose from '../components/OpenClose'
import {setStatusVote} from '../action-creators'
import callAPI from '../lib/api'

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
    this.timer = setInterval(() => this.setData(), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
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
                  <ResultWidget result={result} key={result.id} />
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

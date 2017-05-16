import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import {Card, CardText} from 'material-ui/Card'
import ResultWidget from '../components/ResultWidget'
import callAPI from '../lib/api'
import AppBar from 'material-ui/AppBar'
import Sticky from 'react-stickynode'
import { REFRESH_INTERVAL } from '../lib/globals'

export class ScoreScreen extends Component {
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
    return (
      <DocumentTitle title='Résultat des votes'>
        <div>
          <Sticky innerZ={100}>
            <AppBar
              title='Club Wpriop'
              showMenuIconButton={false}
            />
          </Sticky>
          <Card>
            <CardText>
              {
                  this.state.results.map((result) =>
                    <ResultWidget result={result} key={result.id} />
                  )
              }
            </CardText>
          </Card>
        </div>
      </DocumentTitle>
    )
  }
}

export default ScoreScreen

import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import ResultWidget from '../components/ResultWidget'
import callAPI from '../lib/api'
import AppBar from 'material-ui/AppBar'
import { REFRESH_INTERVAL } from '../lib/globals'
import LogoL from '../icons/logo_logaviv.svg'
import LogoW from '../icons/logo-wpriop-blanc.svg'
import '../styles/Score.css'

export class ScoreScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {results: []}
    this.setData()
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

    const title = (
      <div className='title'>
        Club&nbsp;<img src={LogoW} height={'20vh'} /> Résultats des votes en temps réel <img src={LogoL} height={'40vh'} />
      </div>)

    return (
      <DocumentTitle title='Résultat des votes'>
        <div className='score'>
          <AppBar title={title} showMenuIconButton={false} />
          <div className='body'>
            {
              this.state.results.map((result) =>
                <ResultWidget label={result.label} points={result.points} number={result.number} total={subjectsCummulate.points} key={result.id} />
              )
            }
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default ScoreScreen

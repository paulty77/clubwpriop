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

    const title = (<span>Club <img src={LogoW} height={'20vh'} /> - votre avis sur les évolutions futures de WPRIOP - 8 juin 2017 <img src={LogoL} height={'20vh'} /></span>)

    return (
      <DocumentTitle title='Résultat des votes'>
        <div >
          <AppBar title={title} showMenuIconButton={false} />
          <div className='score'>
              {
                  this.state.results.map((result) =>
                    <ResultWidget label={result.label} points={result.points} total={subjectsCummulate.points} key={result.id} />
                  )
              }
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default ScoreScreen

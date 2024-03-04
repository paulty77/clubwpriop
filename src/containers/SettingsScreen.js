import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import {Card, CardText, CardTitle} from 'material-ui/Card'
import OpenClose from '../components/OpenClose'
import {setStatusVote} from '../action-creators'
import { URL_WEB_API_PROD, URL_WEB_API_DEV } from '../lib/globals'

export class SettingsScreen extends Component {
  render () {
    const urlRoot = process.env.NODE_ENV === 'dev' ? URL_WEB_API_DEV : URL_WEB_API_PROD
    const url = `${urlRoot.replace('/api', '')}/score`

    return (
      <DocumentTitle title='Tableau de board'>
        <Card style={{margin: '10px', height: 'calc(100vh - 20px)'}} containerStyle={{height: '100%', padding: 0}}>
          <CardTitle title={
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                Paramètres
              </div>
              <div>
                <OpenClose
                  statusVote={this.props.statusVote}
                  onSetStatusVote={() => this.props.dispatch(setStatusVote(!this.props.statusVote))} />
              </div>
            </div>
        } />
          <CardText style={{height: 'calc(100% - 68px - 32px)'}}>
            <iframe src={url} width='100%' height='600' marginWidth='0' marginHeight='0' style={{border: 'none', height: '-webkit-fill-available'}} />
          </CardText>
        </Card>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({admin: { statusVote }}) => ({statusVote})

export default connect(mapStateToProps)(SettingsScreen)

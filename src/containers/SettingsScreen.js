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
        <Card>
          <CardTitle title={<div>
                      Paramètres
                      <OpenClose
                        statusVote={this.props.statusVote}
                        onSetStatusVote={() => this.props.dispatch(setStatusVote(!this.props.statusVote))} />
          </div>} />
          <CardText>
            <iframe src={url} width='100%' height='600' frameBorder='0' marginWidth='0' marginHeight='0' />
          </CardText>
        </Card>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({admin: { statusVote }}) => ({statusVote})

export default connect(mapStateToProps)(SettingsScreen)

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'
import store from './store.js'
import HomeScreen from './containers/HomeScreen'
import VoteScreen from './containers/VoteScreen'
import ScoreScreen from './containers/ScoreScreen'
import AdminScreen from './containers/AdminScreen'
import ChangeEmailScreen from './containers/ChangeEmailScreen'
import './styles/Main.css'
import {grey500} from 'material-ui/styles/colors'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#1072ad',
    accent1Color: grey500
  }
})

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router>
        <div>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/score' component={ScoreScreen} />
          <Route exact path='/admin' component={AdminScreen} />
          <Route exact path='/vote' component={VoteScreen} />
          <Route exact path='/change' component={ChangeEmailScreen} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root')
)

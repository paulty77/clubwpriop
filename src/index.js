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
import RefreshScreen from './containers/RefreshScreen'
import './styles/Main.css'
import {grey500} from 'material-ui/styles/colors'
import { COLOR_GRAINBOW, COLOR_AGRIMARKET } from './lib/globals.js'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: COLOR_GRAINBOW,
    accent1Color: grey500
  },
  raisedButton: {
    secondaryColor: COLOR_AGRIMARKET
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
          <Route exact path='/refresh' component={RefreshScreen} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}

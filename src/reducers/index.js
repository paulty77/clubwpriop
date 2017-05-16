import {combineReducers} from 'redux'
import currentUser from './currentUser'
import subjects from './subjects'
import admin from './admin'

const clubWpriopReducer = combineReducers({
  admin,
  currentUser,
  subjects
})

export default clubWpriopReducer

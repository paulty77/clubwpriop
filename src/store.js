import { createStore, applyMiddleware, compose } from 'redux'
import clubWpriopReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'

const DEFAULT_STATE = {
  admin: {
    loginState: 'not-logged',
    statusVote: false
  },
  currentUser: {
    email: null,
    idUser: null,
    statusVote: null,
    apiState: null
  },
  subjects: []
}

const enhancer = compose(
 autoRehydrate(),
 applyMiddleware(thunkMiddleware),
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
? window.__REDUX_DEVTOOLS_EXTENSION__()
: (x) => x
)

const store = createStore(clubWpriopReducer, DEFAULT_STATE, enhancer)
persistStore(store)

export default store

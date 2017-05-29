import { createStore, applyMiddleware, compose } from 'redux'
import clubWpriopReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'
import localForage from 'localforage'

const DEFAULT_STATE = {
  admin: {
    loginState: 'not-logged',
    statusVote: false
  },
  currentUser: {
    email: null,
    idUser: null,
    statusVote: null,
    apiState: null,
    menuOpen: false
  },
  subjects: []
}

const enhancer = compose(
 applyMiddleware(thunkMiddleware),
 autoRehydrate(),
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
? window.__REDUX_DEVTOOLS_EXTENSION__()
: (x) => x
)

const store = createStore(clubWpriopReducer, DEFAULT_STATE, enhancer)
persistStore(store, {storage: localForage})

export default store

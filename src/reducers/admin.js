import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_START,
 SET_STATUS_VOTE_START, SET_STATUS_VOTE_SUCCESS, SET_STATUS_VOTE_FAILURE } from '../action-creators'

export default function admin (state = {loginState: 'not-logged', statusVote: false}, action) {
  switch (action.type) {
    case AUTH_LOGIN_START:
      return {loginState: 'pending', statusVote: false}
    case AUTH_LOGIN_SUCCESS:
      return {loginState: 'logged', statusVote: action.payload.statusVote}
    case AUTH_LOGIN_FAILURE:
      return {loginState: 'not-logged', statusVote: false}
    case SET_STATUS_VOTE_START:
      return {loginState: 'logged', statusVote: false}
    case SET_STATUS_VOTE_SUCCESS:
      return {loginState: 'logged', statusVote: action.payload.statusVote}
    case SET_STATUS_VOTE_FAILURE:
      return {loginState: 'logged', statusVote: false}
    default :
      return state
  }
}

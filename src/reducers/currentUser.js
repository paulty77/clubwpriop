import {USER_EMAIL_START, USER_EMAIL_FAILURE, USER_EMAIL_SUCCESS, USER_SET_STATUS_VOTE, CHANGE_EMAIL_START,
        CHANGE_EMAIL_FAILURE, CHANGE_EMAIL_SUCCESS} from '../action-creators'

export default function currentUser (state = {email: null, statusVote: 'vote-opened'}, action) {
  switch (action.type) {
    case USER_EMAIL_START:
      return {email: null, idUser: null, statusVote: 'pending'}
    case USER_EMAIL_SUCCESS:
      return {email: action.payload.email, idUser: action.payload.idUser, statusVote: action.payload.statusVote}
    case USER_EMAIL_FAILURE:
      return {email: null, idUser: null, statusVote: 'error'}
    case USER_SET_STATUS_VOTE:
      return {email: state.email, idUser: state.idUser, statusVote: action.payload.statusVote}
    case CHANGE_EMAIL_START:
      return {email: state.email, idUser: state.idUser, statusVote: 'pending'}
    case CHANGE_EMAIL_SUCCESS:
      return {email: action.payload.email, idUser: state.idUser, statusVote: state.statusVote}
    case CHANGE_EMAIL_FAILURE:
      return {email: state.email, idUser: state.idUser, statusVote: 'error'}
    default:
      return state
  }
}

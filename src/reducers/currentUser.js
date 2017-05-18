import {USER_EMAIL_START, USER_EMAIL_FAILURE, USER_EMAIL_SUCCESS, USER_SET_STATUS_VOTE, CHANGE_EMAIL_START,
        CHANGE_EMAIL_FAILURE, CHANGE_EMAIL_SUCCESS, MENU_OPEN} from '../action-creators'

export default function currentUser (state = {email: null, statusVote: 'vote-opened', apiState: null, menuOpen: false}, action) {
  switch (action.type) {
    case USER_EMAIL_START:
      return {email: null, idUser: null, statusVote: null, apiState: 'pending', menuOpen: false}
    case USER_EMAIL_SUCCESS:
      return {email: action.payload.email, idUser: action.payload.idUser, statusVote: action.payload.statusVote, apiState: 'success', menuOpen: false}
    case USER_EMAIL_FAILURE:
      return {email: null, idUser: null, statusVote: null, apiState: 'error', menuOpen: false}
    case USER_SET_STATUS_VOTE:
      return {email: state.email, idUser: state.idUser, statusVote: action.payload.statusVote, apiState: 'success', menuOpen: false}
    case CHANGE_EMAIL_START:
      return {email: state.email, idUser: state.idUser, statusVote: state.statusVote, apiState: 'pending', menuOpen: false}
    case CHANGE_EMAIL_SUCCESS:
      return {email: action.payload.email, idUser: state.idUser, statusVote: state.statusVote, apiState: 'success', menuOpen: false}
    case CHANGE_EMAIL_FAILURE:
      return {email: state.email, idUser: state.idUser, statusVote: state.statusVote, apiState: 'error', menuOpen: false}
    case MENU_OPEN:
      return {email: state.email, idUser: state.idUser, statusVote: state.statusVote, apiState: null, menuOpen: action.payload.menuOpen}
    default:
      return state
  }
}

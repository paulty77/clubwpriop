import callAPI from './lib/api'

/** currentUser **/
export const USER_EMAIL_START = '@@CLUBWPRIOP/AUTH_EMAIL_START'
export const USER_EMAIL_SUCCESS = '@@CLUBWPRIOP/AUTH_EMAIL_SUCCESS'
export const USER_EMAIL_FAILURE = '@@CLUBWPRIOP/AUTH_EMAIL_FAILURE'

export function emailIn (email) {
  return async (dispatch) => {
    dispatch(emailInStart())
    try {
      const action = `/user?email=${email}`
      const response = await callAPI({
        action
      })

      if (response) {
        dispatch(loadSubject(response.subjects))
        dispatch(emailInSuccess(email, response.idUser, response.statusVote))
      } else {
        dispatch(emailInFailure())
      }
    } catch (err) {
      dispatch(emailInFailure())
      console.error(err)
    }
  }
}

export function emailInFailure () {
  return {type: USER_EMAIL_FAILURE}
}

export function emailInStart () {
  return {type: USER_EMAIL_START}
}

export function emailInSuccess (email, idUser, statusVote) {
  return {type: USER_EMAIL_SUCCESS, payload: {email, idUser, statusVote}}
}

/** subjects **/
export const MAX_POINTS = 10
export const SUBJECT_UPDATEDPOINT = '@@CLUBWPRIOP/SUBJECT_UPDATEDPOINT'
export const SUBJECTS_LOADED = '@@CLUBWPRIOP/SUBJECTS_LOADED'
export const USER_VOTE_START = '@@CLUBWPRIOP/USER_VOTE_START'
export const USER_VOTE_FAILURE = '@@CLUBWPRIOP/USER_VOTE_FAILURE'
export const USER_SET_STATUS_VOTE = '@@CLUBWPRIOP/USER_SET_STATUS_VOTE'

export function addPoint ({id, points}, idUser, total, increment = 1) {
  return async (dispatch) => {
    dispatch(userVoteStart())
    try {
      points = MAX_POINTS > total ? points + increment : points
      const response = await callAPI({
        action: '/vote',
        method: 'POST',
        body: JSON.stringify({id, points, idUser})
      })

      if (response.hasOwnProperty('statusVote')) {
        dispatch(userSetStatusVote(response.statusVote))
        if (response.statusVote !== 'vote-closed') {
          dispatch(updatedPoint(id, points))
        }
      } else {
        dispatch(userVoteFailure())
      }
    } catch (err) {
      dispatch(userVoteFailure())
      console.error(err)
    }
  }
}

export function removePoint ({id, points}, idUser, increment = 1) {
  return async (dispatch) => {
    dispatch(userVoteStart())
    try {
      points = Math.max(points - increment, 0)
      const response = await callAPI({
        action: '/vote',
        method: 'POST',
        body: JSON.stringify({id, points, idUser})
      })

      if (response.hasOwnProperty('statusVote')) {
        dispatch(userSetStatusVote(response.statusVote))
        if (response.statusVote !== 'vote-closed') {
          dispatch(updatedPoint(id, points))
        }
      } else {
        dispatch(userVoteFailure())
      }
    } catch (err) {
      dispatch(userVoteFailure())
      console.error(err)
    }
  }
}

export function updatedPoint (id, points) {
  return {type: SUBJECT_UPDATEDPOINT, payload: {id, points}}
}

export function loadSubject (subjects) {
  return {type: SUBJECTS_LOADED, payload: {subjects}}
}

export function userVoteFailure () {
  return {type: USER_VOTE_FAILURE}
}

export function userVoteStart () {
  return {type: USER_VOTE_START}
}

export function userSetStatusVote (statusVote) {
  return {type: USER_SET_STATUS_VOTE, payload: {statusVote}}
}

/** admin **/
export const AUTH_LOGIN_START = '@@CLUBWPRIOP/AUTH_LOGIN_START'
export const AUTH_LOGIN_SUCCESS = '@@CLUBWPRIOP/AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = '@@CLUBWPRIOP/AUTH_LOGIN_FAILURE'
export const SET_STATUS_VOTE_START = '@@CLUBWPRIOP/SET_STATUS_VOTE_START'
export const SET_STATUS_VOTE_SUCCESS = '@@CLUBWPRIOP/SET_STATUS_VOTE_SUCCESS'
export const SET_STATUS_VOTE_FAILURE = '@@CLUBWPRIOP/SET_STATUS_VOTE_FAILURE'

export function adminLogIn (login, password) {
  return async (dispatch) => {
    dispatch(adminLogInStart())
    try {
      const response = await callAPI({
        action: '/admin',
        body: JSON.stringify({login, password})
      })

      if (response.hasOwnProperty('statusVote')) {
        dispatch(adminLogInSuccess(response.statusVote))
      } else {
        dispatch(adminLogInFailure())
      }
    } catch (err) {
      dispatch(adminLogInFailure())
      console.error(err)
    }
  }
}

export function adminLogInFailure () {
  return { type: AUTH_LOGIN_FAILURE }
}

export function adminLogInStart () {
  return { type: AUTH_LOGIN_START }
}

export function adminLogInSuccess (statusVote) {
  return { type: AUTH_LOGIN_SUCCESS, payload: {statusVote} }
}

export function setStatusVote (statusVote) {
  return async (dispatch) => {
    dispatch(setStatusVoteStart())
    try {
      const response = await callAPI({
        action: '/vote',
        method: 'PUT',
        body: JSON.stringify({statusVote})
      })

      if (response.hasOwnProperty('statusVote')) {
        dispatch(setStatusVoteSuccess(response.statusVote))
      } else {
        dispatch(setStatusVoteFailure)
      }
    } catch (err) {
      dispatch(setStatusVoteFailure())
      console.error(err)
    }
  }
}

export function setStatusVoteFailure () {
  return {type: SET_STATUS_VOTE_FAILURE}
}

export function setStatusVoteStart () {
  return {type: SET_STATUS_VOTE_START}
}

export function setStatusVoteSuccess (statusVote) {
  return {type: SET_STATUS_VOTE_SUCCESS, payload: {statusVote}}
}

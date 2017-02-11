import axios from 'axios'
import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
export const REGISTER_ATTEMPT = 'REGISTER_ATTEMPT'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

export const LOGOUT = 'LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------
export const registerAttempt = (error) => ({
  error,
  type: REGISTER_ATTEMPT
})

export const registerError = (error) => ({
  error,
  type: REGISTER_ERROR
})

export const registerSuccess = (client) => ({
  client,
  type: REGISTER_SUCCESS
})

export const register = (client) => {
  return dispatch => {
    dispatch(registerAttempt())
    axios({
      url: 'http://localhost:8080/client/register',
      method: 'post',
      data: client,
      responseType: 'json',
      contentType: 'json'
    })
    .then(response => {
      dispatch(registerSuccess(response.data))
      browserHistory.push('/products')
    })
    .catch(response => {
      dispatch(registerError(response.data))
    })
  }
}

export const logout = () => ({
  type: LOGOUT
})

export const actions = {
  register,
  registerAttempt,
  registerSuccess,
  registerError,
  logout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGISTER_ATTEMPT]   : (state, action) => {
    return Object.assign({}, state, { isFetching: true, isLoggedIn: false })
  },
  [REGISTER_SUCCESS]   : (state, action) => {
    return Object.assign({}, state, { client: action.client, isFetching: false, isLoggedIn: true })
  },
  [REGISTER_ERROR]     : (state, action) => {
    return Object.assign({}, state, { isFetching: false, isLoggedIn: false })
  },
  [LOGOUT]              : (state, action) => {
    return Object.assign({}, state, { client: undefined, isLoggedIn: false })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoggedIn: false,
  client: undefined,
  isFetching: false
}

export default function registerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

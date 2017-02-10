import axios from 'axios'
import {browserHistory} from 'react-router'

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
  registerSuccess,
  registerError,
  logout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGISTER_SUCCESS]   : (state, action) => {
    return action.client
  },
  [REGISTER_ERROR]     : (state, action) => {
    return state
    // push an error somehow
  },
  [LOGOUT]              : (state, action) => {
    return null
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null

export default function registerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

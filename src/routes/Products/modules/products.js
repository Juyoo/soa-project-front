import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const QUERY_PRODUCTS = 'QUERY_PRODUCTS'
export const QUERY_PRODUCTS_SUCCESS = 'QUERY_PRODUCTS_SUCCESS'
export const QUERY_PRODUCTS_ERROR = 'QUERY_PRODUCTS_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export const queryProductsError = (error) => ({
  error,
  type: QUERY_PRODUCTS_ERROR
})

export const queryProductsSuccess = (products) => ({
  products,
  type: QUERY_PRODUCTS_SUCCESS
})

export const queryProducts = () => {
  return dispatch => {
    axios({
      url: 'http://localhost:8080/products',
      method: 'get',
      responseType: 'json'
    })
    .then(response => {
      dispatch(queryProductsSuccess(response.data))
    })
    .catch(response => {
      dispatch(queryProductsError(response.data))
    })
  }
}

export const actions = {
  queryProducts,
  queryProductsSuccess,
  queryProductsError
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUERY_PRODUCTS_SUCCESS]   : (state, action) => {
    return action.products
  },
  [QUERY_PRODUCTS_ERROR]     : (state, action) => {
    return state
    // push an error somehow
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

import axios from 'axios'
import { browserHistory } from 'react-router'
import { emptyCart } from './cart'

// ------------------------------------
// Constants
// ------------------------------------
export const VALIDATE_ORDER_SUCCESS = 'VALIDATE_ORDER_SUCCESS'
export const VALIDATE_ORDER_ERROR = 'VALIDATE_ORDER_ERROR'
export const ESTIMATE_SHIPPING_COST_ATTEMPT = 'ESTIMATE_SHIPPING_COST_ATTEMPT'
export const ESTIMATE_SHIPPING_COST_SUCCESS = 'ESTIMATE_SHIPPING_COST_SUCCESS'
export const ESTIMATE_SHIPPING_COST_ERROR = 'ESTIMATE_SHIPPING_COST_ERROR'
export const RESET_SHIPPING = 'RESET_SHIPPING'

// ------------------------------------
// Actions
// ------------------------------------
export const validateOrder = (client, cart, address) => {
  return dispatch => {
    axios({
      url: 'http://localhost:8080/order',
      method: 'post',
      data: {
        client,
        cart: {
          productWithWties: cart
        },
        recipientAddress: address
      },
      responseType: 'json',
      contentType: 'json'
    })
    .then(response => {
      dispatch(validateOrderSuccess(response.data))
      setTimeout(() => dispatch(emptyCart()), 300)
      browserHistory.push('/products')
    })
    .catch(response => {
      dispatch(validateOrderError(response.data))
    })
  }
}

export const validateOrderSuccess = (shipping) => ({
  shipping,
  type: VALIDATE_ORDER_SUCCESS
})

export const validateOrderError = (error) => ({
  error,
  type: VALIDATE_ORDER_ERROR
})

export const estimateShippingAttempt = () => ({
  type: ESTIMATE_SHIPPING_COST_ATTEMPT
})

export const estimateShipping = (client, cart, address) => {
  return dispatch => {
    dispatch(estimateShippingAttempt())

    axios({
      url: 'http://localhost:8080/order/estimate',
      method: 'post',
      data: {
        client,
        cart: {
          productWithWties: cart
        },
        recipientAddress: address
      },
      responseType: 'json',
      contentType: 'json'
    })
    .then(response => {
      dispatch(estimateShippingSuccess(response.data))
    })
    .catch(response => {
      dispatch(estimateShippingError(response.data))
    })
  }
}

export const estimateShippingSuccess = (price) => ({
  price,
  type: ESTIMATE_SHIPPING_COST_SUCCESS
})

export const estimateShippingError = (error) => ({
  error,
  type: ESTIMATE_SHIPPING_COST_ERROR
})

export const resetShipping = () => ({
  type: RESET_SHIPPING
})

export const actions = {
  validateOrder,
  validateOrderSuccess,
  validateOrderError,
  estimateShipping,
  estimateShippingAttempt,
  estimateShippingSuccess,
  estimateShippingError,
  resetShipping
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [VALIDATE_ORDER_SUCCESS]          : (state, action) => {
    return state
  },
  [VALIDATE_ORDER_ERROR]            : (state, action) => {
    return state
  },
  [ESTIMATE_SHIPPING_COST_ATTEMPT]  : (state, action) => {
    return Object.assign({}, state, { isFetchingEstimate: true })
  },
  [ESTIMATE_SHIPPING_COST_SUCCESS]  : (state, action) => {
    return Object.assign({}, state, {
      estimatedShippingPrice: parseFloat(action.price.price.toFixed(2)),
      error: undefined,
      isFetchingEstimate: false
    })
  },
  [ESTIMATE_SHIPPING_COST_ERROR]    : (state, action) => {
    return Object.assign({}, state, {
      estimatedShippingPrice: undefined,
      error: action.error,
      isFetchingEstimate: false
    })
  },
  [RESET_SHIPPING]         : (state, action) => {
    return Object.assign({}, state, { estimatedShippingPrice: undefined, error: undefined })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  estimatedShippingPrice: undefined,
  error: undefined,
  isFetchingEstimate: false
}

export default function shippingReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const ESTIMATE_SHIPPING_COST_SUCCESS = 'ESTIMATE_SHIPPING_COST_SUCCESS'
export const ESTIMATE_SHIPPING_COST_ERROR = 'ESTIMATE_SHIPPING_COST_ERROR'
export const RESET_SHIPPING = 'RESET_SHIPPING'

// ------------------------------------
// Actions
// ------------------------------------
export const estimateShipping = (client, cart, address) => {
  return dispatch => {
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
      dispatch(estimateShippingSuccess(response.data));
    })
    .catch(response => {
      dispatch(estimateShippingError(response.data));
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
  estimateShipping,
  estimateShippingSuccess,
  estimateShippingError,
  resetShipping
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ESTIMATE_SHIPPING_COST_SUCCESS]  : (state, action) => {
    return Object.assign({}, state, {estimatedShippingPrice: parseFloat(action.price.price.toFixed(2)), error: undefined})
  },
  [ESTIMATE_SHIPPING_COST_ERROR]    : (state, action) => {
    return Object.assign({}, state, {estimatedShippingPrice: undefined, error: action.error})
  },
  [RESET_SHIPPING]         : (state, action) => {
    return Object.assign({}, state, {estimatedShippingPrice: undefined, error: undefined})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  estimatedShippingPrice: undefined,
  error: undefined
}

export default function shippingReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

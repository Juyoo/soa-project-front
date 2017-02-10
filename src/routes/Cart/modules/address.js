// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'

// ------------------------------------
// Actions
// ------------------------------------
export const updateAddress = (address) => ({
  address,
  type: UPDATE_ADDRESS
})

export const actions = {
  updateAddress
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_ADDRESS]   : (state, action) => {
    return Object.assign({}, state, {...action.address});
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  streetNumber: '',
  street: '',
  zip: '',
  city: ''
}

export default function addressReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

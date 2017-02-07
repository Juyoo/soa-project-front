import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

// ------------------------------------
// Actions
// ------------------------------------
export const addToCart = (product) => ({
  product,
  type: ADD_TO_CART
})

export const removeFromCart = (product) => ({
  product,
  type: REMOVE_FROM_CART
})

export const actions = {
  addToCart,
  removeFromCart
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_TO_CART]   : (state, action) => {
    return addProductToCart(Object.assign([], state), action.product)
  },
  [REMOVE_FROM_CART] : (state, action) => {
    return removeProductFromCart(Object.assign([], state), action.product)
  }
}

const findProductsInCart = (cart, product) => {
  return cart.filter((cartItem) => cartItem.product.id === product.id)
}
const removeProductFromCart = (immutableCart, product) => {
  const foundCartItems = findProductsInCart(immutableCart, product)
  if (foundCartItems.length === 0) return immutableCart

  const foundCartItem = foundCartItems[0]
  if (foundCartItem.quantity === 1) {
    return immutableCart.filter((cartItem) => cartItem.product.id !== product.id)
  }

  immutableCart.forEach((cartItem, index) => {
    if (cartItem.product.id === product.id) {
      immutableCart[index].quantity = immutableCart[index].quantity - 1
    }
  })
  return immutableCart;
}
const addProductToCart = (immutableCart, product) => {
  if (findProductsInCart(immutableCart, product).length === 0) {
    immutableCart.push({
      product: product,
      quantity: 1
    })
    return immutableCart
  }

  immutableCart.forEach((cartItem, index) => {
    if (cartItem.product.id === product.id) {
      immutableCart[index].quantity = immutableCart[index].quantity + 1
    }
  })
  return immutableCart;
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

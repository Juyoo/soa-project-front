import { combineReducers } from 'redux'
import locationReducer from './location'
import cart from '../routes/Cart/modules/cart'
import register from '../routes/Register/modules/register'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    cart: cart,
    client: register,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

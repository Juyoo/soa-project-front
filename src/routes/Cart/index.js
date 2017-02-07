import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'cart',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Cart = require('./components/Cart').default
      const reducer = require('./modules/cart').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'cart', reducer })

      /*  Return getComponent   */
      cb(null, Cart)

    /* Webpack named bundle   */
    }, 'cart')
  }
})

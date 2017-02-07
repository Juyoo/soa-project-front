import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'products',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Product = require('./containers/ProductsContainer').default
      const reducer = require('./modules/products').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'products', reducer })

      /*  Return getComponent   */
      cb(null, Product)

    /* Webpack named bundle   */
    }, 'products')
  }
})

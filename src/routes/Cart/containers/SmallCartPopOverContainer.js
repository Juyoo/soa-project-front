import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import SmallCartPopOver from '../components/SmallCartPopOver'
import {removeFromCart} from '../../Cart/modules/cart'

const mapDispatchToProps = (dispatch, a, b, c) => {
  return {
    onGoToCart: (client) => {
      // if client and client.password are set, it means the client is connected... what a dirty way to do this....
      if (client && client.password) {
        browserHistory.push('/cart')
      } else {
        browserHistory.push('/register')
      }
    },
    onRemoveFromCart: (product) => dispatch(removeFromCart(product))
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  client: state.client
})

export default connect(mapStateToProps, mapDispatchToProps)(SmallCartPopOver)

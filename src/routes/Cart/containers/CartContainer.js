import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import Cart from '../components/Cart'
import {removeFromCart} from '../../Cart/modules/cart'
import {estimateShipping, resetShipping} from '../../Cart/modules/shipping'

const mapDispatchToProps = (dispatch) => {
  return {
    onGoToPayment: () => browserHistory.push('/payment'),
    onRemoveFromCart: (product) => dispatch(removeFromCart(product)),
    onEstimateShipping: (client, cart, address) => dispatch(estimateShipping(client, cart, address)),
    onResetShipping: () => dispatch(resetShipping())
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  client: state.client,
  shipping: state.shipping
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

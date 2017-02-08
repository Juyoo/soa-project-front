import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import Cart from '../components/Cart'
import {removeFromCart} from '../../Cart/modules/cart'

const mapDispatchToProps = (dispatch) => {
  return {
    onGoToPayment: () => browserHistory.push('/payment'),
    onRemoveFromCart: (product) => dispatch(removeFromCart(product))
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

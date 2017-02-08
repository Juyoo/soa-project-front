import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import SmallCartPopOver from '../components/SmallCartPopOver'
import {removeFromCart} from '../../Cart/modules/cart'

const mapDispatchToProps = (dispatch) => {
  return {
    onGoToCart: () => browserHistory.push('/cart'),
    onRemoveFromCart: (product) => dispatch(removeFromCart(product))
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

export default connect(mapStateToProps, mapDispatchToProps)(SmallCartPopOver)

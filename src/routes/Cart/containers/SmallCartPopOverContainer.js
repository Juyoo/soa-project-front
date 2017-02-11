import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SmallCartPopOver from '../components/SmallCartPopOver'
import { removeFromCart } from '../../Cart/modules/cart'

const SmartComponent = (props) => {
  const { isLoggedIn, ...rest } = props
  const onGoToCart = () => { browserHistory.push(isLoggedIn ? '/cart' : '/register') }

  return (<SmallCartPopOver {...rest} onGoToCart={onGoToCart} />)
}
SmartComponent.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveFromCart: (product) => dispatch(removeFromCart(product))
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  client: state.client.client,
  isLoggedIn: state.client.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(SmartComponent)

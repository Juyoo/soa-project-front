import React from 'react'
import { cartPropTypes } from '../../../proptypes'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Cart from '../components/Cart'
import { removeFromCart } from '../../Cart/modules/cart'
import { estimateShipping, resetShipping, validateOrder } from '../../Cart/modules/shipping'
import { updateAddress } from '../../Cart/modules/address'

const SmartCompnent = (props) => {
  const { onRedirectWhenNoCart, ...rest } = props
  if (!props.cart || props.cart.length === 0) {
    onRedirectWhenNoCart()
    return <div />
  }
  return (<Cart {...rest} />)
}
SmartCompnent.propTypes = {
  onRedirectWhenNoCart: React.PropTypes.func.isRequired,
  cart: cartPropTypes.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRedirectWhenNoCart: () => browserHistory.push('/products'),
    onGoToPayment: () => browserHistory.push('/payment'),
    onUpdateAddress: (address) => dispatch(updateAddress(address)),
    onRemoveFromCart: (product) => dispatch(removeFromCart(product)),
    onEstimateShipping: (client, cart, address) => dispatch(estimateShipping(client, cart, address)),
    onValidateOrder: (client, cart, address) => dispatch(validateOrder(client, cart, address)),
    onResetShipping: () => dispatch(resetShipping())
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  client: state.client.client,
  estimatedShippingPrice: state.shipping.estimatedShippingPrice,
  address: state.address,
  isFetchingEstimate: state.shipping.isFetchingEstimate
})

export default connect(mapStateToProps, mapDispatchToProps)(SmartCompnent)

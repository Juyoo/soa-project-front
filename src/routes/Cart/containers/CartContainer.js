import React from 'react'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import Cart from '../components/Cart'
import {removeFromCart} from '../../Cart/modules/cart'
import {estimateShipping, resetShipping, validateOrder} from '../../Cart/modules/shipping'
import {updateAddress} from '../../Cart/modules/address'

const SmartCompnent = (props) => {
  const {onRedirectWhenNoCart, ...rest} = props
  if (!props.cart || props.cart.length == 0) {
    onRedirectWhenNoCart()
    return <div></div>
  }
  return (<Cart {...rest} />)
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
  shipping: state.shipping,
  address: state.address,
  isFetchingEstimate: state.shipping.isFetchingEstimate
})

export default connect(mapStateToProps, mapDispatchToProps)(SmartCompnent)

import { connect } from 'react-redux'
import Products from '../components/Products'
import {queryProducts} from '../modules/products'
import {addToCart, removeFromCart} from '../../Cart/modules/cart'
import React from 'react'

class SmartComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  hasData = () => (
    this.props.products
  )

  render() {
    if (this.hasData()) {
      return <Products {...this.props} />
    } else {
      return this.renderLoading()
    }
  }

  renderLoading() {
    return (
      <div>Put a loader here :D</div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  dispatch(queryProducts())

  return {
    onAddToCart: (product) => dispatch(addToCart(product)),
    onRemoveFromCart: (product) => dispatch(removeFromCart(product))
  }
}

const mapStateToProps = (state) => {
  console.log('cart is', state.cart)
  return ({
  products: state.products
})}

export default connect(mapStateToProps, mapDispatchToProps)(SmartComponent)

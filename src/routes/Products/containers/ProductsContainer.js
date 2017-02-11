import { connect } from 'react-redux'
import Products from '../components/Products'
import {queryProducts} from '../modules/products'
import {addToCart, removeFromCart} from '../../Cart/modules/cart'
import FetchingIndicator from '../../../components/FetchingIndicator'
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
      <FetchingIndicator />
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

const mapStateToProps = (state) => ({
  products: state.products
})

export default connect(mapStateToProps, mapDispatchToProps)(SmartComponent)

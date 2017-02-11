import React from 'react'
import { cartPropTypes, cartItemPropTypes } from '../../../../proptypes'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { grey50 } from 'material-ui/styles/colors'

class CartRecap extends React.Component {
  static propTypes = {
    cart: cartPropTypes.isRequired
  }

  validate = () => {
    return (this.props.cart && this.props.cart.length > 0)
  }

  render = () => (
    <div className='row'>
      <div className='col-xs-12'>
        <Paper style={{ padding: 15 }}>
          <Subheader style={{ marginLeft: -15 }}>Liste des produits</Subheader>
          <List style={{ paddingBottom: 0 }}>
            {this.props.cart.map(cartItem => (
              <CartItemEntry key={cartItem.product.id} cartItem={cartItem} />
            ))}
            <Divider />
            <ListItem
              key='total'
              primaryText={'Total'}
              style={{ backgroundColor: grey50, fontWeight: 700 }}
              rightToggle={
                <div className='text-right' style={{ fontSize: 14, fontWeight: 400, width: 120 }}>
                  {this.props.cart
                    .map(cartItem => cartItem.quantity * cartItem.product.price)
                    .reduce((o, t) => o + t) + '€'
                  }
                </div>
              }
            />
          </List>
        </Paper>
      </div>
    </div>
  )
}

const CartItemEntry = (props) => (
  <ListItem
    style={{ fontWeight: 400, marginBottom: 0 }}
    rightToggle={
      <div className='text-right' style={{ fontSize: 14, fontWeight: 400 }}>
        {props.cartItem.quantity * props.cartItem.product.price} €
      </div>}
    primaryText={props.cartItem.product.name}
    secondaryText={props.cartItem.quantity + ' dans le panier'}
  />
)
CartItemEntry.propTypes = {
  cartItem: cartItemPropTypes.isRequired
}

export default CartRecap

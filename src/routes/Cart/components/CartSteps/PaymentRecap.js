import React from 'react'
import {cartPropTypes} from '../../../../proptypes'
import {CartItemEntry} from './CartRecap'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import {grey50} from 'material-ui/styles/colors'

class PaymentRecap extends React.Component {
  static propTypes = {
    estimatedShippingPrice: React.PropTypes.number.isRequired,
    cart: cartPropTypes.isRequired
  }

  constructor(props) {
    super(props)
  }

  validate = () => {
    return true
  }

  render = () => (
    <div className="row">
      <div className="col-xs-12">
        <Paper style={{padding: 15}}>
          <Subheader style={{marginLeft: -15}}>Payment</Subheader>
          <List style={{paddingBottom: 0}}>
            <ListItem
              style={{padding: 15, fontWeight: 400, marginBottom: 0}}
              rightToggle={<div className="text-right" style={{fontSize: 14, fontWeight: 400}}>{this.props.cart.map(cartItem => cartItem.quantity * cartItem.product.price).reduce((o, t) => o + t) + ' €'}</div>}
              primaryText={'Produits'}
            />
            <ListItem
              style={{padding: 15, fontWeight: 400, marginBottom: 0}}
              rightToggle={<div className="text-right" style={{fontSize: 14, fontWeight: 400}}>{this.props.estimatedShippingPrice + ' €'}</div>}
              primaryText={'Livraison'}
            />
            <Divider />
            <ListItem
              key="total"
              primaryText={'Total'}
              style={{backgroundColor: grey50, fontWeight: 700}}
              rightToggle={
                <div className="text-right" style={{fontSize: 14, fontWeight: 400, width: 120}}>
                  {this.props.estimatedShippingPrice + this.props.cart.map(cartItem => cartItem.quantity * cartItem.product.price).reduce((o, t) => o + t) + ' €'}
                </div>
              }
            />
          </List>
        </Paper>
      </div>
    </div>
  )
}

export default PaymentRecap

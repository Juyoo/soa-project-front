import React from 'react'
import { cartPropTypes, cartItemPropTypes, clientPropTypes } from '../../../proptypes'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import { red500 as red, transparent, grey400, grey50, green500 } from 'material-ui/styles/colors'

const styles = {
  label: {
    textTransform: 'capitalize'
  }
}

class SmallCartPopOver extends React.Component {
  static propTypes = {
    style: React.PropTypes.objectOf(React.PropTypes.any),
    onRemoveFromCart: React.PropTypes.func.isRequired,
    onGoToCart: React.PropTypes.func.isRequired,
    client: clientPropTypes,
    cart: cartPropTypes.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      isPopOverOpen: false,
      anchorEl: undefined
    }
  }

  openPopOver = (event) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      isPopOverOpen: true,
      anchorEl: event.currentTarget
    })
  }

  closePopOver = () => {
    this.setState({
      isPopOverOpen: false
    })
  }

  render = () => (
    <div style={{ ...this.props.style }}>
      <RaisedButton
        label='Panier'
        labelPosition='after'
        labelStyle={styles.label}
        primary
        onTouchTap={this.openPopOver}
        icon={<ShoppingCartIcon />}
        disabled={this.props.cart.length === 0}
      />
      <Popover
        open={this.state.isPopOverOpen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        onRequestClose={this.closePopOver}
        animation={PopoverAnimationVertical}
        >
        <CartList cart={this.props.cart} onRemoveFromCart={this.props.onRemoveFromCart} />
        <RaisedButton
          onTouchTap={() => this.props.onGoToCart(this.props.client)}
          label='Acceder a mon panier'
          backgroundColor={grey400}
          labelColor={grey50}
          fullWidth />
      </Popover>
    </div>
  )
}

const CartList = (props) => (
  <List style={{ padding: 0 }}>
    {props.cart.map((cartItem) => (
      <div key={cartItem.product.id}>
        <CartListItem
          cartItem={cartItem}
          onRemoveFromCart={() => props.onRemoveFromCart(cartItem.product)} />
        <Divider />
      </div>
    ))}
  </List>
)
CartList.propTypes = {
  cart: cartPropTypes.isRequired,
  onRemoveFromCart: React.PropTypes.func.isRequired
}

const CartListItem = (props) => (
  <ListItem
    innerDivStyle={{ fontWeight: 400, paddingLeft: 30, paddingBottom: 5, paddingTop: 15, fontSize: 12 }}
    leftAvatar={
      <Avatar size={30} color={green500} backgroundColor={transparent} style={{ left: 0, fontSize: 12 }}>
        {props.cartItem.quantity}
      </Avatar>
    }
    rightToggle={
      <IconButton
        style={{ padding: 0, height: 24, width: 24, top: 10 }}
        onTouchTap={() => props.onRemoveFromCart(props.cartItem.product)}
      >
        <DeleteIcon color={red} />
      </IconButton>
    }
    primaryText={props.cartItem.product.name}
  />
)
CartListItem.propTypes = {
  cartItem: cartItemPropTypes.isRequired,
  onRemoveFromCart: React.PropTypes.func.isRequired
}

export default SmallCartPopOver

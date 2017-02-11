import React from 'react'

export const clientPropTypes = React.PropTypes.shape({
  login: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  paymentServiceId: React.PropTypes.number.isRequired,
  paymentServiceToken: React.PropTypes.string.isRequired,
  providerServiceId: React.PropTypes.string.isRequired
})

export const addressPropTypes = React.PropTypes.shape({
  streetNumber: React.PropTypes.string.isRequired,
  street: React.PropTypes.string.isRequired,
  zip: React.PropTypes.string.isRequired,
  city: React.PropTypes.string.isRequired
})

export const productPropTypes = React.PropTypes.shape({
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  price: React.PropTypes.number.isRequired,
  quantity: React.PropTypes.number.isRequired,
  image: React.PropTypes.string.isRequired,
  available: React.PropTypes.bool.isRequired
})

export const cartItemPropTypes = React.PropTypes.shape({
  product: productPropTypes.isRequired,
  quantity: React.PropTypes.number.isRequired
})

export const cartPropTypes = React.PropTypes.arrayOf(cartItemPropTypes)

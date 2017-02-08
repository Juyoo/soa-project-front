import React from 'react'

export const ShippingRecap = (props) => (
  <div>
    hey boy
  </div>
)
ShippingRecap.Proptypes = {
  client: React.PropTypes.shape({
    login: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired,
    paymentServiceId: React.PropTypes.number.isRequired,
    paymentServiceToken: React.PropTypes.string.isRequired,
    providerServiceId: React.PropTypes.string.isRequired
  })
}

export default ShippingRecap

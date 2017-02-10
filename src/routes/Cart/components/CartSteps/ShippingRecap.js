import React from 'react'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export class ShippingRecap extends React.Component {
  static propTypes = {
    onResetShipping: React.PropTypes.func.isRequired,
    onEstimateShipping: React.PropTypes.func.isRequired,
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

  constructor(props)  {
    super(props)
    this.state = {
      streetNumber: '9',
    	street: 'rue de romagnat',
    	zip: '63000',
    	city: 'Clermont-Ferrand'
    }
  }

  componentWillMount = () => {
    this.props.onResetShipping()
  }

  validate = () => {
    return this.validateTextFields() && this.props.estimatedShippingPrice
  }

  validateTextFields = () => {
    let hasError = false
    if (this.state.streetNumber === '') {
      this.setState({streetNumberError: 'Champ requis'})
      hasError = true
    }
    if (this.state.street === '') {
      this.setState({streetError: 'Champ requis'})
      hasError = true
    }
    if (this.state.zip === '') {
      this.setState({zipError: 'Champ requis'})
      hasError = true
    }
    if (this.state.city === '') {
      this.setState({cityError: 'Champ requis'})
      hasError = true
    }

    return !hasError
  }

  handleEstimateShipping = () => {
    if (!this.validateTextFields()) {
      return
    }
    const {streetNumber, street, zip, city} = this.state
    this.props.onEstimateShipping(
      this.props.client,
      this.props.cart,
      { streetNumber, street, zip, city }
    )
  }

  render = () => (
    <div className="row">
      <div className="col-xs-12">
        <Paper style={{padding: 15}}>
          <Subheader style={{marginLeft: -15}}>Addresse</Subheader>
          <TextField
            style={{fontWeight: 400, marginRight: 50}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Numero de rue"
            errorText={this.state.streetNumberError ? <div style={{position: 'absolute'}}>{this.state.streetNumberError}</div> : ''}
            value={this.state.streetNumber}
            onChange={(event) => this.setState({streetNumber: event.target.value, streetNumberError: ''})}
          />
          <TextField
            style={{fontWeight: 400}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Rue"
            errorText={this.state.streetError ? <div style={{position: 'absolute'}}>{this.state.streetError}</div> : ''}
            value={this.state.street}
            onChange={(event) => this.setState({street: event.target.value, streetError: ''})}
          /><br />
          <TextField
            style={{fontWeight: 400, marginRight: 50}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Code postal"
            errorText={this.state.zipError ? <div style={{position: 'absolute'}}>{this.state.zipError}</div> : ''}
            value={this.state.zip}
            onChange={(event) => this.setState({zip: event.target.value, zipError: ''})}
          />
          <TextField
            style={{fontWeight: 400}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Ville"
            errorText={this.state.cityError ? <div style={{position: 'absolute'}}>{this.state.cityError}</div> : ''}
            value={this.state.city}
            onChange={(event) => this.setState({city: event.target.value, cityError: ''})}
          /><br />
        <div style={{marginTop: 25}} className="text-right">
            {this.props.estimatedShippingPrice ? this.props.estimatedShippingPrice + '€' : ''}
            <RaisedButton
              style={{marginLeft: 15}}
              label="Calculer les frais de livraisons"
              primary={true}
              onTouchTap={this.handleEstimateShipping}
            />
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default ShippingRecap

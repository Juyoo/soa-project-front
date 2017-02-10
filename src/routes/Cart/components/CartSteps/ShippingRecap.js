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
      streetNumberError: '',
      streetError: '',
      zipError: '',
      cityError: ''
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
    if (this.props.streetNumber === '') {
      this.setState({streetNumberError: 'Champ requis'})
      hasError = true
    }
    if (this.props.street === '') {
      this.setState({streetError: 'Champ requis'})
      hasError = true
    }
    if (this.props.zip === '') {
      this.setState({zipError: 'Champ requis'})
      hasError = true
    }
    if (this.props.city === '') {
      this.setState({cityError: 'Champ requis'})
      hasError = true
    }

    return !hasError
  }

  handleEstimateShipping = () => {
    if (!this.validateTextFields()) {
      return
    }

    this.props.onEstimateShipping(
      this.props.client,
      this.props.cart,
      this.props.address
    )
  }

  onUpdateStreetNumber = (event) => {
    const {street, zip, city} = this.props.address
    this.props.onUpdateAddress({streetNumber: event.target.value, street, zip, city})
    this.setState({streetNumberError: ''})
  }
  onUpdateStreet = (event) => {
    const {streetNumber, zip, city} = this.props.address
    this.props.onUpdateAddress({streetNumber, street: event.target.value, zip, city})
    this.setState({streetError: ''})
  }
  onUpdateZip = (event) => {
    const {streetNumber, street, city} = this.props.address
    this.props.onUpdateAddress({streetNumber, street, zip: event.target.value, city})
    this.setState({zipError: ''})
  }
  onUpdateCity = (event) => {
    const {streetNumber, street, zip} = this.props.address
    this.props.onUpdateAddress({streetNumber, street, zip, city: event.target.value})
    this.setState({cityError: ''})
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
            value={this.props.address.streetNumber}
            onChange={(event) => this.onUpdateStreetNumber(event)}
          />
          <TextField
            style={{fontWeight: 400}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Rue"
            errorText={this.state.streetError ? <div style={{position: 'absolute'}}>{this.state.streetError}</div> : ''}
            value={this.props.address.street}
            onChange={this.onUpdateStreet}
          /><br />
          <TextField
            style={{fontWeight: 400, marginRight: 50}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Code postal"
            errorText={this.state.zipError ? <div style={{position: 'absolute'}}>{this.state.zipError}</div> : ''}
            value={this.props.address.zip}
            onChange={this.onUpdateZip}
          />
          <TextField
            style={{fontWeight: 400}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Ville"
            errorText={this.state.cityError ? <div style={{position: 'absolute'}}>{this.state.cityError}</div> : ''}
            value={this.props.address.city}
            onChange={this.onUpdateCity}
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

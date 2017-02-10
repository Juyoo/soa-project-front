import React from 'react'
import CartRecap from './CartSteps/CartRecap'
import ShippingRecap from './CartSteps/ShippingRecap'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Step, Stepper, StepLabel} from 'material-ui/Stepper'

class PaymentStepper extends React.Component {
  static propTypes = {
    onResetShipping: React.PropTypes.func.isRequired,
    onEstimateShipping: React.PropTypes.func.isRequired,
    cart: React.PropTypes.array.isRequired,
    client: React.PropTypes.shape({
      login: React.PropTypes.string.isRequired,
      password: React.PropTypes.string.isRequired,
      firstName: React.PropTypes.string.isRequired,
      lastName: React.PropTypes.string.isRequired,
      paymentServiceId: React.PropTypes.number.isRequired,
      paymentServiceToken: React.PropTypes.string.isRequired,
      providerServiceId: React.PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state
    if (!this.currentStep.validate()) {
      return;
    }

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    })
  }

  handlePrev = () => {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <CartRecap
          ref={(cartRecap) => {this.currentStep = cartRecap}}
          cart={this.props.cart}
          onGoToPayment={this.props.onGoToPayment} />
      case 1:
        return <ShippingRecap
          ref={(shippingRecap) => {this.currentStep = shippingRecap}}
          client={this.props.client}
          cart={this.props.cart}
          estimatedShippingPrice={this.props.shipping.estimatedShippingPrice}
          onResetShipping={this.props.onResetShipping}
          onEstimateShipping={this.props.onEstimateShipping} />
      case 2:
        return <p>'This is the bit I really care about!'</p>
      default:
        return <p>'Commande validée, afficher la facture ici'</p>
    }
  }

  render = () => {
    const {finished, stepIndex} = this.state

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step><StepLabel>Panier</StepLabel></Step>
          <Step><StepLabel>Livraison</StepLabel></Step>
          <Step><StepLabel>Payement</StepLabel></Step>
        </Stepper>
        <div style={{margin: '0 16px'}}>
          <div>
            {this.getStepContent(stepIndex)}
            <div style={{marginTop: 12}}>
              <FlatButton
                label="Précédent"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label={stepIndex === 2 ? 'Terminer' : 'Suivant'}
                primary={true}
                onTouchTap={this.handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PaymentStepper

import React from 'react'
import { clientPropTypes, cartPropTypes, addressPropTypes } from '../../../proptypes'
import FetchingIndicator from '../../../components/FetchingIndicator'
import CartRecap from './CartSteps/CartRecap'
import ShippingRecap from './CartSteps/ShippingRecap'
import PaymentRecap from './CartSteps/PaymentRecap'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'

class PaymentStepper extends React.Component {
  static propTypes = {
    onResetShipping: React.PropTypes.func.isRequired,
    onEstimateShipping: React.PropTypes.func.isRequired,
    onValidateOrder: React.PropTypes.func.isRequired,
    onUpdateAddress: React.PropTypes.func.isRequired,
    isFetchingEstimate: React.PropTypes.bool.isRequired,
    estimatedShippingPrice: React.PropTypes.number,
    cart: cartPropTypes.isRequired,
    client: clientPropTypes.isRequired,
    address: addressPropTypes.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0
    }
  }

  handleNext = () => {
    const { stepIndex } = this.state
    if (!this.currentStep.validate()) {
      return
    }

    const isFinished = stepIndex >= 2
    this.setState({
      stepIndex: stepIndex + 1,
      finished: isFinished
    })
    if (isFinished) {
      const { client, cart, address } = this.props
      this.props.onValidateOrder(client, cart, address)
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <CartRecap
          ref={(cartRecap) => { this.currentStep = cartRecap }}
          cart={this.props.cart} />
      case 1:
        return <ShippingRecap
          ref={(shippingRecap) => { this.currentStep = shippingRecap }}
          client={this.props.client}
          cart={this.props.cart}
          estimatedShippingPrice={this.props.estimatedShippingPrice}
          onResetShipping={this.props.onResetShipping}
          onEstimateShipping={this.props.onEstimateShipping}
          onUpdateAddress={this.props.onUpdateAddress}
          isFetchingEstimate={this.props.isFetchingEstimate}
          address={this.props.address} />
      case 2:
        return <PaymentRecap
          ref={(paymentRecap) => { this.currentStep = paymentRecap }}
          client={this.props.client}
          cart={this.props.cart}
          estimatedShippingPrice={this.props.estimatedShippingPrice}
          />
      default:
        return <FetchingIndicator />
    }
  }

  render = () => {
    const { finished, stepIndex } = this.state

    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
          <Step><StepLabel>Panier</StepLabel></Step>
          <Step><StepLabel>Livraison</StepLabel></Step>
          <Step><StepLabel>Payement</StepLabel></Step>
        </Stepper>
        <div style={{ margin: '0 16px' }}>
          <div>
            {this.getStepContent(stepIndex)}
            {!finished &&
              <div style={{ marginTop: 12 }}>
                <FlatButton
                  label='Précédent'
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Terminer' : 'Suivant'}
                  primary
                  onTouchTap={this.handleNext}
                />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default PaymentStepper

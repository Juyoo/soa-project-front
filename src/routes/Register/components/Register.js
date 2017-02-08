import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login:'',
      password: '',
      firstName: '',
      lastName: ''
    }
  }
  onLoginChange = (event) => {
    this.setState({
      login: event.target.value,
      loginError: ''
    })
  }
  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value,
      passwordError: ''
    })
  }
  onFirstNameChange = (event) => {
    this.setState({
      firstName: event.target.value,
      firstNameError: ''
    })
  }
  onLastNameChange = (event) => {
    this.setState({
      lastName: event.target.value,
      lastNameError: ''
    })
  }
  handleSend = () => {
    let hasError = false
    if (this.state.login === '') {
      this.setState({loginError: 'Champ requis'})
      hasError = true
    }
    if (this.state.password === '') {
      this.setState({passwordError: 'Champ requis'})
      hasError = true
    }
    if (this.state.firstName === '') {
      this.setState({firstNameError: 'Champ requis'})
      hasError = true
    }
    if (this.state.lastName === '') {
      this.setState({lastNameError: 'Champ requis'})
      hasError = true
    }
    if (hasError) {
      return
    }
    this.props.onRegister(this.state)
  }

  render = () => (
    <div className="row">
      <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6">
        <h1>Créer un compte</h1>
        <Paper className="text-center">
          <TextField
            style={{fontWeight: 400}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Login"
            errorText={this.state.loginError ? <div className="text-left">{this.state.loginError}</div> : ''}
            value={this.state.login}
            onChange={this.onLoginChange}
          /><br />
          <TextField
            style={{fontWeight: 400}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Mot de passe"
            type="password"
            errorText={this.state.passwordError ? <div className="text-left">{this.state.passwordError}</div> : ''}
            value={this.state.password}
            onChange={this.onPasswordChange}
          /><br />
          <TextField
            style={{fontWeight: 400}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Nom"
            errorText={this.state.firstNameError ? <div className="text-left">{this.state.firstNameError}</div> : ''}
            value={this.state.firstName}
            onChange={this.onFirstNameChange}
          /><br />
          <TextField
            style={{fontWeight: 400}}
            floatingLabelStyle={{fontWeight: 400}}
            floatingLabelText="Prénom"
            errorText={this.state.lastNameError ? <div className="text-left">{this.state.lastNameError}</div> : ''}
            value={this.state.lastName}
            onChange={this.onLastNameChange}
          />
        </Paper>
        <RaisedButton
          className="pull-right"
          style={{marginTop: 5}}
          label={'Valider'}
          primary={true}
          onTouchTap={this.handleSend}
        />
      </div>
    </div>
  )
}

export default Register

import React from 'react'
import { IndexLink, Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import './Header.scss'

class Header extends React.Component {
  static propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired,
    onLogin: React.PropTypes.func.isRequired,
    onLogout: React.PropTypes.func.isRequired,
    client: React.PropTypes.shape({
      firstName: React.PropTypes.string.isRequired,
      lastName: React.PropTypes.string.isRequired
    })
  }

  constructor (props) {
    super(props)
    this.state = { drawerOpen: false }
  }

  handleClose = () => this.setState({ drawerOpen: false })

  render = () => (
    <div>
      <AppBar
        className='text-left'
        title={
          <span>
            {this.props.isLoggedIn
              ? this.props.client.firstName + ' ' + this.props.client.lastName
              : ''
            }
          </span>
        }
        iconElementRight={
          this.props.isLoggedIn
            ? <FlatButton label='Déconnexion' onTouchTap={this.props.onLogout} />
            : <FlatButton label='Connexion' onTouchTap={this.props.onLogin} />
        }
        onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: true })} />
      <Drawer
        className='routes'
        docked={false}
        width={300}
        open={this.state.drawerOpen}
        onRequestChange={(open) => this.setState({ drawerOpen: open })}
      >
        {this.props.client
          ? <div>
            <IndexLink to='/' activeClassName='route--active'>
              <MenuItem onTouchTap={this.handleClose}>Acceuil</MenuItem>
            </IndexLink>
            <Link to='/products' activeClassName='route--active'>
              <MenuItem onTouchTap={this.handleClose}>Produits</MenuItem>
            </Link>
          </div>
          : <div>
            <Link to='/register' activeClassName='route--active'>
              <MenuItem onTouchTap={this.handleClose}>Connexion</MenuItem>
            </Link>
          </div>
        }
      </Drawer>
    </div>
  )
}

export default Header

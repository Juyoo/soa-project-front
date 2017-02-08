import React from 'react'
import { IndexLink, Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import './Header.scss'

export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {drawerOpen: false}
  }


  handleClose = () => this.setState({drawerOpen: false})

  render = () => (
    <div>
      <AppBar
        className="text-left"
        title={<span>Choisir un nom</span>}
        iconElementRight={<FlatButton label="Connexion" />}
        onLeftIconButtonTouchTap={() => this.setState({drawerOpen: true})} />
      <Drawer
        className='routes'
        docked={false}
        width={300}
        open={this.state.drawerOpen}
        onRequestChange={(open) => this.setState({drawerOpen: open})}
      >

      <IndexLink to='/' activeClassName='route--active'>
        <MenuItem onTouchTap={this.handleClose}>Acceuil</MenuItem>
      </IndexLink>
      <Link to='/products' activeClassName='route--active'>
        <MenuItem onTouchTap={this.handleClose}>Produits</MenuItem>
      </Link>
      </Drawer>
    </div>
  )
}

export default Header

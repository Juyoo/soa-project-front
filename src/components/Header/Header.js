import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/dashboard' activeClassName='route--active'>
      Dashboard
    </Link>
    {' · '}
    <Link to='/products' activeClassName='route--active'>
      Products
    </Link>
  </div>
)

export default Header

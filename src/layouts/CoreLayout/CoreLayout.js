import React from 'react'
import Header from '../../containers/HeaderContainer'
import './CoreLayout.scss'
import '../../styles/core.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <div>
      <Header />
      <div className='container-fluid core-layout__viewport'>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout

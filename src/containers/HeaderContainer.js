import { connect } from 'react-redux'
import Header from '../components/Header'
import {browserHistory} from 'react-router'
import {logout} from '../routes/Register/modules/register'


const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: () => browserHistory.push('/register'),
    onLogout: () => dispatch(logout())
  }
}

const mapStateToProps = (state) => ({
  client: state.client
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

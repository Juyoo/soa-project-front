import { connect } from 'react-redux'
import Register from '../components/Register'
import {register} from '../modules/register'



const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (client) => dispatch(register(client))
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)

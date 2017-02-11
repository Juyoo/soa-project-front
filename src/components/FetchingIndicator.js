import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

export const FetchingIndicator = (props) => (
  <div className="text-center" style={{position: 'relative'}}>
    <CircularProgress {...props} />
  </div>
)
FetchingIndicator.propTypes = {
  color: React.PropTypes.string,
  style: React.PropTypes.objectOf(React.PropTypes.any)
}

export default FetchingIndicator

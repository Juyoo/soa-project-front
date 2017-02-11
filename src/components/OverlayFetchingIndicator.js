import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    minHeight: 40,
    backgroundColor: 'rgba(200, 200, 200, 0.63)',
    zIndex: 99
  },
  progress: {
    top: '50%',
    bottom: '50%',
    top: '50%',
    transform: 'translate(0, -50%)'
  }
}

export const OverlayFetchingIndicator = (props) => {
  const {style} = props
  return (
    <div className="text-center" style={styles.container}>
      <CircularProgress {...props} style={Object.assign({}, styles.progress, style)} />
    </div>
  )
}
OverlayFetchingIndicator.propTypes = {
  color: React.PropTypes.string,
  style: React.PropTypes.objectOf(React.PropTypes.any)
}

export default OverlayFetchingIndicator

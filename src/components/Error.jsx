import React from 'react'
import PropTypes from 'prop-types'

export default function Error({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.shape({
    stack: PropTypes.string,
    name: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
}

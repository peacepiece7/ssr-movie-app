import React from 'react'
import PropTypes from 'prop-types'

export default function Spinner({ pos = '' }) {
  return (
    <div className={['w-full text-center', pos].join(' ')}>
      <div
        className="spinner spinner--active"
        role="progressbar"
        aria-label="progressbar"
        // aria-busy={active ? 'true' : 'false'}
      />
    </div>
  )
}

Spinner.defaultProps = {
  pos: '',
}

Spinner.propTypes = {
  pos: PropTypes.string,
}

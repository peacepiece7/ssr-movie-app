import React from 'react'

export default function Spinner() {
  return (
    <div
      className="spinner spinner--active"
      role="progressbar"
      aria-label="progressbar"
      // aria-busy={active ? 'true' : 'false'}
    />
  )
}

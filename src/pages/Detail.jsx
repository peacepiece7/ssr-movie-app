import React from 'react'

export default function Detail() {
  for (let i = 0; i < 10e8; i++) {
    i += 2
    i -= 2
  }
  for (let i = 0; i < 10e8; i++) {
    i += 2
    i -= 2
  }
  return <h1>Detail page!</h1>
}

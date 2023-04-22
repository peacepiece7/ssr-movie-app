import React from 'react'

export default function SlowTitle2() {
  for (let i = 0, len = 10e8; i < len; i++) {
    i += 2
    i -= 2
  }
  for (let i = 0, len = 10e8; i < len; i++) {
    i += 2
    i -= 2
  }
  return <div>Slow Title!</div>
}

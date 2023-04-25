import React from 'react'
import { json, useLoaderData } from 'react-router-dom'

const routes = [
  {
    path: '/',
    loader() {
      return json({ message: 'Welcome to React Router!' })
    },
    Component() {
      const data = useLoaderData()
      return <h1>{data.message}</h1>
    },
  },
]

export default routes

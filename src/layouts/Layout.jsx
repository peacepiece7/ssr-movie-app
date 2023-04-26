import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div
        className={`relative xl:mr-32 xl:ml-32
       lg:mr-20 lg:ml-20 md:mr-12 md:ml-12 sm:mr-4 sm:ml-4`}
      >
        {children}
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

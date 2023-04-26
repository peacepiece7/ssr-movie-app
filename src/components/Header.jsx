import React from 'react'

export default function NavBar() {
  return (
    <header
      className={`h-20 mb-12 related flex justify-between items-center 
      xl:pr-32 xl:pl-32 lg:pr-20 lg:pl-20 md:pr-12 md:pl-12 sm:pr-4 sm:pl-4 
      shadow-md hover:shadow-lg transition delay-100 ease-in`}
    >
      <div className="flex justify-start items-center">
        <a href="/">
          <img src="/logo_nbg.png" alt="logo" className="max-w-20 max-h-20" />
        </a>
        <nav>
          <a href="/" className="ml-6 mr-6 text-sm tracking-widest">
            HOME
          </a>
          <a href="/detail?id=tt10954600" className="mr-6 text-sm tracking-widest">
            DETAIL
          </a>
          <a href="/about" className="mr-6 text-sm tracking-widest">
            ABOUT
          </a>
        </nav>
      </div>
      <div className="mr-24">profile image</div>
    </header>
  )
}

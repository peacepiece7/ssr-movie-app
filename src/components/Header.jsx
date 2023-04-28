import React from 'react'

export default function NavBar() {
  return (
    <header
      className={`h-20 mb-12 related flex justify-between items-center 
      xl:pr-28 xl:pl-28 lg:pr-14 lg:pl-14 md:pr-8 md:pl-8 sm:pr-4 sm:pl-4 
      shadow-md hover:shadow-lg transition delay-100 ease-in`}
    >
      <div className="flex justify-start items-center">
        <a href="/">
          <img src="/logo_nbg.png" alt="logo" className="max-w-20 max-h-20" />
        </a>
        <nav>
          <a href="/" className="ml-3 mr-3 md:ml-6 md:mr-6 text-sm tracking-widest">
            HOME
          </a>
          <a href="/detail?id=tt10954600" className="mr-3 md:mr-6 text-sm tracking-widest">
            DETAIL
          </a>
          <a href="/about" className="mr-3 md:mr-6 text-sm tracking-widest">
            ABOUT
          </a>
        </nav>
      </div>
      <div className="mr-6 md:block hidden">
        <img
          src="https://avatars.githubusercontent.com/u/73880776?s=400&u=1ce40dd704a71a9f5ce3f80cbf19092032f2df14&v=4"
          alt="writer profile"
          className="w-[30px] h-[30px] rounded-[15px]"
        />
      </div>
    </header>
  )
}

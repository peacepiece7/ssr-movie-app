import React from 'react'

import Layout from '../layouts/Layout'

export default function About() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center ">
        <div className="mt-16 mb-10">
          <img
            src="https://avatars.githubusercontent.com/u/73880776?s=400&u=1ce40dd704a71a9f5ce3f80cbf19092032f2df14&v=4"
            alt="writer profile"
            className="w-[150px] h-[150px] rounded-[75px] border-[1px] border-[rgba(255,255,255,0.1)]"
          />
        </div>
        <h1 className="text-4xl text-c-tt tracking-widest mb-24">PEACEPIECE</h1>
        <div>
          <div className="mb-4">
            <p>scv7282@gmail.com</p>
          </div>
          <div className="mb-4">
            <p>+82-10-1234-5678</p>
          </div>
          <div className="mb-4">
            <a
              href="https://github.com/KDT1-FE/KDT5-M2/tree/KDT5_JeongTaeUk_6"
              target="_blank"
              rel="noopener noreferrer"
            >
              {'challenge repo =>'}
            </a>
          </div>
          <div className="mb-4">
            <a href="https://github.com/peacepiece7" target="_blank" rel="noopener noreferrer">
              {'github repo =>'}
            </a>
          </div>
        </div>
      </main>
    </Layout>
  )
}

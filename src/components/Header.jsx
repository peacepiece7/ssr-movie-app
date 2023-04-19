import React from 'react'
// import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      {
        '헤더 내용 없음!'
        // ! React18 Suspense SSR테스트 전 반드시 확인 !
        // reloadDocument 속성의 default는 false라서 클라이언트에서 리랜더링됩니다.
        // Suspense SSR테스트시 아래 a태그 주석을 풀어서 확인하거나
        // 주소창에 직접 url을 입력하세요
        /*
          <a href='/'>Home</a>
          <a href='/detail'>Detail</a>
          <a href='/about'>About</a>
         */
      }
      {/* <Link to='/'>Home</Link>
      <Link to='/detail'>Detail</Link>
      <Link to='/about'>About</Link> */}
      {/* 
      SSR테스트할때 사용할 것
 */}
    </header>
  )
}

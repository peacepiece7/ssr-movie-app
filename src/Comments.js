/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * 서버와 통신하는 컴포넌트는 간단해야합니다.
 * 서버와 통신하는 로직 외 DOM과의 상호 작용은 하위 컴포넌트에 작성해야 합니다!
 */

import { useMoviesData } from './context/data'
import htmlEntitiesDecoder from 'html-entities-decoder'
import Test from './Test'

export default function Comments() {
  const movies = JSON.parse(htmlEntitiesDecoder(useMoviesData()))
  const handleOnClick = (e) => {
    console.log(e.target.value)
  }
  return (
    <>
      {movies.map((movie, i) => (
        <p className='comment' key={i}>
          {movie.Title}
        </p>
      ))}
      <Test comments={comments}></Test>
    </>
  )
}

import React from 'react'

export default function Test({ comments }) {
  const handleOnClickComment = (e) => console.log(e.target.textContent)
  return (
    <div>
      {comments.map((comment) => {
        return (
          <span key={comment.Title} onClick={handleOnClickComment}>
            {comment.Title}
          </span>
        )
      })}
    </div>
  )
}

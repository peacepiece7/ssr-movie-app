import { useEffect, useState } from 'react'

export default function useScollDown() {
  const [isBottom, setIsBottom] = useState(false)

  function getScrollY() {
    // * HTML height에서 viewport 높이를 뺀 값이입니다.
    const HTMLHeight = document.querySelector('html').scrollHeight - document.querySelector('html').clientHeight
    if (HTMLHeight - window.scrollY < 20) {
      setIsBottom(true)
    } else {
      setIsBottom(false)
    }
  }

  useEffect(() => {
    const html = document.querySelector('html')
    if (html && window) {
      document.addEventListener('scroll', getScrollY)
    }
    return () => document.removeEventListener('scroll', getScrollY)
  }, [])
  return [isBottom]
}

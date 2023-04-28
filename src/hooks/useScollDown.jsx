import { useEffect, useState } from 'react'

export default function useScollDown() {
  const [isBottom, setIsBottom] = useState(false)

  function getScrollY() {
    const buttonPos = document.querySelector('html').scrollHeight - document.querySelector('html').clientHeight
    if (buttonPos - window.scrollY < 20) {
      setIsBottom(true)
    } else {
      setIsBottom(false)
    }
  }

  useEffect(() => {
    const top = document.querySelector('html')
    if (top && window) {
      document.addEventListener('scroll', getScrollY)
    }
    return () => document.removeEventListener('scroll', getScrollY)
  }, [])
  return [isBottom]
}

import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useAnimatedCounter(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * (end - start) + start))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, end, duration, start])

  return { count, ref }
}

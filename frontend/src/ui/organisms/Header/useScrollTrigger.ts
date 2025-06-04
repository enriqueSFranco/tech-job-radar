import { useEffect, useRef, useState } from "react";

export function useScrollTrigger(threshold = 50) {
  const [triggered, setTriggered] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY > threshold
      setTriggered(prev => prev !== scrolled ? scrolled : prev)
      ticking.current = false
    }
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update)
        ticking.current = true
      }
    }
    window.addEventListener("scroll", onScroll, {passive: true})
    return () => window.addEventListener("scroll", onScroll)
  }, [threshold])

  return triggered
}

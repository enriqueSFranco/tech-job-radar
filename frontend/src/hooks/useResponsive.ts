import { useEffect, useState } from "react";

type Breakpoint = 'mobile' | 'mobileLarge' | 'tablet' | 'tabletLarge' | 'desktop' | 'desktopLarge';
type Orientation = 'portrait' | 'landscape';

const getBreakpoint = (width: number) => {
  const breakpoints: [Breakpoint, number][] = [
    ["mobile", 0],
    ["mobileLarge", 480],
    ["tablet", 768],
    ["tabletLarge", 992],
    ["desktop", 1200],
    ["desktopLarge", 1440]
  ]
  const match = [...breakpoints].reverse().find(([_, value]) => width >= value)
  return match ? match[0] : "mobile"
}

const getState = () => {
  const width = window.innerWidth
  const orientation: Orientation = window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape'
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const breakpoint = getBreakpoint(width)
  return { breakpoint, orientation, isTouchDevice }
}

export function useResponsive() {
  const [state, setState] = useState(getState)

  useEffect(() => {
    const handleChange = () => {
      const newState = getState()
      if (JSON.stringify(newState) !== JSON.stringify(state))
        setState(newState)
    }
    const mediaQueries = [
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
      window.matchMedia('(min-width: 1024px)'),
      window.matchMedia('(orientation: portrait)'),
    ];

    mediaQueries.forEach(mq => mq.addEventListener('change', handleChange));
    window.addEventListener('resize', handleChange)
    return () => {
      mediaQueries.forEach(mq => mq.removeEventListener('change', handleChange));
      window.removeEventListener('resize', handleChange)
    }
  }, [state])

  const isBreakpoint = (target: Breakpoint | Breakpoint[]) => {
    return Array.isArray(target)
      ? target.includes(state.breakpoint)
      : state.breakpoint === target;
  };

  return {
    ...state,
    isBreakpoint
  }
}

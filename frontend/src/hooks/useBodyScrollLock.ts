import { useEffect } from "react";

export function useBodyScrollLock(shouldLock: boolean) {
  useEffect(() => {
    const originalStyle = document.body.style.overflow

    if (shouldLock) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalStyle
    }

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [shouldLock])
}

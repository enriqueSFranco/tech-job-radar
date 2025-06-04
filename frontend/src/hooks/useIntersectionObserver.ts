import { useEffect, useState } from "react";

type Options = {
  ref: React.RefObject<HTMLElement>;
  threshold?: number;
  rootMargin?: string;
};

export function useIntersectionObserver({ ref, threshold = 0, rootMargin = "0px" }: Options) {
  const [isOutOfView, updateIsOutOfView] = useState(false);

  useEffect(() => {
    const node = ref.current
    if (!node) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(([entry]) => {
      updateIsOutOfView(!entry.isIntersecting);
    }, options);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { isOutOfView };
}

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

type NavLink = {
  path: string
  label: string
}

type SlidingNavProps = {
  links: NavLink[],
  className?: string,
  indicatorClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export function SlidingNav({
  links,
  className,
  indicatorClassName,
  activeClassName,
  inactiveClassName
}: SlidingNavProps) {
  const { pathname } = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number, width: number } | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const containerRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const updateIndicator = (path: string | null) => {
    if (!path) {
      setIndicatorStyle(null);
      return;
    }
    const el = linkRefs.current[path];
    const container = containerRef.current;
    if (el && container) {
      const linkRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      });
    }
  };

  useEffect(() => {
    updateIndicator(hoveredPath ?? pathname);
  }, [hoveredPath, pathname]);

  return (
    <div className={`relative w-full h-9 ${className}`}>
      {indicatorStyle && (
        <div
          className={`absolute top-0 bottom-0 bg-white/15 rounded-md pointer-events-none transition-transform duration-300 ease-in-out ${indicatorClassName}`}
          style={{
            width: indicatorStyle.width,
            left: 0,
            transform: `translateX(${indicatorStyle.left}px)`,
          }}
        />
      )}
      <ul ref={containerRef} className="flex items-center gap-7 h-full">
        {links.map(({ path, label }) => (
          <li key={`rightHeaderId-${path}`} className="h-full relative grid place-content-center">
            <Link
              to={path}
              ref={el => (linkRefs.current[path] = el)}
              onMouseEnter={() => setHoveredPath(path)}
              onMouseLeave={() => setHoveredPath(null)}
              className={`relative z-10 font-medium text-sm transition-colors duration-200 px-3 rounded-md ${
                pathname === path
                  ? `bg-white/15 h-9 grid place-content-center ${activeClassName}`
                  : `bg-transparent h-9 grid place-content-center ${inactiveClassName}`
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

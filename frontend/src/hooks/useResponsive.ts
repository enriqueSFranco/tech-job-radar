import { useState } from "react";

type Breakpoint = 'mobile' | 'tablet' | 'desktop';
type Orientation = 'portrait' | 'landscape';
// const breakpoints = {
//   mobile: 0,
//   table: 769,
//   desktop: 1024
// }

const getBreakpoint = (width: number) => {
  const breakpoints: [Breakpoint, number][] = [
    ["mobile", 0],
    ["tablet", 769],
    ["desktop", 1024]
  ]
  return breakpoints.find(([_, value]) => width < value )![0]
}

export function useResponsive() {
  const [state, setState] = useState(() => {

  })
}


/*
¡Perfecto! Te voy a dejar 2 versiones listas para copiar y usar. Tú eliges la que más te guste según tu estilo. Ambas usan lógica limpia, sin `if`, sin ternarias, y son súper fáciles de mantener.

---

## ✅ Opción 1: **Estilo declarativo con `isBreakpoint()`**

Este hook te da:
- `breakpoint` (el nombre actual)
- `orientation` (portrait / landscape)
- `isTouchDevice` (boolean)
- `isBreakpoint('mobile')` o `isBreakpoint(['mobile', 'tablet'])`

### `useResponsive.ts`

```ts
import { useEffect, useState } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';
type Orientation = 'portrait' | 'landscape';

interface ResponsiveState {
  breakpoint: Breakpoint;
  orientation: Orientation;
  isTouchDevice: boolean;
  isBreakpoint: (target: Breakpoint | Breakpoint[]) => boolean;
}

const getBreakpoint = (width: number): Breakpoint => {
  const breakpoints: [Breakpoint, number][] = [
    ['mobile', 768],
    ['tablet', 1024],
    ['desktop', Infinity],
  ];

  return breakpoints.find(([, max]) => width < max)![0];
};

export const useResponsive = (): ResponsiveState => {
  const getState = () => {
    const width = window.innerWidth;
    const orientation = window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const breakpoint = getBreakpoint(width);

    return { breakpoint, orientation, isTouchDevice };
  };

  const [state, setState] = useState(() => getState());

  useEffect(() => {
    const handleChange = () => {
      const newState = getState();
      if (JSON.stringify(newState) !== JSON.stringify(state)) {
        setState(newState);
      }
    };

    const mediaQueries = [
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
      window.matchMedia('(min-width: 1024px)'),
      window.matchMedia('(orientation: portrait)'),
    ];

    mediaQueries.forEach(mq => mq.addEventListener('change', handleChange));
    window.addEventListener('resize', handleChange);

    return () => {
      mediaQueries.forEach(mq => mq.removeEventListener('change', handleChange));
      window.removeEventListener('resize', handleChange);
    };
  }, [state]);

  const isBreakpoint = (target: Breakpoint | Breakpoint[]) => {
    return Array.isArray(target)
      ? target.includes(state.breakpoint)
      : state.breakpoint === target;
  };

  return {
    ...state,
    isBreakpoint,
  };
};
```

---

### 🧪 Cómo usarlo

```tsx
const { breakpoint, orientation, isTouchDevice, isBreakpoint } = useResponsive();

if (isBreakpoint('mobile')) {
  // comportamiento móvil
}

if (isBreakpoint(['mobile', 'tablet'])) {
  // diseño compacto
}
```

---

## ✅ Opción 2: **Estilo clásico con flags (`isMobile`, `isTablet`, `isDesktop`)**

Si prefieres que el hook te dé directamente los booleanos:

```ts
const useResponsive = () => {
  const { breakpoint, ...rest } = useResponsiveInternal();

  return {
    ...rest,
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  };
};
```

Puedes combinarlas si quieres ambas interfaces (booleans + `isBreakpoint()`).

---

### ¿Qué sigue?

- ¿Te armo también un contexto global con esto (`ResponsiveProvider`)?
- ¿Te lo dejo como un paquete npm privado/listo para tu proyecto?
- ¿O te gustaría una versión que también soporte SSR (Next.js o Remix)?

Tú dime cómo te gustaría integrarlo 👇
*/

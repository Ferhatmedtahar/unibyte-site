"use client";
import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,

        wheelMultiplier: 1.1,
        touchMultiplier: 1.7,

        syncTouch: true,
        syncTouchLerp: 0.1,

        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
// "use client";

// import { ReactLenis } from "lenis/react";
// import { ReactNode } from "react";

// export default function SmoothScrolling({ children }: { children: ReactNode }) {
//   return (
//     <ReactLenis
//       root
//       options={{
//         lerp: 0.1,
//         duration: 1.1,
//         smoothWheel: true,

//         wheelMultiplier: 1,
//         touchMultiplier: 2,
//         infinite: false,
//         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       }}
//     >
//       {children}
//     </ReactLenis>
//   );
// }

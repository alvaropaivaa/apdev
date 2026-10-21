import { useRef } from "react";
import { ScrollTrigger, gsap, useGSAP } from "../lib/gsap";

/** Linha verde no topo que enche conforme a página é rolada. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const setScale = gsap.quickSetter(ref.current, "scaleX");
    ScrollTrigger.create({
      start: 0,
      end: "max",
      refreshPriority: -1,
      onUpdate: (self) => setScale(self.progress),
    });
  });

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}

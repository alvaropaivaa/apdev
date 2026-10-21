import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/gsap";

type Props = { className?: string; src: string; poster?: string };

/** Vídeo decorativo mudo em loop que só toca enquanto está perto da área visível. */
export function AutoplayVideo({ className, src, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion()) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type="video/webm" />
    </video>
  );
}

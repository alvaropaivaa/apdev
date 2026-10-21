import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { MOTION_OK, gsap, useGSAP } from "../lib/gsap";

type Box = { x: number; y: number; w: number; h: number; z: number };

/** Uma camada da cena, posicionada no plano (x, y) e elevada em z. */
function Layer({ x, y, w, h, z, className = "", style, children }: Box & { className?: string; style?: CSSProperties; children?: ReactNode }) {
  const vars = { "--x": `${x}px`, "--y": `${y}px`, "--z": `${z}px`, width: w, height: h, ...style } as CSSProperties;
  return (
    <div className={`v3d-layer ${className}`} style={vars}>
      {children}
    </div>
  );
}

/**
 * Cena 3D em CSS: as camadas "caem" no lugar quando o card aparece e depois a cena
 * flutua sozinha. Não segue o mouse. Fora da tela as animações ficam pausadas.
 */
function Scene({ kind, children }: { kind: "site" | "system" | "ai"; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => el.classList.toggle("is-paused", !entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".v3d-layer",
          { "--lift": "150px", opacity: 0 },
          {
            "--lift": "0px",
            opacity: 1,
            duration: 1.1,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 92%", toggleActions: "play none none reverse" },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`v3d v3d--${kind}`} aria-hidden="true">
      <div className="v3d-floor" />
      <div className="v3d-rig">{children}</div>
    </div>
  );
}

const Lines = ({ widths, className = "v3d-line" }: { widths: number[]; className?: string }) => (
  <>
    {widths.map((width, i) => (
      <span key={i} className={className} style={{ width: `${width}%` }} />
    ))}
  </>
);

/** Notebook em pé: a página "salta" da tela em camadas na direção de quem vê. */
export function SiteVisual() {
  return (
    <Scene kind="site">
      <Layer x={0} y={140} w={210} h={112} z={0} className="v3d-deck">
        <span className="v3d-keys">
          {Array.from({ length: 36 }, (_, i) => (
            <i key={i} />
          ))}
        </span>
        <span className="v3d-trackpad" />
      </Layer>
      <Layer x={0} y={0} w={210} h={140} z={0} className="v3d-glass v3d-window">
        <span className="v3d-window-bar">
          <i />
          <i />
          <i />
          <b />
        </span>
      </Layer>
      {[16, 78, 140].map((x) => (
        <Layer key={x} x={x} y={98} w={54} h={30} z={14} className="v3d-glass" />
      ))}
      <Layer x={16} y={28} w={112} h={40} z={28} className="v3d-plain">
        <Lines widths={[100, 72]} className="v3d-line v3d-line--title" />
        <Lines widths={[90, 64]} />
      </Layer>
      <Layer x={138} y={28} w={58} h={58} z={38} className="v3d-glass v3d-image">
        <span className="v3d-sun" />
        <span className="v3d-mountain" />
      </Layer>
      <Layer x={16} y={74} w={64} h={18} z={50} className="v3d-solid v3d-pulse" />
      <Layer x={92} y={80} w={20} h={24} z={80} className="v3d-cursor">
        <svg viewBox="0 0 20 24">
          <path d="M2 1 L2 20 L7 15 L11 23 L14.5 21.5 L10.5 13.5 L17 13.5 Z" />
        </svg>
      </Layer>
    </Scene>
  );
}

/** Painel de sistema: indicadores elevados, colunas em pé e linha holográfica. */
export function SystemVisual() {
  const bars = [34, 52, 28, 66, 46, 82];
  return (
    <Scene kind="system">
      <Layer x={0} y={0} w={210} h={150} z={0} className="v3d-glass v3d-board">
        <span className="v3d-sidebar">
          <i />
          <i />
          <i />
          <i />
        </span>
      </Layer>
      {[44, 100, 156].map((x, i) => (
        <Layer key={x} x={x} y={12} w={48} h={26} z={22 + i * 6} className="v3d-glass v3d-kpi">
          <Lines widths={[50, 80 - i * 12]} />
        </Layer>
      ))}
      {bars.map((height, i) => (
        <Layer
          key={i}
          x={52 + i * 24}
          y={138}
          w={14}
          h={height}
          z={0}
          className="v3d-col"
          style={{ "--d": `${i * 0.18}s` } as CSSProperties}
        >
          <span className="v3d-col-fill" />
        </Layer>
      ))}
      {/* Tela holográfica em pé no meio do painel: a linha sempre "sobe". */}
      <Layer x={44} y={64} w={160} h={74} z={0} className="v3d-holo">
        <svg viewBox="0 0 160 70" preserveAspectRatio="none">
          <polyline points="4,60 30,46 54,52 80,28 104,36 130,12 156,18" />
        </svg>
      </Layer>
    </Scene>
  );
}

/** Esfera de IA com anéis orbitais 3D, faíscas e balões de chat. */
export function AiVisual() {
  const sparkles = [
    { x: 14, y: 70, z: 50, d: 0 },
    { x: 196, y: 120, z: 80, d: 0.8 },
    { x: 40, y: 150, z: 30, d: 1.5 },
    { x: 180, y: 46, z: 40, d: 0.4 },
  ];
  return (
    <Scene kind="ai">
      <Layer x={60} y={64} w={100} h={100} z={0} className="v3d-sphere" />
      <Layer x={10} y={14} w={200} h={200} z={0} className="v3d-ring" style={{ "--tilt": "-16deg" } as CSSProperties}>
        <span className="v3d-ring-spin">
          <i />
        </span>
      </Layer>
      <Layer x={25} y={29} w={170} h={170} z={0} className="v3d-ring v3d-ring--b" style={{ "--tilt": "28deg" } as CSSProperties}>
        <span className="v3d-ring-spin">
          <i />
        </span>
      </Layer>
      <Layer x={96} y={96} w={28} h={36} z={60} className="v3d-core">
        <svg viewBox="-10 -12 20 24">
          <path d="M0 -12 C1.2 -3.5 3.5 -1.2 10 0 C3.5 1.2 1.2 3.5 0 12 C-1.2 3.5 -3.5 1.2 -10 0 C-3.5 -1.2 -1.2 -3.5 0 -12 Z" />
        </svg>
      </Layer>
      <Layer x={-6} y={22} w={80} h={30} z={70} className="v3d-glass v3d-bubble">
        <Lines widths={[80, 52]} />
      </Layer>
      <Layer x={150} y={34} w={70} h={30} z={54} className="v3d-glass v3d-bubble v3d-typing">
        <i />
        <i />
        <i />
      </Layer>
      {sparkles.map(({ x, y, z, d }) => (
        <Layer key={`${x}-${y}`} x={x} y={y} w={14} h={14} z={z} className="v3d-sparkle" style={{ "--d": `${d}s` } as CSSProperties}>
          <svg viewBox="-10 -10 20 20">
            <path d="M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10 Z" />
          </svg>
        </Layer>
      ))}
    </Scene>
  );
}

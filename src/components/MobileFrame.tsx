import { useEffect, useRef } from "react";
import { site } from "../config/site";

/**
 * No computador o site aparece só na versão de celular: ele mesmo é carregado num
 * iframe com largura de celular, então todo o layout mobile vale sem mudar nada.
 */
export function MobileFrame() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-mobile-frame");

    // A roda do mouse fora da coluna também rola o site.
    const onWheel = (event: WheelEvent) => {
      // Construtor da janela do iframe: o Lenis de lá só reconhece eventos criados nela.
      const win = frameRef.current?.contentWindow as (Window & typeof globalThis) | null | undefined;
      if (!win) return;
      event.preventDefault();
      if (win.document.documentElement.classList.contains("lenis")) {
        win.document.dispatchEvent(
          new win.WheelEvent("wheel", {
            deltaX: event.deltaX,
            deltaY: event.deltaY,
            deltaMode: event.deltaMode,
            bubbles: true,
            cancelable: true,
          }),
        );
      } else {
        win.scrollBy({ top: event.deltaY });
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      root.classList.remove("is-mobile-frame");
    };
  }, []);

  return (
    <div className="mobile-frame">
      <img className="mobile-frame-logo" src={site.images.logoFloating} alt={site.name} width={409} height={200} />
      <iframe
        ref={frameRef}
        className="mobile-frame-screen"
        src={location.pathname + location.search + location.hash}
        title={site.title}
        // Teclado (setas, espaço) já funciona dentro do site.
        onLoad={() => frameRef.current?.focus()}
      />
    </div>
  );
}

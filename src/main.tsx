import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { MobileFrame } from "./components/MobileFrame";
import { LanguageProvider } from "./i18n/LanguageProvider";
import "./styles/index.css";

// A página sempre começa do topo: sem isto o navegador tenta restaurar o scroll
// antigo antes das animações calcularem as posições, e o pin da timeline "pula".
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

/** Computador (mouse e tela larga): mostra o site só na versão de celular. */
const DESKTOP = "(hover: hover) and (pointer: fine) and (min-width: 700px)";
const insideFrame = window.self !== window.top;
const desktop = window.matchMedia(DESKTOP);
const showFrame = !insideFrame && desktop.matches;

// Se a janela mudar de tipo (ex.: redimensionada para largura de celular), recarrega no modo certo.
if (!insideFrame) desktop.addEventListener("change", () => location.reload());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {showFrame ? (
      <MobileFrame />
    ) : (
      <LanguageProvider>
        <App />
      </LanguageProvider>
    )}
  </StrictMode>,
);

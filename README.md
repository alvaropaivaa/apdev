# APDEV — Sites, Sistemas e IA

Landing page da APDEV em React + Vite + TypeScript, com animações em GSAP (ScrollTrigger), smooth scroll com Lenis e uma nota de dinheiro em WebGL.

O site é pensado para celular: no computador ele aparece numa coluna com largura de celular no centro da tela (`src/components/MobileFrame.tsx`).

## Rodar

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # checa os tipos e gera a pasta dist/ para publicar
npm run preview   # serve o build localmente
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Nome, WhatsApp, Instagram, URL, números, logos de clientes, projetos | `src/config/site.ts` |
| Todos os textos (PT e EN), incluindo termos e políticas | `src/i18n/content.ts` |
| Imagens, vídeos, fonte e ícones | `public/` |
| Estilos de cada seção | `src/styles/*.css` |

O título e as meta tags do `index.html` são preenchidos a partir de `src/config/site.ts` no build.

## Antes de publicar

- Troque a `url` em `src/config/site.ts` pelo domínio final (usada no `canonical` e nas prévias de compartilhamento).

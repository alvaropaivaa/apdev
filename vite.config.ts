import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { site } from "./src/config/site.ts";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Preenche título e meta tags do index.html com os dados de src/config/site.ts. */
function siteMeta(): Plugin {
  const values: Record<string, string> = {
    SITE_TITLE: site.title,
    SITE_DESCRIPTION: site.description,
    SITE_NAME: site.name,
    SITE_URL: site.url.replace(/\/$/, ""),
  };
  return {
    name: "site-meta",
    transformIndexHtml: (html) => html.replace(/%(SITE_[A-Z_]+)%/g, (match, key: string) => escapeHtml(values[key] ?? match)),
  };
}

export default defineConfig({
  plugins: [react(), siteMeta()],
});

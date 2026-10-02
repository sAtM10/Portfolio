import { existsSync, rmSync } from 'node:fs';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// Indexable routes for sitemap.xml.
const PUBLIC_ROUTES = ['/', '/portfolio', '/workspace'];

/**
 * Production builds must know where the site and API live; failing here beats shipping
 * broken canonical/Open Graph links or an API pointing at localhost.
 */
function validateProductionEnv(env) {
  const problems = [];
  try {
    const site = new URL(env.VITE_SITE_URL);
    if (site.protocol !== 'https:' && site.hostname !== 'localhost') {
      problems.push('VITE_SITE_URL must use https.');
    }
  } catch {
    problems.push('VITE_SITE_URL must be the public site URL, e.g. https://example.vercel.app');
  }
  // Empty is allowed (same-origin API); undefined means it was forgotten.
  if (env.VITE_API_URL === undefined) {
    problems.push('VITE_API_URL must be set (the API base URL, or empty for same-origin).');
  }
  // Catches mangled values too, e.g. Git Bash rewriting "/resume.pdf" to a Windows path.
  if (env.VITE_RESUME_URL && !/^(\/(?!\/)|https:\/\/)/.test(env.VITE_RESUME_URL)) {
    problems.push('VITE_RESUME_URL must be a site path like /resume.pdf or an https URL.');
  }
  if (problems.length) {
    throw new Error(`Invalid production build configuration:\n- ${problems.join('\n- ')}`);
  }
}

/** Emits robots.txt and sitemap.xml for the configured site URL. */
function seoFiles(siteUrl) {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      const urls = PUBLIC_ROUTES.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
      });
    },
  };
}

/**
 * Privacy guard: public/resume.pdf may be a local, unsanitized copy. Unless a public
 * resume is explicitly enabled (VITE_RESUME_URL), it is deleted from the build output,
 * so it can never be deployed by accident — whatever machine the build runs on.
 */
function resumeGuard(resumeEnabled) {
  return {
    name: 'resume-guard',
    apply: 'build',
    closeBundle() {
      const file = fileURLToPath(new URL('./dist/resume.pdf', import.meta.url));
      if (!resumeEnabled && existsSync(file)) {
        rmSync(file);
        console.info('[resume-guard] VITE_RESUME_URL is not set: removed resume.pdf from dist.');
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  if (command === 'build' && mode === 'production') validateProductionEnv(env);
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '');

  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl), resumeGuard(Boolean(env.VITE_RESUME_URL))],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      // Never inline fonts as data: URIs — the production CSP (vercel.json) allows fonts
      // from 'self' only, and separate files cache better anyway.
      assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined),
    },
    server: {
      port: 5173,
      strictPort: true,
    },
    preview: {
      port: 4173,
      strictPort: true,
    },
  };
});

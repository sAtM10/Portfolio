import baseConfig from '../.prettierrc.json' with { type: 'json' };

/** @type {import('prettier').Config} */
export default {
  ...baseConfig,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/index.css',
};

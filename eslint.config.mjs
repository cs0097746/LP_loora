import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['components/v4/**/*.{ts,tsx}'],
    rules: {
      // V4 intentionally serves audited high-resolution static rasters directly.
      // This avoids reintroducing the image-optimizer failure mode that broke product proof in V2/V3.
      '@next/next/no-img-element': 'off',
    },
  },
  globalIgnores(['.next/**', 'coverage/**', 'playwright-report/**', 'test-results/**']),
]);

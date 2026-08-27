import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('V3 runtime contract', () => {
  it('uses the patched Next.js August 2026 security release', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

    expect(pkg.dependencies.next).toBe('16.3.3');
    expect(pkg.devDependencies['eslint-config-next']).toBe('16.3.3');
  });

  it('uses normal Next production serving so public product media is available', () => {
    const config = readFileSync('next.config.ts', 'utf8');

    expect(config).not.toContain("output: 'standalone'");
  });
});

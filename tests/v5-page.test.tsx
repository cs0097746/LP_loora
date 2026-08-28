import { existsSync } from 'node:fs';
import path from 'node:path';

describe('Loomie V5 route', () => {
  it('provides an isolated /v5 page before replacing V4', () => {
    expect(existsSync(path.resolve('app/v5/page.tsx'))).toBe(true);
  });
});

import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const assets = [
  'kanban-left.webp',
  'kanban-right.webp',
  'contact-history.webp',
  'dashboard.webp',
  'automations.webp',
  'tasks.webp',
] as const;

function readWebpDimensions(buffer: Buffer) {
  expect(buffer.subarray(0, 4).toString('ascii')).toBe('RIFF');
  expect(buffer.subarray(8, 12).toString('ascii')).toBe('WEBP');

  const chunk = buffer.subarray(12, 16).toString('ascii');
  if (chunk === 'VP8X') {
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return { width, height };
  }

  if (chunk === 'VP8 ') {
    const frame = buffer.indexOf(Buffer.from([0x9d, 0x01, 0x2a]));
    if (frame === -1) throw new Error('VP8 frame header not found');
    return {
      width: buffer.readUInt16LE(frame + 3) & 0x3fff,
      height: buffer.readUInt16LE(frame + 5) & 0x3fff,
    };
  }

  if (chunk === 'VP8L') {
    const b1 = buffer[22];
    const b2 = buffer[23];
    const b3 = buffer[24];
    return {
      width: 1 + (((b2 & 0x3f) << 8) | b1),
      height: 1 + (((b3 & 0x0f) << 10) | (b2 >> 6) << 8 | b3),
    };
  }

  throw new Error(`Unsupported WebP chunk ${chunk}`);
}

describe('V4 product proof assets', () => {
  for (const asset of assets) {
    it(`${asset} is a high resolution non-tiny CRM capture`, () => {
      const file = path.join(process.cwd(), 'public', 'product-v4', asset);
      expect(fs.existsSync(file), `${asset} should exist`).toBe(true);

      const bytes = fs.readFileSync(file);
      expect(bytes.byteLength, `${asset} should not be aggressively compressed`).toBeGreaterThan(40_000);

      const dimensions = readWebpDimensions(bytes);
      expect(dimensions.width, `${asset} should retain high intrinsic width`).toBeGreaterThanOrEqual(1800);
    });
  }
});

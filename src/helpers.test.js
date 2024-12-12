import { describe, expect, test } from 'vitest';

import { getHexString } from './helpers';

describe('getHexString', () => {
  test('getHexString to be a function', () => {
    expect(getHexString).toBeTypeOf('function');
  });
  describe('to get correct results', () => {
    test('getHexString(1) to be 0-h', () => {
      expect(getHexString(1)).toMatch(/^[1234567890abcdef]$/);
    });
    test('getHexString(16)', () => {
      expect(getHexString(16)).toMatch(/^[1234567890abcdef]{16}$/);
    });
    test('getHexString to change', () => {
      expect(getHexString(16)).not.toEqual(getHexString(16));
    });
    test('getHexString(1001)', () => {
      expect(getHexString(1001)).toMatch(/^[1234567890abcdefgh]{1001}$/);
    });
  });
});

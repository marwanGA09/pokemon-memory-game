import { describe, expect, test } from 'vitest';

describe('testing test', () => {
  test('test 1', () => {
    expect(true).toBe(true);
    expect(true).not.toBe(false);
  });
});

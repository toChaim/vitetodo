import { describe, expect, test } from 'vitest';

import { where, or, filterObject } from './dataConnection';

describe('filterObject', () => {
  test('should be a function', () => {
    expect(filterObject).toBeTypeOf('function');
  });
  describe('should return correct results', () => {
    test('should return an object', () => {
      expect(filterObject({}, [])).toBeTypeOf('object');
    });
    test('should return same object with no filters', () => {
      expect(filterObject({ a: 'test' }, [])).toEqual({ a: 'test' });
    });
    test('should return same object when true', () => {
      expect(filterObject({ a: 'test', b: 4 }, [() => true])).toEqual({
        a: 'test',
        b: 4,
      });
    });
  });
  test('should return empty object when false', () => {
    expect(filterObject({ a: 'test', b: 4 }, [() => false])).toEqual({});
  });
  test('should return correct object when given a filter', () => {
    expect(
      filterObject({ a: 'test', b: 4 }, [(v) => typeof v === 'string']),
    ).toEqual({ a: 'test' });
  });
  test('shold work on a collenction object', () => {
    expect(
      filterObject({ a: { b: true }, b: { b: false } }, [(v) => v.b]),
    ).toEqual({ a: { b: true } });
  });
});
describe('where', () => {
  test('should be a function', () => {
    expect(where).toBeTypeOf('function');
  });
  test('should return a function', () => {
    expect(where('key', '=', 'value')).toBeTypeOf('function');
  });
  describe('should return correct results', () => {
    test('"=="should return a function', () => {
      const testFn = where('key', '==', 'value');
      expect(testFn({ key: 'value' })).toEqual(true);
      expect(testFn({ key: true })).toEqual(false);
      expect(testFn({ keys: 'value' })).toEqual(false);
    });
  });
});
describe('or', () => {
  test('should be a function', () => {
    expect(or).toBeTypeOf('function');
  });
});

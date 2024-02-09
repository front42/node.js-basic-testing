import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Add })).toBe(-3);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Add })).toBe(1);
    expect(simpleCalculator({ a: 0, b: -1, action: Action.Add })).toBe(-1);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Add })).toBe(1);
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Subtract })).toBe(-3);
    expect(simpleCalculator({ a: 0, b: -1, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
  });
  console.log(-20 - -62);

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Multiply })).toBe(2);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Multiply })).toBe(-2);
    expect(simpleCalculator({ a: 0, b: -1, action: Action.Multiply })).toBe(-0);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toBe(2);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Divide })).toBe(0.5);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Divide })).toBe(-0.5);
    expect(simpleCalculator({ a: 0, b: -1, action: Action.Divide })).toBe(-0);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: -1, b: -2, action: Action.Exponentiate }),
    ).toBe(1);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 0, b: -1, action: Action.Exponentiate })).toBe(
      Infinity,
    );
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: -1, b: -2, action: 'add' })).toBe(null);
    expect(simpleCalculator({ a: -1, b: 2, action: 'subtract' })).toBe(null);
    expect(simpleCalculator({ a: 0, b: -1, action: 'multiply' })).toBe(null);
    expect(simpleCalculator({ a: 1, b: 0, action: 'divide' })).toBe(null);
    expect(simpleCalculator({ a: 1, b: 2, action: 'exponentiate' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '-1', b: -2, action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: -1, b: 2n, action: Action.Subtract })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: undefined, b: -2, action: Action.Multiply }),
    ).toBe(null);
    expect(simpleCalculator({ a: -1, b: null, action: Action.Divide })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: -1, b: { c: -2 }, action: Action.Exponentiate }),
    ).toBe(null);
  });
});

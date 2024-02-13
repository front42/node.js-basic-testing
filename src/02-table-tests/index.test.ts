import { simpleCalculator, Action } from './index';

const testActions = [
  { a: -1, b: -2, action: Action.Add, expected: -3 },
  { a: -1, b: 2, action: Action.Add, expected: 1 },
  { a: 0, b: -1, action: Action.Add, expected: -1 },
  { a: 1, b: 0, action: Action.Add, expected: 1 },
  { a: 1, b: 2, action: Action.Add, expected: 3 },

  { a: -1, b: -2, action: Action.Subtract, expected: 1 },
  { a: -1, b: 2, action: Action.Subtract, expected: -3 },
  { a: 0, b: -1, action: Action.Subtract, expected: 1 },
  { a: 1, b: 0, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },

  { a: -1, b: -2, action: Action.Multiply, expected: 2 },
  { a: -1, b: 2, action: Action.Multiply, expected: -2 },
  { a: 0, b: -1, action: Action.Multiply, expected: -0 },
  { a: 1, b: 0, action: Action.Multiply, expected: 0 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },

  { a: -1, b: -2, action: Action.Divide, expected: 0.5 },
  { a: -1, b: 2, action: Action.Divide, expected: -0.5 },
  { a: 0, b: -1, action: Action.Divide, expected: -0 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },

  { a: -1, b: -2, action: Action.Exponentiate, expected: 1 },
  { a: -1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 0, b: -1, action: Action.Exponentiate, expected: Infinity },
  { a: 1, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
];

const testNull = [
  { a: -1, b: -2, action: 'add' },
  { a: -1, b: 2, action: 'subtract' },
  { a: 0, b: -1, action: 'multiply' },
  { a: 1, b: 0, action: 'divide' },
  { a: 1, b: 2, action: 'exponentiate' },

  { a: '-1', b: -2, action: Action.Add },
  { a: -1, b: 2n, action: Action.Subtract },
  { a: undefined, b: -2, action: Action.Multiply },
  { a: -1, b: null, action: Action.Divide },
  { a: -1, b: { c: -2 }, action: Action.Exponentiate },
];

describe('simpleCalculator', () => {
  test.each(testActions)(
    'should test each action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test.each(testNull)(
    'should test null returns for invalid action or arguments',
    ({ a, b, action }) => {
      expect(simpleCalculator({ a, b, action })).toBe(null);
    },
  );
});

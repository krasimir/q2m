const assert = require('assert');
const qs = require('qs');

const { parse } = require('../index.js');
const CASES = require('./cases');

describe('Passing falsy or non object values', () => {
  it('should return empty object', () => {
    assert.deepStrictEqual(parse(), {});
    assert.deepStrictEqual(parse(false), {});
    assert.deepStrictEqual(parse(null), {});
    assert.deepStrictEqual(parse(''), {});
    assert.deepStrictEqual(parse(5), {});
    assert.deepStrictEqual(parse([]), {});
  });
});
describe('Passing a string', () => {
  it('should use qs to transform the string to an object', () => {
    assert.deepStrictEqual(
      parse('and[0][a]=>20&and[1][b]=$bar'),
      {
        $and: [
          { a: { $gt: 20 }},
          { b: { $regex: 'bar', $options: 'i' }}
        ]
      }
    );
  });
});
describe('Passing working values', () => {
  CASES.forEach(([ description, queryString, input, output ]) => {
    it(`${description} - ${queryString} - ${JSON.stringify(input)} -> ${JSON.stringify(output)}`, () => {
      if (queryString) {
        const qsObj = qs.parse(queryString);
        assert.deepStrictEqual(qsObj, input);
      }
      assert.deepStrictEqual(parse(input), output);
    });
  });
})

/* ------------------------------------------------------------------------ */

function describe(description, callback) {
  console.log(description);
  callback();
}
function it(description, callback) {
  try {
    callback();
    console.log(`  ✔ ${description}`);
  } catch (error) {
    console.error(`  ✘ ${description}`);
    console.error(error);
  }
}
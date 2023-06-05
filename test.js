const assert = require('assert');

const { parse } = require('./index.js');

describe('Passing falsy or non object values', () => {
  it('should return empty object', () => {
    assert.deepStrictEqual(parse(), {});
    assert.deepStrictEqual(parse(false), {});
    assert.deepStrictEqual(parse(null), {});
    assert.deepStrictEqual(parse(''), {});
    assert.deepStrictEqual(parse(5), {});
    assert.deepStrictEqual(parse([]), {});
  });
  [
    ['$eq', { foo: 'bar' }, { foo: { $eq: 'bar' } }],
    ['$ne', { foo: '!bar' }, { foo: { $ne: 'bar' } }],
    ['$exists', { foo: '!bar' }, { foo: { $ne: 'bar' } }],
  ].forEach(([ description, input, output ]) => {
    it(`${description} - ${JSON.stringify(input)} -> ${JSON.stringify(output)}`, () => {
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
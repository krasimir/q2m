const assert = require('assert');
const qs = require('querystring');

const { parse } = require('./index.js');

const CASES = [

  ['$eq', 'foo=bar', { foo: 'bar' }, { foo: { $eq: 'bar' } }],
  ['$ne', 'foo=!bar', { foo: '!bar' }, { foo: { $ne: 'bar' } }],
  ['$exists', 'foo==bar', { foo: '=bar' }, { foo: { $exists: true } }],
  ['$exists', 'foo=!=bar', { foo: '!=bar' }, { foo: { $exists: false } }],
  ['$gt', 'foo=>20', { foo: '>20' }, { foo: { $gt: 20 } }],
  ['$gte', 'foo=>=20', { foo: '>=20' }, { foo: { $gte: 20 } }],
  ['$lt', 'foo=<20', { foo: '<20' }, { foo: { $lt: 20 } }],
  ['$lte', 'foo=<=20', { foo: '<=20' }, { foo: { $lte: 20 } }],
  ['$in', 'foo[]=a&foo[]=b', { 'foo[]': [ 'a', 'b' ] }, { foo: { $in: [ 'a', 'b' ] } }],
  ['$nin', 'foo![]=a&foo![]=b', { 'foo![]': [ 'a', 'b' ] }, { foo: { $nin: [ 'a', 'b' ] } }],
  ['$or', 'foo[or]=a&foo[or]=b', { 'foo[or]': [ 'a', 'b' ] },
    { $or: [ { foo: { $eq: 'a' }}, { foo: { $eq: 'b' }} ] }
  ],
  ['$or', 'foo[or]=$bar&foo[or]=>20', { 'foo[or]': [ '$bar', '>20' ] },
    { $or: [ { foo: { $regex: new RegExp('bar'), $options: 'i' }}, { foo: { $gt: 20 }} ] }
  ],
  ['$and', 'foo[and]=a&foo[and]=b', { 'foo[and]': [ 'a', 'b' ] },
    { $and: [ { foo: { $eq: 'a' }}, { foo: { $eq: 'b' }} ] }
  ],
  ['$nor', 'foo[nor]=a&foo[nor]=b', { 'foo[nor]': [ 'a', 'b' ] },
    { $nor: [ { foo: { $eq: 'a' }}, { foo: { $eq: 'b' }} ] }
  ],
  ['$regex', 'foo=$bar', { foo: '$bar' }, { foo: { $regex: new RegExp('bar'), $options: 'i' } }],
]

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
describe('Passing working values', () => {
  CASES.forEach(([ description, queryString, input, output ]) => {
    it(`${description} - ${queryString} - ${JSON.stringify(input)} -> ${JSON.stringify(output)}`, () => {
      const qsObj = JSON.parse(JSON.stringify(qs.parse(queryString)))
      assert.deepStrictEqual(qsObj, input);
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
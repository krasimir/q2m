module.exports = [
  ['$eq', 'foo=bar', { foo: 'bar' }, { foo: { $eq: 'bar' } }],
  ['$ne', 'foo=!bar', { foo: '!bar' }, { foo: { $ne: 'bar' } }],
  ['$exists', 'foo==bar', { foo: '=bar' }, { foo: { $exists: true } }],
  ['$exists', 'foo=!=bar', { foo: '!=bar' }, { foo: { $exists: false } }],
  ['$gt', 'foo=>20', { foo: '>20' }, { foo: { $gt: 20 } }],
  ['$gte', 'foo=>=20', { foo: '>=20' }, { foo: { $gte: 20 } }],
  ['$lt', 'foo=<20', { foo: '<20' }, { foo: { $lt: 20 } }],
  ['$lte', 'foo=<=20', { foo: '<=20' }, { foo: { $lte: 20 } }],
  ['$in', 'foo[]=a&foo[]=b', { 'foo': [ 'a', 'b' ] }, { foo: { $in: [ 'a', 'b' ] } }],
  ['$nin', 'foo![]=a&foo![]=b', { 'foo!': [ 'a', 'b' ] }, { foo: { $nin: [ 'a', 'b' ] } }],
  [
    '$or',
    'or[0][a]=>20&or[1][b]=$bar',
    { or: [ { a: '>20' }, { b: '$bar'} ] },
    { $or: [ { a: { $gt: 20 }}, { b: { $regex: 'bar', $options: 'i' }} ] }
  ],
  [
    '$or',
    'or[0][a]=&or[1][b]=$bar',
    { or: [ { a: '' }, { b: '$bar'} ] },
    { $or: [ { a: { $eq: '' } }, { b: { $regex: 'bar', $options: 'i' }} ] },
    true
  ],
  [
    '$or',
    undefined,
    { or: [ { a: undefined }, { b: '$bar'} ] },
    { $or: [ { b: { $regex: 'bar', $options: 'i' }} ] },
    true
  ],
  [
    '$or',
    undefined,
    { or : [ { a: '$foo'}, { b: [ 'n', 'm' ] } ] },
    {
      $or: [
        {
          a:{
            $options: "i",
            $regex: "foo"
          }
        },
        {
          b: {
            $in: ["n","m"]
          }
        }
      ]
    },
  ],
  [
    '$and',
    'and[0][a]=>20&and[1][b]=$bar',
    { and: [ { a: '>20' }, { b: '$bar'} ] },
    { $and: [ { a: { $gt: 20 }}, { b: { $regex: 'bar', $options: 'i' }} ] }
  ],
  [
    '$nor',
    'nor[0][a]=>20&nor[1][b]=$bar',
    { nor: [ { a: '>20' }, { b: '$bar'} ] },    
    { $nor: [ { a: { $gt: 20 }}, { b: { $regex: 'bar', $options: 'i' }} ] }
  ],
  ['$regex', 'foo=$bar', { foo: '$bar' }, { foo: { $regex: 'bar', $options: 'i' } }],
  ['$regex', 'foo=%24bar', { foo: '$bar' }, { foo: { $regex: 'bar', $options: 'i' } }, true],
  ['$regex', undefined, { foo: '%24bar' }, { foo: { $regex: 'bar', $options: 'i' } }, true],
];

// { or: [ { a: [] }] }
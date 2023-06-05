module.exports = [
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
  [
    '$or',
    'or[0][a]=>20&or[1][b]=$bar',
    { 'or[0][a]': '>20', 'or[1][b]': '$bar' },
    { $or: [ { a: { $gt: 20 }}, { b: { $regex: new RegExp('bar'), $options: 'i' }} ] }
  ],
  [
    '$or',
    'or[0][a]=&or[1][b]=$bar',
    { 'or[0][a]': '', 'or[1][b]': '$bar' },
    { $or: [ { b: { $regex: new RegExp('bar'), $options: 'i' }} ] },
    true
  ],
  [
    '$or',
    undefined,
    { 'or[0][_id]': undefined, 'or[1][name]': '$bar' },
    { $or: [ { name: { $regex: new RegExp('bar'), $options: 'i' }} ] },
    true
  ],
  ['$and', 'foo[and]=a&foo[and]=b', { 'foo[and]': [ 'a', 'b' ] },
    { $and: [ { foo: { $eq: 'a' }}, { foo: { $eq: 'b' }} ] }
  ],
  ['$and', 'and[0][a]=>20&and[1][b]=$bar',
    { 'and[0][a]': '>20', 'and[1][b]': '$bar' },
    { $and: [ { a: { $gt: 20 }}, { b: { $regex: new RegExp('bar'), $options: 'i' }} ] }
  ],
  ['$nor', 'foo[nor]=a&foo[nor]=b', { 'foo[nor]': [ 'a', 'b' ] },
    { $nor: [ { foo: { $eq: 'a' }}, { foo: { $eq: 'b' }} ] }
  ],
  ['$nor', 'nor[0][a]=>20&nor[1][b]=$bar',
    { 'nor[0][a]': '>20', 'nor[1][b]': '$bar' },
    { $nor: [ { a: { $gt: 20 }}, { b: { $regex: new RegExp('bar'), $options: 'i' }} ] }
  ],
  ['$regex', 'foo=$bar', { foo: '$bar' }, { foo: { $regex: new RegExp('bar'), $options: 'i' } }],
  ['$regex', 'foo=%24bar', { foo: '$bar' }, { foo: { $regex: new RegExp('bar'), $options: 'i' } }, true],
  ['$regex', undefined, { foo: '%24bar' }, { foo: { $regex: new RegExp('bar'), $options: 'i' } }, true],
];
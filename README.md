# q2m

A URL query object to MongoDB query

## Why

I needed to query MongoDB database from the URL. Basically transfrom the params passed via GET to a properly written MongoDB query object.

## Example

First, get the library via `npm install q2m` or `yarn install q2m`. Then:

```
const { parse } = require('q2m');

parse({ foo: 'bar' });
// { foo: { $eq: 'bar' }}
```

## Conversions

| MongoDB operation | Query string | Object passed to parse | Result |
| --- | --- | --- | --- |
| $eq | foo=bar | { foo: 'bar' } | { foo: { $eq: 'bar' } |
| $ne | foo=!bar | { foo: '!bar' } | { foo: { $ne: 'bar' } |
| $exists | foo==bar | { foo: '=bar' } | { foo: { $exists: true } |
| $exists | foo=!=bar | { foo: '!=bar' } | { foo: { $exists: false } |
| $gt | foo=>20 | { foo: '>20' } | { foo: { $gt: 20 } |
| $gte | foo=>=20 | { foo: '>=20' } | { foo: { $gte: 20 } |
| $lt | foo=<20 | { foo: '<20' } | { foo: { $lt: 20 } |
| $lte | foo=<=20 | { foo: '<=20' } | { foo: { $lte: 20 } |
| $in | foo[]=a&foo[]=b | { 'foo[]': [ 'a', 'b' ] } | { foo: { $in: [ 'a', 'b' ] } |
| $nin | foo![]=a&foo![]=b | { 'foo![]': [ 'a', 'b' ] } | { foo: { $nin: [ 'a', 'b' ] } |
| $or | foo[or]=a&foo[or]=b | { 'foo[or]': [ 'a', 'b' ] } | { $or: [ { foo: { $eq: 'a' }}, { foo: { $eq: 'b' }} ] |
| $or | foo[or]=$bar&foo[or]=>20 | { 'foo[or]': [ '$bar', '>20' ] } | { $or: [ { foo: { $regex: new RegExp('bar'), $options: 'i' }}, { foo: { $gt: 20 }} ] |
| $and | foo[and]=a&foo[and]=b | { 'foo[and]': [ 'a', 'b' ] } | { $and: [ { foo: { $eq: 'a' }}, { foo: { $eq: 'b' }} ] } ],
| $nor | foo[nor]=a&foo[nor]=b | { 'foo[nor]': [ 'a', 'b' ] } | { $nor: [ { foo: { $eq: 'a' }}, { foo: { $eq: 'b' }} ] |
| $regex |  foo=$bar | { foo: '$bar' } | { foo: { $regex: new RegExp('bar'), $options: 'i' } |





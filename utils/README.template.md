# q2m

A URL query object to MongoDB query

{menu}

## Why

I needed to query MongoDB database from the URL. Basically transfrom the params passed via GET to a properly written MongoDB query object.

## Example

First, get the library via `npm install q2m` or `yarn install q2m`. Then:

```js
const { parse } = require('q2m');

parse({ foo: 'bar' });
// { foo: { $eq: 'bar' }}
```

## Mapping

_(The conversion from query string to object in the examples below is made with [qs](https://www.npmjs.com/package/qs) )_
{cases}
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

## Mapping
{cases}
# q2m

A URL query object to MongoDB query

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

### $eq

Query string: `foo=bar`

Object passed to `parse` function:
```json
{
  "foo": "bar"
}
```

Output:
```json
{
  "foo": {
    "$eq": "bar"
  }
}
```

### $ne

Query string: `foo=!bar`

Object passed to `parse` function:
```json
{
  "foo": "!bar"
}
```

Output:
```json
{
  "foo": {
    "$ne": "bar"
  }
}
```

### $exists

Query string: `foo==bar`

Object passed to `parse` function:
```json
{
  "foo": "=bar"
}
```

Output:
```json
{
  "foo": {
    "$exists": true
  }
}
```

### $exists

Query string: `foo=!=bar`

Object passed to `parse` function:
```json
{
  "foo": "!=bar"
}
```

Output:
```json
{
  "foo": {
    "$exists": false
  }
}
```

### $gt

Query string: `foo=>20`

Object passed to `parse` function:
```json
{
  "foo": ">20"
}
```

Output:
```json
{
  "foo": {
    "$gt": 20
  }
}
```

### $gte

Query string: `foo=>=20`

Object passed to `parse` function:
```json
{
  "foo": ">=20"
}
```

Output:
```json
{
  "foo": {
    "$gte": 20
  }
}
```

### $lt

Query string: `foo=<20`

Object passed to `parse` function:
```json
{
  "foo": "<20"
}
```

Output:
```json
{
  "foo": {
    "$lt": 20
  }
}
```

### $lte

Query string: `foo=<=20`

Object passed to `parse` function:
```json
{
  "foo": "<=20"
}
```

Output:
```json
{
  "foo": {
    "$lte": 20
  }
}
```

### $in

Query string: `foo[]=a&foo[]=b`

Object passed to `parse` function:
```json
{
  "foo": [
    "a",
    "b"
  ]
}
```

Output:
```json
{
  "foo": {
    "$in": [
      "a",
      "b"
    ]
  }
}
```

### $nin

Query string: `foo![]=a&foo![]=b`

Object passed to `parse` function:
```json
{
  "foo!": [
    "a",
    "b"
  ]
}
```

Output:
```json
{
  "foo": {
    "$nin": [
      "a",
      "b"
    ]
  }
}
```

### $or

Query string: `or[0][a]=>20&or[1][b]=$bar`

Object passed to `parse` function:
```json
{
  "or": [
    {
      "a": ">20"
    },
    {
      "b": "$bar"
    }
  ]
}
```

Output:
```json
{
  "$or": [
    {
      "a": {
        "$gt": 20
      }
    },
    {
      "b": {
        "$regex": "bar",
        "$options": "i"
      }
    }
  ]
}
```

### $or (nested variant)



Object passed to `parse` function:
```json
{
  "or": [
    {
      "a": "$foo"
    },
    {
      "b": [
        "n",
        "m"
      ]
    }
  ]
}
```

Output:
```json
{
  "$or": [
    {
      "a": {
        "$options": "i",
        "$regex": "foo"
      }
    },
    {
      "b": {
        "$in": [
          "n",
          "m"
        ]
      }
    }
  ]
}
```

### $and

Query string: `and[0][a]=>20&and[1][b]=$bar`

Object passed to `parse` function:
```json
{
  "and": [
    {
      "a": ">20"
    },
    {
      "b": "$bar"
    }
  ]
}
```

Output:
```json
{
  "$and": [
    {
      "a": {
        "$gt": 20
      }
    },
    {
      "b": {
        "$regex": "bar",
        "$options": "i"
      }
    }
  ]
}
```

### $nor

Query string: `nor[0][a]=>20&nor[1][b]=$bar`

Object passed to `parse` function:
```json
{
  "nor": [
    {
      "a": ">20"
    },
    {
      "b": "$bar"
    }
  ]
}
```

Output:
```json
{
  "$nor": [
    {
      "a": {
        "$gt": 20
      }
    },
    {
      "b": {
        "$regex": "bar",
        "$options": "i"
      }
    }
  ]
}
```

### $regex

Query string: `foo=$bar`

Object passed to `parse` function:
```json
{
  "foo": "$bar"
}
```

Output:
```json
{
  "foo": {
    "$regex": "bar",
    "$options": "i"
  }
}
```

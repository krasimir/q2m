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
  "foo[]": [
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
  "foo![]": [
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

Query string: `foo[or]=a&foo[or]=b`

Object passed to `parse` function:
```json
{
  "foo[or]": [
    "a",
    "b"
  ]
}
```

Output:
```json
{
  "$or": [
    {
      "foo": {
        "$eq": "a"
      }
    },
    {
      "foo": {
        "$eq": "b"
      }
    }
  ]
}
```

### $or

Query string: `foo[or]=$bar&foo[or]=>20`

Object passed to `parse` function:
```json
{
  "foo[or]": [
    "$bar",
    ">20"
  ]
}
```

Output:
```json
{
  "$or": [
    {
      "foo": {
        "$regex": {},
        "$options": "i"
      }
    },
    {
      "foo": {
        "$gt": 20
      }
    }
  ]
}
```

### $or

Query string: `or[0][a]=>20&or[1][b]=$bar`

Object passed to `parse` function:
```json
{
  "or[0][a]": ">20",
  "or[1][b]": "$bar"
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
        "$regex": {},
        "$options": "i"
      }
    }
  ]
}
```

### $and

Query string: `foo[and]=a&foo[and]=b`

Object passed to `parse` function:
```json
{
  "foo[and]": [
    "a",
    "b"
  ]
}
```

Output:
```json
{
  "$and": [
    {
      "foo": {
        "$eq": "a"
      }
    },
    {
      "foo": {
        "$eq": "b"
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
  "and[0][a]": ">20",
  "and[1][b]": "$bar"
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
        "$regex": {},
        "$options": "i"
      }
    }
  ]
}
```

### $nor

Query string: `foo[nor]=a&foo[nor]=b`

Object passed to `parse` function:
```json
{
  "foo[nor]": [
    "a",
    "b"
  ]
}
```

Output:
```json
{
  "$nor": [
    {
      "foo": {
        "$eq": "a"
      }
    },
    {
      "foo": {
        "$eq": "b"
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
  "nor[0][a]": ">20",
  "nor[1][b]": "$bar"
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
        "$regex": {},
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
    "$regex": {},
    "$options": "i"
  }
}
```

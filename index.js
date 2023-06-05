function parse(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return {};
  
  let res = {};
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    if (typeof value === 'string') {
      res[key] = parseStringValue(value);
    } else if (Array.isArray(value)) {
      if (key.match(/\!\[\]$/)) {
        key = key.replace(/\!\[\]$/, '');
        res[key] = { $nin: value };
      } else if (key.match(/\[\]$/)) {
        key = key.replace(/\[\]$/, '');
        res[key] = { $in: value };
      } else if (key.match(/\[or\]$/)) {
        key = key.replace(/\[or\]$/, '');
        res['$or'] = value.map(v => ({ [key]: parseStringValue(v) }));
      } else if (key.match(/\[and\]$/)) {
        key = key.replace(/\[and\]$/, '');
        res['$and'] = value.map(v => ({ [key]:  parseStringValue(v) }));
      } else if (key.match(/\[nor\]$/)) {
        key = key.replace(/\[nor\]$/, '');
        res['$nor'] = value.map(v => ({ [key]:  parseStringValue(v) }));
      }
    }
  });

  return res;
}

function parseStringValue(value) {
  if (value.match(/^\!=/)) {
    return { $exists: false };
  } else if (value.match(/^\!/)) {
    value = value.replace(/^\!/, '');
    return { $ne: value };
  } else if (value.match(/^=/)) {
    return { $exists: true };
  } else if (value.match(/^>=/)) {
    value = value.replace(/^>=/, '');
    if (isNumeric(value)) {
      return { $gte: parseFloat(value) };
    }
  } else if (value.match(/^>/)) {
    value = value.replace(/^>/, '');
    if (isNumeric(value)) {
      return { $gt: parseFloat(value) };
    }
  } else if (value.match(/^<=/)) {
    value = value.replace(/^<=/, '');
    if (isNumeric(value)) {
      return { $lte: parseFloat(value) };
    }
  } else if (value.match(/^</)) {
    value = value.replace(/^</, '');
    if (isNumeric(value)) {
      return { $lt: parseFloat(value) };
    }
  } else if (value.match(/^\$/)) {
    value = value.replace(/^\$/, '');
    return { $regex: new RegExp(value), $options: 'i' };
  } else {
    return { $eq: value };
  }
}

module.exports = {
  parse
}

/* ------------------------------------------------------------------------ utils */
function isNumeric(value) {
  return !isNaN(value - parseFloat(value));
}
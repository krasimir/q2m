function parse(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return {};

  const OR_REGEXP = /or\[(.*)\]\[(.*)\]$/;
  const AND_REGEXP = /and\[(.*)\]\[(.*)\]$/;
  const NOR_REGEXP = /nor\[(.*)\]\[(.*)\]$/;
  
  let res = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === 'string' && value !== '') {
       if (key.match(NOR_REGEXP)) {
        const match = key.match(NOR_REGEXP);
        if (isNumeric(match[1])) {
          const index = parseInt(match[1]);
          const field = match[2];
          const value = obj[key];
          if (!res['$nor']) res['$nor'] = [];
          res['$nor'][index] = { [field]: parseStringValue(value) };
        }
      } else if (key.match(OR_REGEXP)) {
        const match = key.match(OR_REGEXP);
        if (isNumeric(match[1])) {
          const index = parseInt(match[1]);
          const field = match[2];
          const value = obj[key];
          if (!res['$or']) res['$or'] = [];
          res['$or'][index] = { [field]: parseStringValue(value) };
        }
      } else if (key.match(AND_REGEXP)) {
        const match = key.match(AND_REGEXP);
        if (isNumeric(match[1])) {
          const index = parseInt(match[1]);
          const field = match[2];
          const value = obj[key];
          if (!res['$and']) res['$and'] = [];
          res['$and'][index] = { [field]: parseStringValue(value) };
        }
      } else {
        res[key] = parseStringValue(value);
      }
    } else if (Array.isArray(value)) {
      if (key.match(/\!\[\]$/)) {
        key = key.replace(/\!\[\]$/, '');
        res[key] = { $nin: value };
      } else if (key.match(/\[\]$/)) {
        key = key.replace(/\[\]$/, '');
        res[key] = { $in: value };
      } else if (key.match(/\[or\]$/)) {
        key = key.replace(/\[or\]$/, '');
        res['$or'] = value.map(v => v ? ({ [key]: parseStringValue(v) }) : false).filter(Boolean);
      } else if (key.match(/\[and\]$/)) {
        key = key.replace(/\[and\]$/, '');
        res['$and'] = value.map(v => v ? ({ [key]:  parseStringValue(v) }) : false).filter(Boolean);
      } else if (key.match(/\[nor\]$/)) {
        key = key.replace(/\[nor\]$/, '');
        res['$nor'] = value.map(v => ({ [key]: v ? parseStringValue(v) : false })).filter(Boolean);
      }
    }
  });

  if (res['$or']) { res['$or'] = res['$or'].filter(Boolean); }
  if (res['$and']) { res['$and'] = res['$and'].filter(Boolean); }
  if (res['$nor']) { res['$nor'] = res['$nor'].filter(Boolean); }

  return res;
}
function parseStringValue(value) {
  value = decodeURIComponent(value);
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
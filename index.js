const qs = require('qs');

function parse(obj) {
  if (!obj) return {};
  if (Array.isArray(obj)) return {};
  if (typeof obj === 'string') {
    obj = qs.parse(obj);
  }
  obj = clone(obj);

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
      if (key === 'or' || key === 'and' || key === 'nor') {
        res['$' + key] = value.map(criteria => {
          Object.keys(criteria).forEach(cKey => {
            if (typeof criteria[cKey] === 'string') {
              criteria[cKey] = parseStringValue(criteria[cKey]);
            } else if (Array.isArray(criteria[cKey]) && criteria[cKey].every(v => typeof v === 'string')) {
              criteria[cKey] = {
                $in: criteria[cKey]
              }
            } else {
              delete criteria[cKey];
            }
          });
          return isObjectEmpty(criteria) ? false : criteria;
        }).filter(Boolean);
      } else if (key.match(/\!$/)) {
        key = key.replace(/\!$/, '');
        res[key] = { $nin: value };
      } else {
        res[key] = { $in: value };
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
    return { $gte: normalizeValue(value) };
  } else if (value.match(/^>/)) {
    value = value.replace(/^>/, '');
    return { $gt: normalizeValue(value) };
  } else if (value.match(/^<=/)) {
    value = value.replace(/^<=/, '');
    return { $lte: normalizeValue(value) };
  } else if (value.match(/^</)) {
    value = value.replace(/^</, '');
    return { $lt: normalizeValue(value) };
  } else if (value.match(/^\$/)) {
    value = value.replace(/^\$/, '');
    return { $regex: value, $options: 'i' };
  } else {
    return { $eq: normalizeValue(value) };
  }
}

module.exports = {
  parse
}

/* ------------------------------------------------------------------------ utils */
function normalizeValue(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;
  if (isNumeric(value)) return parseFloat(value);
  if (isValidDateStr(value)) return new Date(value);
  return value;
}
function isNumeric(value) {
  return !isNaN(value - parseFloat(value));
}
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function isValidDateStr(str) {
  return !isNaN(Date.parse(str));
}
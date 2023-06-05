function parse(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return {};
  
  let res = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === 'string') {
      if (value.match(/^\!/)) {
        res[key] = { $ne: value.replace(/^\!/, '') };
      } else {
        res[key] = { $eq: value };
      }
    }
  });

  return res;
}

module.exports = {
  parse
}
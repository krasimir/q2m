const fs = require('fs');

const readme = fs.readFileSync(__dirname + '/README.template.md', 'utf8');
const CASES = require('./cases');

const casesStr = CASES.map(([ description, queryString, input, output, ignoreForReadme ]) => {
  if (ignoreForReadme) return '';
  return `
### ${description}

${queryString ? `Query string: \`${queryString}\`` : ''}

Object passed to \`parse\` function:
\`\`\`json
${JSON.stringify(input, null, 2)}
\`\`\`

Output:
\`\`\`json
${JSON.stringify(output, function (key, value) {
  if (value instanceof RegExp) {
    return `<regexp -> /${value.source}/${value.flags}>`;
  } else if (value instanceof Date || (typeof value === 'string' && isValidDateStr(value))) {
    return `<date object>`;
  }
  return value;
}, 2)}
\`\`\`
`
}).join('');

fs.writeFileSync(__dirname + '/../README.md', readme.replace('{cases}', casesStr));

function isValidDateStr(str) {
  return !isNaN(Date.parse(str));
}
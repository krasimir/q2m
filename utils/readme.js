const fs = require('fs');

const readme = fs.readFileSync(__dirname + '/README.template.md', 'utf8');
const CASES = require('./cases');

let menuStr = '';
const casesStr = CASES.map(([ description, queryString, input, output, ignoreForReadme ]) => {
  if (ignoreForReadme) return '';
  menuStr += `- [${description}](#${createAnchorLink(description)})\n`;
  return `
### ${description}

${queryString ? `Query string: \`${queryString}\`` : ''}

Object:
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

fs.writeFileSync(__dirname + '/../README.md', readme.replace('{cases}', casesStr).replace('{menu}', menuStr));

function isValidDateStr(str) {
  return !isNaN(Date.parse(str));
}
function createAnchorLink(str) {
  return str
    .toLowerCase()
    .replace(/\$/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
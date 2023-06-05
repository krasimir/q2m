const fs = require('fs');

const readme = fs.readFileSync(__dirname + '/README.template.md', 'utf8');
const CASES = require('./cases');
const {json}=require('stream/consumers');

const casesStr = CASES.map(([ description, queryString, input, output ]) => {
  return `
### ${description}

Query string: \`${queryString}\`

Object passed to \`parse\` function:
\`\`\`json
${JSON.stringify(input, null, 2)}
\`\`\`

Output:
\`\`\`json
${JSON.stringify(output, null, 2)}
\`\`\
`
}).join('');

fs.writeFileSync(__dirname + '/../README.md', readme.replace('{cases}', casesStr));
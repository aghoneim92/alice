const { readFileSync, writeFileSync } = require('fs')
writeFileSync(
  'dist/README.js',
  `module.exports = \`${readFileSync('./README.md').toString()}\``
)

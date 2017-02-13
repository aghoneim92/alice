const nodemon = require('nodemon')

nodemon({
  'exec': 'webpack-dev-server',
  'watch': [
    'index.ts',
    'index.d.ts',
    "node_modules",
    'tsconfig.json',
    '.babelrc',
    'bs-config.js',
    'package.json',
    'postcss.config.js',
  ],
})

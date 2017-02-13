const nodemon = require('nodemon')

nodemon({
  'exec': 'webpack-dev-server',
  'watch': [
    'index.js',
    "node_modules",
    'tsconfig.json',
    '.babelrc',
    'bs-config.js',
    'package.json',
    'postcss.config.js',
    'webpack.config.js',
  ],
})

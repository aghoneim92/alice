const nodemon = require('nodemon')

nodemon({
  'exec': 'webpack --watch webpack.config.js',
  'watch': [
    'index.ts',
    'index.d.ts',
    'tsconfig.json',
    '.babelrc',
    'bs-config.js',
    'typings.json',
    'package.json',
    'postcss.config.js',
  ],
})

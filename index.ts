/// <reference path="./index.d.ts" />

import * as nodemon from 'nodemon'

nodemon({
  'exec': 'node_modules/.bin/ts-node -P src/server dev.ts',
  'watch': [
    'dev.ts',
    'index.ts',
    "node_modules",
    'tsconfig.json',
    '.babelrc',
    'bs-config.js',
    'package.json',
    'postcss.config.js',
    'webpack.config.js',
  ],
})


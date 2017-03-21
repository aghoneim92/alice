/// <reference path="./index.d.ts" />
/// <reference path="../../index.d.ts" />

import { readFileSync } from 'fs'

const nonNodeModules = /\.(scss|jpg|css|png|less|md)/

const System = {
  import: function(name: string) {
    return Promise.resolve(
      nonNodeModules.test(name) ?
        name.includes('.md') ?
          readFileSync(name)
        : null
      : require(name)
    )
  }
}
Object.assign(
  global, {
    System,
  }
)

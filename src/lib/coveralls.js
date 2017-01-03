#!/usr/bin/env node
const { readFileSync } = require('fs')
const handleInput = require('coveralls/lib/handleInput')

handleInput(
  readFileSync('coverage/coverage.lcov').toString(),
  err => console.error(err)
)

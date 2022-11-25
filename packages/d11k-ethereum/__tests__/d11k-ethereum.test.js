'use strict'

const ethereum = require('..')
const assert = require('assert').strict

assert.strictEqual(ethereum(), 'Hello from ethereum')
console.info('ethereum tests passed')

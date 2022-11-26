'use strict'

const bitcoin = require('..')
const assert = require('assert').strict

assert.strictEqual(bitcoin(), 'Hello from bitcoin')
console.info('bitcoin tests passed')

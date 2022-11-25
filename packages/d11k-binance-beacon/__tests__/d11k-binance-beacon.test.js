'use strict'

const binanceBeacon = require('..')
const assert = require('assert').strict

assert.strictEqual(binanceBeacon(), 'Hello from binanceBeacon')
console.info('binanceBeacon tests passed')

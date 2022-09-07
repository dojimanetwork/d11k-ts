'use strict';

const d11kCrypto = require('..');
const assert = require('assert').strict;

assert.strictEqual(d11kCrypto(), 'Hello from d11kCrypto');
console.info("d11kCrypto tests passed");

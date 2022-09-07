'use strict';

const d11kClient = require('..');
const assert = require('assert').strict;

assert.strictEqual(d11kClient(), 'Hello from d11kClient');
console.info("d11kClient tests passed");

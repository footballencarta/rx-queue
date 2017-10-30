#!/usr/bin/env ts-node

// tslint:disable:no-shadowed-variable
import * as test  from 'blue-tape'
import * as sinon from 'sinon'
// const sinonTest   = require('sinon-test')(sinon)

import RxQueue from './rx-queue'

test('RxQueue subscribe & next', async function (t) {
  const EXPECTED_ITEM = { test: 'testing123' }
  const spy = sinon.spy()

  const q = new RxQueue()

  q.subscribe(spy)
  q.next(EXPECTED_ITEM)

  t.ok(spy.calledOnce, 'should received 1 call')
  t.deepEqual(spy.firstCall.args[0], EXPECTED_ITEM, 'should received EXPECTED_ITEM')
})

test('RxQueue version()', async t => {
  const q = new RxQueue()
  t.ok(/^\d+\.\d+\.\d+$/.test(q.version()), 'get version')
})
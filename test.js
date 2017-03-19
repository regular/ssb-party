var test = require('tape')
var pull = require('pull-stream')
var ssbKeys = require('ssb-keys')
var rimraf = require('rimraf')
var path = require('path')
var createConfig = require('ssb-config/inject')
var fs = require('fs')

var createSsbParty = require('.')

var tmpDir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'ssb-party-'))

var sbot1, sbot2
var opts = {
  keys: ssbKeys.generate(),
  skipPlugins: true,
  err: 'inherit',
  path: tmpDir,
  port: 45454,
  timeout: 1000,
  caps: {
    shs: '0000000000000000000000000000000000000000000='
  },
  timers: {
    keepalive: 1000
  }
}

test('create', function (t) {
  t.comment('dir: ' + tmpDir)
  createSsbParty(opts, function (err, sbot, config) {
    t.error(err, 'create ssb party')
    sbot1 = sbot
    t.ok(sbot, 'sbot')
    t.ok(config, 'config')
    t.end()
  })
})

test('rpc', function (t) {
  sbot1.whoami(function (err, feed) {
    t.error(err, 'whoami')
    t.equals(feed.id, opts.keys.id, 'id')
    t.end()
  })
})

test('client', function (t) {
  createSsbParty(opts, function (err, sbot) {
    t.error(err, 'create ssb party again')
    t.ok(sbot, 'rpc')
    sbot2 = sbot
    sbot.whoami(function (err, feed) {
      t.error(err, 'whoami')
      t.equals(feed.id, opts.keys.id, 'id')
      t.end()
    })
  })
})

test('close first rpc', function (t) {
  sbot1.close(t.end)
})

test('second rpc still works', function (t) {
  sbot2.whoami(function (err, feed) {
    t.error(err, 'whoami')
    t.equals(feed.id, opts.keys.id, 'id')
    t.end()
  })
})

test('stop', function (t) {
  sbot2.control.stop(t.end)
})

test('close second rpc', function (t) {
  sbot2.close(t.end)
})

test('autoclose', function (t) {
  opts.timers.keepalive = 10
  createSsbParty(opts, function (err, sbot) {
    t.error(err, 'create')
    sbot.close(function (err) {
      t.error(err, 'close')
      setTimeout(function () {
        var log = fs.readFileSync(path.join(tmpDir, 'out.log'), 'utf8')
        t.ok(/sbot auto closing/.test(log), 'auto closed')
        t.end()
      }, 5000)
    })
  })
})

test('cleanup', function (t) {
  rimraf.sync(tmpDir)
  t.end()
})

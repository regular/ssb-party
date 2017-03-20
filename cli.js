#!/usr/bin/env node

if (process.argv.length < 3) {
  console.error('usage: ssb-party <module...>')
  process.exit(1)
}

var createSsbParty = require('.')
var path = require('path')

var plugins = process.argv.slice(2).map(function (arg) {
  return require(path.resolve(arg))
})

createSsbParty(function (err, sbot, config) {
  if (err) throw err
  plugins.forEach(function (plugin) {
    plugin.init(sbot, config)
  })
})

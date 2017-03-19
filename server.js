process.once('message', function (config) {
  var createSbot = require('scuttlebot')
    .use(require('scuttlebot/plugins/master'))
    .use(require('./control'))
    .use(require('./autoclose'))

  if (!config.skipPlugins) {
    var plugins = require('scuttlebot/plugins/plugins')
    createSbot = createSbot
      .use(plugins)
      .use(require('scuttlebot/plugins/gossip'))
      .use(require('scuttlebot/plugins/friends'))
      .use(require('scuttlebot/plugins/replicate'))
      .use(require('ssb-blobs'))
      .use(require('scuttlebot/plugins/invite'))
      .use(require('scuttlebot/plugins/block'))
      .use(require('scuttlebot/plugins/local'))
      .use(require('scuttlebot/plugins/logging'))
      .use(require('scuttlebot/plugins/private'))
    plugins.loadUserPlugins(createSbot, config)
  }

  var server = createSbot(config)

  process.send({
    manifest: server.getManifest(),
    address: server.getAddress(),
  })
  process.disconnect()
})

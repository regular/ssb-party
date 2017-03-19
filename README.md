# ssb-party

Get a [scuttlebot][] client instance. If scuttlebot isn't running, start it in the background, and keep it running until all the clients have disconnected.

## Usage

```js
var createSsbParty = require('ssb-party')
```

### `createSsbParty([[keys, ]opts, ]cb)`

optional arguments:

- `keys`: an [ssb-keys][] instance
- `opts.host`: host to connect to or start the server on
- `opts.port`: port to connect to or start the server on
- `opts.appKey`: secret-stack capability key (Buffer)
- `opts.out`: where to put standard output of sbot
- `opts.err`: where to put standard error of sbot

`opts.out` and `opts.err` may be a file descriptor, or `"inherit"` to pass through to the controlling terminal, or `"ignore"` to discard. default is to log to a file, `~/.ssb/out.log`.

Other properties of the `opts` object will be used as [ssb-config][]
overrides, but if the server is already running, the existing server's config
will not be updated.

### Example

simplest case: connect to or start a local sbot:
```
var party = require('ssb-party')

party(function (err, sbot) {
  // ...
})
```

### Config

- `config.timers.keepalive`: minimum time (ms) to keep the server online after the last client disconnects. default: 30s

[scuttlebot]: https://github.com/ssbc/scuttlebot
[ssb-keys]: https://github.com/ssbc/ssb-keys
[ssb-config]: https://github.com/ssbc/ssb-config
[secret-stack]: https://github.com/ssbc/secret-stack

## License

Copyright (c) 2017 [@cel](@f/6sQ6d2CMxRUhLpspgGIulDxDCwYD7DzFzPNr7u5AU=.ed25519)

Usage of the works is permitted provided that this instrument
is retained with the works, so that any entity that uses the
works is notified of this instrument.

DISCLAIMER: THE WORKS ARE WITHOUT WARRANTY.

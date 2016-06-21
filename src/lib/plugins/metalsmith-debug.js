/*
| metalsmith-debug
|
| displays site metadata and page information in the console
|
| @link      https://github.com/craigbuckler/metalsmith-demo
└ */

module.exports = plugin

/**
 * Metalsmith plugin for debug.
 *
 * @param {String or Object} options
 *   @property {Boolean} enabled (optional)
 * @return {Function}
 */

function plugin(opts) {
    'use strict'

    opts = opts || {
        enabled: false
    }

    return function(files, metalsmith, done) {
        if (opts.enabled) {
            console.log('\nMETADATA:')
            console.log(metalsmith.metadata())

            for (var f in files) {
                console.log('\nPAGE:')
                console.log(files[f])
            }
        }
        done()
    }
}

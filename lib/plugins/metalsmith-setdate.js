/*
| metalsmith-setdate
|
| ensures every file has a date set
| adds dateFormat metadata with formatted creation date
|
| @link      https://github.com/craigbuckler/metalsmith-demo
└ */

module.exports = plugin

/**
 * Metalsmith plugin for set date.
 *
 * @return {Function}
 */

function plugin(opts) {
    'use strict'

    opts = opts || {
        enabled: false
    }

    var month = ['January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    return function(files, metalsmith, done) {
        var file

        for (var f in files) {
            file = files[f]

            /* date from date, publish, file creation or now */
            file.date =
                (Date.parse(file.date) && new Date(file.date)) ||
                (Date.parse(file.publish) && new Date(file.publish)) ||
                (file.stats && file.stats.ctime) || new Date()

            /* add a formatted date */
            file.dateFormat =
                file.date.getUTCDate() + ' ' +
                month[file.date.getUTCMonth()] + ' ' +
                file.date.getUTCFullYear()
        }
        done()
    }
}

/*
| Factory - build site with `node ./lib/build.js` or `npm start`
|
|  _____   ____    __ ______   ___   ____   __ __
| |     | /    |  /  ]      | /   \ |    \ |  |  |
| |   __||  o  | /  /|      ||     ||  D  )|  |  |
| |  |_  |     |/  / |_|  |_||  O  ||    / |  ~  |
| |   _] |  _  /   \_  |  |  |     ||    \ |___, |
| |  |   |  |  \     | |  |  |     ||  .  \|     |
| |__|   |__|__|\____| |__|   \___/ |__|\_||____/
|
| This project was released under MIT license.
|
| @link      http://websemantics.ca
| @author    Web Semantics, Inc. Dev Team <team@websemantics.ca>
| @author    Adnan M.Sagar, PhD. <adnan@websemantics.ca>
└ */

'use strict'

var pkg = require('../package.json')
var config = require('../src/config.json')
var env = (process.env.NODE_ENV || '').trim().toLowerCase() || 'development' /* or 'production' */

var _ = require('lodash')
var metalsmith = require('metalsmith')
var markdown = require('metalsmith-markdown')
var publish = require('metalsmith-publish')
var wordcount = require('metalsmith-word-count')
var collections = require('metalsmith-collections')
var permalinks = require('metalsmith-permalinks')
var inplace = require('metalsmith-in-place')
var layouts = require('metalsmith-layouts')
var htmlmin = require('metalsmith-html-minifier')
var setdate = require('./plugins/metalsmith-setdate')
var moremeta = require('./plugins/metalsmith-moremeta')
var debug = require('./plugins/metalsmith-debug')

metalsmith(__dirname + '/..')
    .clean(env === 'production')
    .source(pkg.config.dir.html)
    .destination(pkg.config.dir.dist)
    .metadata(_.merge(config.metadata, config[env]))
    .use(publish())
    .use(setdate())
    .use(collections(config.collections))
    .use(markdown())
    .use(permalinks({
        pattern: ':mainCollection/:title'
    }))
    .use(wordcount({
        raw: true
    }))
    .use(moremeta())
    .use(inplace(config.template))
    .use(layouts(config.template))
    .use(htmlmin())
    .use(debug())
    .build(function(err) {
        if (err) throw err
    })

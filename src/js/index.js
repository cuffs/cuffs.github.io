/*
| This project was released under MIT license.
|
| @link      http://websemantics.ca
| @author    Web Semantics, Inc. Dev Team <team@websemantics.ca>
| @author    Adnan M.Sagar, PhD. <adnan@websemantics.ca>
└ */

window.jQuery = window.$ = require('jquery')
window.Handlebars = require('handlebars')

require('semantic-ui/dist/components/sidebar')
require('semantic-ui/dist/components/sticky')

$(function() {
    function init() {

        $('.toc .ui.sticky').sticky({
            context: $('.pusher > .full.height')
        })

        $('#slider').sidebar('attach events', '.launch.button, .view-ui, .launch.item')
            .sidebar('setting', {
                dimPage: false
            })
    }
    
    init()
})

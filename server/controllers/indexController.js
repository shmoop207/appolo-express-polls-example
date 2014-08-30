"use strict";
var appolo = require('appolo-express');

module.exports = appolo.Controller.define({

    $config: {
        id: 'indexController',
        inject: ['logger', 'env'],
        routes: [
            {
                path: '/',
                method: 'get',
                action: "index"
            }
        ]
    },

    index: function (req, res) {

        this.render();
    }
});
"use strict";

var appolo = require('appolo-express');

module.exports = appolo.Controller.define({
    $config:{
        id:'appolo-bootstrap',
        inject:['logger','env']
    },

    run:function(){

    }
})
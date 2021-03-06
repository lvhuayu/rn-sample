'use strict';

var http = require('../../common/http');
var NZAOM_INTERFACE = require('../../common/interface');
module.exports = {
    create: function(data){
        return http.post(NZAOM_INTERFACE.factory, data)
    },
    get: function(data){
        return http.get(NZAOM_INTERFACE.factory)
    },
    getList: function(data){
        return http.get(NZAOM_INTERFACE.factorys, data)
    }
}
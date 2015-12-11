'use strict';

var NZAOM_API_DOMAIN = 'http://api.nzaom.com';
var NZAOM_DOMAIN = 'http://www.nzaom.com';
var NZAO_MOBILE_DOMAIN = 'http://m.nzaom.com'
var _debug = true; //上线的时候改成false
if (!!_debug) {
    NZAOM_API_DOMAIN = "http://192.168.1.196";
    // NZAOM_API_DOMAIN = "http://192.168.1.109";
    // NZAOM_API_DOMAIN = "http://192.168.1.147";

    NZAO_MOBILE_DOMAIN = 'http://192.168.1.147'
        //NZAOM_API_DOMAIN=NZAOM_DOMAIN;
}
module.exports = {
    verifycode: NZAOM_API_DOMAIN + '/api/verifycode',
    user: NZAOM_API_DOMAIN + '/api/user',
    login: NZAOM_API_DOMAIN + '/api/login',
    token: NZAOM_API_DOMAIN + '/api/token',
    system: NZAOM_API_DOMAIN + '/api/system',
    password: NZAOM_API_DOMAIN + '/api/password',

    workbench: NZAOM_API_DOMAIN + '/api/workbench',

    contacts: NZAOM_API_DOMAIN + '/api/contacts',
    customer: NZAOM_API_DOMAIN + '/api/customer',

    message: NZAOM_API_DOMAIN + '/api/message',

    invite: NZAOM_API_DOMAIN + '/api/invite',

    order: NZAOM_API_DOMAIN + '/api/order',

    updateTaskStatus: NZAOM_API_DOMAIN + '/api/order_job/over',

    task: NZAOM_API_DOMAIN + '/api/order_job',

    news: NZAOM_API_DOMAIN + '/api/dynamic',

    member: NZAOM_API_DOMAIN + '/api/order_job/member',

    accessory: NZAOM_API_DOMAIN + '/api/accessory',

    template: NZAOM_API_DOMAIN + '/api/job_template',

    comment: NZAOM_API_DOMAIN + '/api/rate',

    feedback: NZAOM_API_DOMAIN + '/api/feedback',

    factory: NZAOM_API_DOMAIN + '/api/factory'
}
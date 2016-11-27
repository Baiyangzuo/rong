var path = require('path');
var Alidayu = require('alidayu-sms');
var clientOption = require(path.join(process.env.HOME, 'db/sms'));
var smsOption = {
     'extend' : '' ,
     'sms_type' : 'normal' ,
     'sms_free_sign_name' : '长歌' ,
     'sms_param' : "{name:'username', time: '0点'}" ,
     'rec_num' : '13216969487' ,
     'sms_template_code' : "SMS_27725104"
}
var sms = new Alidayu(clientOption, smsOption);

// PROD
module.exports = function(timeline) {
    return sms.send(18910063857, {
        name: '老王',
        time: timeline || (new Date()).toJSON().slice(11, 16)
    });
}
//
// // DEVP
// module.exports = function(timeline) {
//     return sms.send(13216969487, {
//         name: '叶长歌',
//         time: timeline || (new Date()).toJSON().slice(11, 16)
//     });
// }

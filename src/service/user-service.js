'use strict';
var _mm = require('util/mm.js');

var _user = {
    // 登录
    login : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查用户名是否有效
    checkUserName : function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/check_valid.do'),
            data    : {
                type : 'username',
                str : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 注册
    register : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _user;
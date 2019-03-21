'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateUserUpdate   = require('./user-update.string');

// page 逻辑部分
var userUpdate = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function(){
        let _this = this;
        // 提交表单
        $(document).on('click', '.btn-submit', function(){
            // 获取表单信息
            let userInfo = {
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },
            // 验证结果
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更新个人信息 updateUserInfo
                _user.updateUserInfo(userInfo, function(res){
                    _mm.successTips(res);
                    // 页面跳转到个人中心
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        let userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateUserUpdate, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    // 表单信息验证
    validateForm : function(formData){
        let result = {
            status : false,
            msg : ''
        };
        // 手机号
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 邮箱
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 提示问题
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 答案
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        // 验证通过
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    userUpdate.init();
    console.log('user-update/index.js');
});
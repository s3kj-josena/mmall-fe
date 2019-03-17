'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单错误提示信息
var formError = {
    show : function(errMsg){
        $('.err-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.err-item').hide().find('.err-msg').text('');
    }
};
var login = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        let _this = this;
        // 点击登录按钮
        $('#submit').on('click',function(){
            _this.submit();
        });
        // 按下回车键
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        let _this = this,
        // 缓存表单数据
        formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
        // 验证表单结果
        validateResult = _this.formValidate(formData);
        // 验证通过,跳转页面
        if(validateResult.status){
            _user.login(formData, function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }else{
            // 验证不通过,显示错误提示信息
            formError.show(validateResult.msg);
        }
    },
    // 表单字段验证
    formValidate : function(formData){
        let result = {
            status : false,
            msg : ''
        };
        // 验证用户名是否为空 validate
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空!';
            return result;
        }
        // 验证密码是否为空
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 验证通过
        result.status = true;
        result.msg = '验证通过!';
        return result;   
    },
    // 验证密码方法
};
$(function(){
    login.init();
    console.log('login/index.js');
});
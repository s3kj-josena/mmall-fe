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
var register = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        let _this = this;
        // 用户名输入框失焦事件
        $('#username').blur(function(){
            let username = $.trim($(this).val());
            // 用户名为空,不进行验证
            if(!username){
                return;
            }
            // 验证用户名是否存在 checkUserName
            _user.checkUserName(username, function(res){
                // 用户名有效
                formError.hide();
            }, function(errMsg){
                // 用户名已存在,错误提示信息
                formError.show(errMsg);
            });
        });
        // 点击按钮
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
            password : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val()),
        },
        // 验证表单结果
        validateResult = _this.formValidate(formData);
        // 验证通过,跳转页面
        if(validateResult.status){
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register';
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
            result.msg = '密码不能为空!';
            return result;
        }
        // 验证密码长度是否少于6位
        if(formData.password.length < 6){
            result.msg = '密码长度不能少于6位!';
            return result;
        }
        // 验证两次密码是否一致
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致!';
            return result;
        }
        // 验证手机号码是否为空
        if(!_mm.validate(formData.phone, 'require')){
            result.msg = '手机号码不能为空!';
            return result;
        }
        // 验证手机号格式
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号码格式不正确!';
            return result;
        }
        // 验证邮箱是否为空
        if(!_mm.validate(formData.email, 'require')){
            result.msg = '邮箱不能为空!';
            return result;
        }
        // 验证邮箱格式
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确!';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空!';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空!';
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
    register.init();
    console.log('register/index.js');
});
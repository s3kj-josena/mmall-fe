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
var passReset = {
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 加载第一步输入用户名
        this.loadStepUsername();
    },
    bindEvent : function(){
        let _this = this;
        // 点击第一个"下一步"按钮
        $('#submit-username').click(function(){
            let username = $.trim($('#username').val());
            // 用户名存在
            if(username){
                _user.getQuestion(username, function(res){
                    // 获取用户密码提示问题
                    _this.data.username = username;
                    _this.data.question = res;
                    // 加载第二步
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                // 用户名为空
                formError.show('请输入用户名!');
            }
        });
        // 点击第二个"下一步"按钮
        $('#submit-question').click(function(){
            let answer = $.trim($('#answer').val());
            // 答案存在
            if(answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                }, function(res){
                    // 获取用户密码提示问题答案 token
                    _this.data.answer = answer;
                    _this.data.token = res;
                    // 加载第三步
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                // 答案为空
                formError.show('请输入密码提示问题答案!');
            }
        });
        // 点击第三个"下一步"按钮
        $('#submit-password').click(function(){
            let password = $.trim($('#password').val());
            // 密码不为空且长度不少于6位
            if(password && password.length >= 6){
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken   : _this.data.token
                }, function(res){
                    // 重置密码成功,跳转操作成功提示页面
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                // 新密码为空
                formError.show('请输入不少于6位的新密码!');
            }
        });
    },
    // 加载输入用户名的一步
    loadStepUsername : function(){
        $('.step-username').show();
    },
    // 加载输入密码提示问题答案的一步
    loadStepQuestion : function(){
        // 清除错误提示
        formError.hide();
        // 切换下一步的容器
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 加载输入新密码的一步
    loadStepPassword : function(){
        // 清除错误提示
        formError.hide();
        // 容器切换
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
};
$(function(){
    passReset.init();
    console.log('pass-reset/index.js')
});

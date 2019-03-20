'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _payment        = require('service/payment-service.js');
var templateIndex   = require('./payment.string');

var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init : function(){
        this.onLoad();
    },
    // 加载支付订单列表
    onLoad : function(){
        let _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        // 获取支付信息 getPaymentInfo
        _payment.getPaymentInfo(this.data.orderNumber, function(res){
            // 渲染html
            paymentHtml= _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            // 监听订单状态
            _this.orderStatus();
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    // 监听订单状态
    orderStatus : function(){
        let _this = this;
        // 每5s监听一次
        this.paymentTimer = window.setInterval(function(){
            // 获取订单状态 getPaymentStatus
            _payment.getPaymentStatus(_this.data.orderNumber, function(res){
                // 支付成功,跳转到成功提示页面
                window.location.href = './result.html?type=payment&orderNumber='+_this.data.orderNumber;
            }, function(errMsg){
                $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
            });
        }, 5000);
    }
};
$(function(){
    page.init();
    console.log('payment/index.js');
});
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./order-detail.string');

var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name : 'order-list'
        });
        // 加载订单详情
        this.loadOrderDetail();
    },
    bindEvent : function(){
        let _this = this;
        // 取消订单 cancelOrder
        $(document).on('click', '.order-cancel', function(){
            if(window.confirm('确认要取消该订单吗?')){
                _order.cancelOrder(_this.data.orderNumber, function(res){
                    _mm.successTips('订单号为 : '+_this.data.orderNumber+' 的订单取消成功!');
                    _this.loadOrderDetail();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    // 加载订单详情 getOrderDetail
    loadOrderDetail : function(){
        let _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function(res){
            _this.dataFilter(res);
            // 渲染html
            orderDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg){
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    // order-detail.string 数据适配
    dataFilter : function(data){
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};
$(function(){
    page.init();
    console.log('order-detail/index.js');
});
'use strict';
require('./index.css');
require('page/common/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateList = require('./list.string');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
    
var list = {
    data : {
        listParam : {
            categoryId : _mm.getUrlParam('categoryId')||'',
            keyword : _mm.getUrlParam('keyword')||'',
            pageNum : _mm.getUrlParam('pageNum')||'1',
            pageSize : _mm.getUrlParam('pageSize')||'10',
            orderBy : _mm.getUrlParam('orderBy')||''
        }
    },
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload : function(){
        this.loadList();
    },
    // 点击事件
    bindEvent : function(){
        var _this = this;
        // 排序按钮的点击
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type')==='default'){
                if($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type')==='price'){
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 页面加载
    loadList : function(){
        var $listCon = $('.list-con'),
            listHtml = '',
            _this       = this,
            listParam   = _this.data.listParam;
        $listCon.html('<div class="loading"></div>');

        _product.getProductList(listParam, function(res){
            listHtml = _mm.renderHtml(templateList, {
                list :  res.list
            });
            $listCon.html(listHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    list.init();
}); 

console.log('list/index.js');
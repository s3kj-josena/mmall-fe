'use strict';
require('./index.css');
var _mm = require('util/mm.js');

$(function(){
    let type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    if(type === 'payment'){
        let orderNumber = _mm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    // 显示对应的提示元素
    $element.show();
})
console.log('result/index.js');
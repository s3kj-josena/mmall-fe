'use strict';
require('./index.css');
console.log('header/index.js');

var search = function(){
    // 点击搜索按钮
    $('.search-btn').on('click', function(){
        let keyword = $('.search-input').val();
        window.location = './list.html?keyword='+keyword;
    });
    // 按回车键搜索
    $(document).keyup(function(event){
        if(event.keyCode == 13){
          $('.search-btn').trigger("click");
        }
    });
}
search();
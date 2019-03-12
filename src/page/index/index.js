'use strict';
require('./index.css');
require('../common/index.js');
require('../common/nav/index.js');

console.log('index/index.js');

var getCount = function(){
    var count;
    for(var i=0;i<len;i++){
        if($(dots[i]).hasClass('active')){
            count = i;
            break;
        }
    }
    return count;
}
var banners = $('.banner-img'),
    dots = $('.dot'),
    len=banners.length,
    count = getCount();
var init = function(){
    // 点击事件
    $('.prev').on('click', function(){
        switc(true)
    });
    $('.next').on('click',function(){
        switc(false)
    });
    for(let i=0;i<len;i++){
        $(dots[i]).on('click',function(){
            count = i;
            bannerSwitch(count);
        });
    };
    var switc=function(prev){
        ++count;
        if(prev){
            count+=len-2;
        }
        count%=len;
        bannerSwitch(count);
    }
    var timer;
    // 自动轮播
    var show = function(){
        timer = setInterval(() => {
            switc(false);
        }, 3000);
        return timer;
    }
    var hide=function(){
        clearInterval(timer);
    }
    $('.banner-father').hover(hide,show);
    $('.banner-arrow').hover(hide,show);
    timer=show();
    // 图片轮播
    var bannerSwitch = function(count){
        $('.banner').animate({left: count*(-820)+'px'},1000);
        for(let i=0;i<len;i++){
            $(dots[i]).removeClass('active');
        }
        $(dots[count]).addClass('active');
    };
}
init();




// var renderHtml=function(template,data){
//     let keys=Object.keys(data);

//     keys.forEach(key => {
//         let reg=new RegExp("{{"+key+"}}");
//         template= template.replace(reg,data[key]);
//     });
//     return template;
// }

// var requireString=function(){
//     return "<img src='{{url}}' alt='{{alt}}'></img>"
// }

// let data={
//     url:"https://github.com/s3kj-mwy/Notes/blob/images/src/workflow/Add-SSH-Key.jpg?raw=true",
//     alt:"图片"
// }
// let template=requireString()

// let img=renderHtml(template,data)

// $('.banner').html(img);
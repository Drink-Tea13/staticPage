//顶部搜索框获取焦点或者失去焦点时变色
$('.header_search').find('input').focus(function () {
    $(this).css({
        backgroundColor: "white"
    })
}).blur(function () {
    $(this).css({
        backgroundColor: "#2c2c2c"
    })
})


// 轮播图
var banner = $('.banner');
var imgList = banner.find('img');
var next = $('#banner_next');
var prev = $('#banner_prev');
var dotList = $('.banner_dot').find('li');
var x = 0;
var index = 0;
var flag = true;
var arr = ["#e1d0b6", "#475e7e", "#f2efea", "#8bc6b2", "#d4d4d4"];
imgList.each(function (i) {
    $(this).css({
        backgroundColor: arr[i]
    })
})
// 轮播图初始化
$('.banner').find('img').eq(0).css({
    left: 0,
});
// 下一张
function nextFn() {
    if (flag) {
        flag = false;
        x++;
        if (x > imgList.length - 1) {
            x = 0;
        };
        imgList.eq(x).css({
            left: 1920
        });
        imgList.eq(index).animate({
            left: -1920
        }, 300);
        // 恢复小圆点背景色
        dotList.eq(index).css({
            backgroundColor: "rgba(232,231,224,0.4)"
        });
        imgList.eq(x).animate({
            left: 0
        }, 300, function () {
            flag = true;
        });
        // 显示当前小圆点背景色
        dotList.eq(x).css({
            backgroundColor: "white"
        });
        index = x;
    };
};
// 上一张
function prevFn() {
    if (flag) {
        flag = false;
        x--;
        if (x < 0) {
            x = imgList.length - 1;
        };
        imgList.eq(x).css({
            left: -1920
        });
        // 恢复小圆点背景色
        dotList.eq(index).css({
            backgroundColor: "rgba(232,231,224,0.4)"
        });
        imgList.eq(index).animate({
            left: 1920
        }, 300);
        imgList.eq(x).animate({
            left: 0
        }, 300, function () {
            flag = true;
        });
        // 设置当前小圆点背景色
        dotList.eq(x).css({
            backgroundColor: "white"
        });
        index = x;
    };
};

next.click(nextFn);
prev.click(prevFn);
// 设置轮播图自动播放
var timer = setInterval(nextFn, 3000);
// 当鼠标放上时清除自动播放
banner.mouseenter(function () {
    clearInterval(timer);
    console.log(1)
});
// 鼠标离开时重新自动播放
banner.mouseleave(function () {
    timer = setInterval(nextFn, 3000);
});
// 底部小圆点控制图片切换
// 初始化
dotList.eq(0).css({
    backgroundColor: "white"
})
dotList.mouseover(function () {
    if (flag) {
        flag = false;
        index = $(this).index();
        // 鼠标经过背景色变化
        dotList.eq(index).css({
            backgroundColor: "white"
        });
        if (index > x) {
            imgList.eq(index).css({
                left: 1920
            });
            imgList.eq(x).animate({
                left: -1920
            }, 200);
            // 恢复背景色
            dotList.eq(x).css({
                backgroundColor: "rgba(232,231,224,0.4)"
            });
            imgList.eq(index).animate({
                left: 0
            }, 200, function () {
                flag = true;
            });
            x = index;
        } else if (index < x) {
            imgList.eq(index).css({
                left: -1920
            });
            imgList.eq(x).animate({
                left: 1920
            }, 200);
            // 恢复背景色
            dotList.eq(x).css({
                backgroundColor: "rgba(232,231,224,0.4)"
            });
            imgList.eq(index).animate({
                left: 0
            }, 200, function () {
                flag = true;
            });
            x = index;
        } else {
            flag = true;
        };
    };
});



//主体中部

for (var i = 0; i < cont["data"].length; i++) {
    $('<li></li>').appendTo($('.content'))
};
$('.content').find('li').each(function (i) {
    // 给每个li添加类名
    $(this).addClass('con_body');
    // 插入标题
    $('<span></span>').html(cont["data"][i]["title"]).addClass('con_body_title').appendTo($(this));
    // 插入案例
    $('<span>案例</span>').addClass('con_body_title2').appendTo($(this));
    // 插入段落描述
    $('<p></p>').html(cont["data"][i]["description"]).addClass('con_body_txt').appendTo($(this));
    // 插入左边大图
    $('<img>').attr('data-original', cont["data"][i]["h_cover_images"][0]).addClass('con_body_img').appendTo($(this));
    // 插入右边三张小图
    $('<div></div>').addClass('con_body_img2').each(function () {
        $('<img>').attr('data-original', cont["data"][i]["h_cover_images"][1]).appendTo($(this));
        $('<img>').attr('data-original', cont["data"][i]["h_cover_images"][2]).appendTo($(this));
        $('<img>').attr('data-original', cont["data"][i]["h_cover_images"][3]).appendTo($(this));
    }).appendTo($(this));
    // 插入小图标
    $('<a></a>').addClass('con_body_bot_txt').each(function () {
        $('<img>').attr('src', cont["data"][i]["h_user_avatar"]).appendTo($(this));
        $('<span></span>').html(cont["data"][i]["h_show_name"]).css({
            cursor: 'pointer'
        }).appendTo($(this));
    }).appendTo($(this));
    // 插入点赞数量
    $('<span></span>').addClass('con_body_bot_num').html(cont["data"][i]["views"]).appendTo($(this));
});
// 中部图片懒加载
$('img').lazyload({
    effect: 'fadeIn',
    threshold: -100
});

// 返回顶部按钮隐藏显示 

$(window).scroll(function () {
    var st = $('body').scrollTop() || $('html').scrollTop();
    if (st > 300) {
        $('.backTop').show()
    } else {
        $('.backTop').hide()
    }
});
// 点击返回顶部
$('.backTop').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 300)
});

// 达人榜单
; (function () {

    $(window).scroll(function () {
        var st = $('body').scrollTop() || $('html').scrollTop();
        var h = $('.con_rank_box').offset().top;
        if (h <= st) {
            $('.con_rank').css({
                position: "fixed",
                top: 0
            })
        } else {
            $('.con_rank').css({
                position: "static",
            })
        }
    })
})();




$(function () {
    //导航栏 鼠标经过 a时显示item
    showItem();
    //banner
    $(".banner .slick").slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 7000,
        arrows: false,
    });
    //翻页
    changePage();
    //main_3 轮播图
    $('.main_3 .slick').slick({
        dots: false,
        autoplay: true,
        autoplaySpeed: 7000,
        accessibility: false,
        arrows: false
    });
    //main_4轮播图
    $('.main_4 .slick').slick({
        dots: false,
        autoplay: true,
        autoplaySpeed: 7000,
        accessibility: false,
        arrows: false
    });
    //main_6 轮播图
    $('.main_6 .slick').slick({
        dots: false,
        autoplay: true,
        autoplaySpeed: 7000,
        accessibility: false,
        arrows: false
    });


    //显示和隐藏动画
    $('.body_main').scroll(function () {
        //可视窗口页面高度
        var w_h = $(window).height();

        //main_2 部分动画
        // 元素的offsetTop高度
        var main2_h = $('.main_2').offset().top;
        //要变化的元素
        var main2_ele = $('.main_2 .item');

        if (2 * (w_h - main2_h) > w_h) {
            for (let i = 0; i < main2_ele.length; i++) {
                $(main2_ele[i]).addClass('showdiv');
            }
        } else {
            for (let i = 0; i < main2_ele.length; i++) {
                $(main2_ele[i]).removeClass('showdiv');
            }
        }
    });
});


//导航栏 鼠标经过 a时显示item
const showItem = () => {
    let nav_as = $('.nav_main a');
    let nav_items = $('.nav_child .item');
    for (let i = 0; i < nav_as.length; i++) {
        $(nav_as[i]).attr('index', i);
        $(nav_items[i]).attr('index', i);
        //鼠标进入 显示
        $(nav_as[i]).on('mouseover', function () {
            $(nav_items[$(this).attr('index')]).css({ 'opacity': 1, 'visibility': 'visible' });
        });
        $(nav_items[i]).on('mouseover', function () {
            $(this).css({ 'opacity': 1, 'visibility': 'visible' });
        });
        //鼠标离开，隐藏
        $(nav_as[i]).on('mouseleave', function () {
            let that = $(this);
            $(nav_items[that.attr('index')]).css({ 'opacity': 0, 'visibility': 'hidden' });
        });
        $(nav_items[i]).on('mouseleave', function () {
            let that = $(this);
            that.css({ 'opacity': 0, 'visibility': 'hidden' });
        });
    }
};
// 翻页函数
const changePage = () => {
    //获取两个页面
    let home = document.querySelector('.body_home');
    let main = document.querySelector('.body_main');
    //获取header
    let home_header = document.querySelector('.body_home header');
    let main_header = document.querySelector('.body_main header');
    //获取顶部body_main中的 d1
    let main_d1 = document.querySelector('.body_main .d1');
    //鼠标在 body_home时 鼠标向下滑动；
    home.onmousewheel = function (event) {
        //翻页
        if (event.deltaY > 0) {
            //调整位置
            if (document.body.clientWidth >= 850) {
                main.style.top = "0";
            }
            return;
        }
    };
    //鼠标在 body_main时 ；
    main.onmousewheel = function (event) {
        //翻页
        if (this.scrollTop == 0 && event.deltaY < 0) {
            if (document.body.clientWidth >= 850) {
                main.style.top = "100%";
            }
            home_header.style.top = '0%';
            //设置透明度
            home_header.style.opacity = '1';
            return;
        }
        //向下滑动
        if (event.deltaY > 0 && document.body.clientWidth >= 850) {
            return;
        }
        //向上滑动
        if (event.deltaY < 0 && document.body.clientWidth >= 850) {
            return;
        }
    };
};

// 顶部导航栏
function menubar() {
    const menu = document.querySelector('.menu');
    const nav_child = document.querySelector('.nav_child');
    const nav_tools = document.querySelector('.nav_tools');
    const closeBtn = document.querySelector('.nav_child .close');
    menu.addEventListener('click', function () {
        nav_child.classList.remove('hide');
        nav_tools.classList.add('hide');
    })
    closeBtn.addEventListener('click', function () {
        nav_child.classList.add('slideUp');
        // 等待
        setTimeout(function () {
            nav_child.classList.add('hide');
            nav_tools.classList.remove('hide');
            nav_child.classList.remove('slideUp');
        }, 500);
    })
}
function topics() {
    const topicsItems = document.querySelectorAll('.main_2 .item');
    for (let i = 0; i < topicsItems.length; i++) {
        topicsItems[i].addEventListener('click', function () {
            const jumpUrl = this.querySelector('a').getAttribute('href');
            window.location.href = jumpUrl;
        })
    }
}
var userLocation = '山东';
var hotSchoolType = 'bk';
function loadHotSchool(userLocation, hotSchoolType) {
    const school_listLoading = document.querySelector('.school_listLoading');
    school_listLoading.classList.remove('hide');
    fetch('/api/hotSchool', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "userLocation": userLocation, "hotSchoolType": hotSchoolType })
    }).then(function (res) {
        return res.json();
    }).then(function (data) {
        const hotSchoolList = document.getElementById('hotSchoolList');
        hotSchoolList.innerHTML = '';
        const firstItem = data.hotSchool.shift();
        document.querySelector('.list_left').href = "/school-" + firstItem[2];
        document.querySelector('.div_h1 p').innerHTML = firstItem[0];
        document.querySelector('.school_moreInfo').innerHTML = `
                <span class="span_border">${firstItem[3]}</span>
                <span class="span_border">${firstItem[4]}</span>`;
        document.querySelector('.left_img img').src = `data:image/png;base64,${firstItem[1]}`;

        data.hotSchool.forEach(function (item) {
            const hotSchool = `
            <div class="school_msg">
                <div>
                    <img src="data:image/png;base64,${item[1]}" alt="" class="right_img">
                </div>
                <div class="wenzi">
                    <p>${item[0]}</p>
                    <span class="right_span_border">${item[3]}</span>
                    <span><a href="/school-${item[2]}">查看院校 &gt;</a></span>
                </div>
            </div>
            `;
            hotSchoolList.innerHTML += hotSchool;
            school_listLoading.classList.add('hide');
        })
    })
}
function getUserLocation() {
    fetch('/api/userLocation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (res) {
            // 解析JSON响应
            return res.json();
        })
        .then(function (data) {
            // 处理响应数据
            try {
                userLocation = data.location
                if (userLocation = '本机') {
                    var userLocation = '山东省';
                }
                var userLocation = userLocation.split('省')[0];
            } catch (e) { }
            const hschool_location = document.querySelectorAll('.hschool_location');
            hschool_location.forEach(function (item) {
                item.innerHTML = userLocation;
            })
            document.querySelector(".title_choicesList option:nth-child(1)").innerHTML = userLocation + '本科院校';
            document.querySelector(".title_choicesList option:nth-child(2)").innerHTML = userLocation + '专科院校';
            loadHotSchool(userLocation, hotSchoolType);
        })
}
function hotSchoolSwitch(event) {
    document.querySelectorAll('.hschool_switch p').forEach(function (item) {
        item.classList.remove('active');
    })
    event.target.classList.add('active');
    hotSchoolType = event.target.id
    document.querySelector('.title_choicesList').value = hotSchoolType;
    loadHotSchool(userLocation, hotSchoolType);
}
function hotSchoolReload() {
    loadHotSchool(userLocation, hotSchoolType);
}
function AutoList() {
    const selectElement = document.querySelector('.title_choicesList');
    selectElement.addEventListener('change', function () {
        hotSchoolType = selectElement.value;
        document.querySelectorAll('.hschool_switch p').forEach(function (item) {
            item.classList.remove('active');
        })
        document.getElementById(selectElement.value).classList.add('active');
        loadHotSchool(userLocation, hotSchoolType);
    });
}
window.onload = function () {
    getUserLocation();
    menubar();
    topics();
    AutoList();
}
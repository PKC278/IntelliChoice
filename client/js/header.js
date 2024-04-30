// 保存登录前的页面URL到sessionStorage
function savePreviousPage() {
    var previousPage = window.location.href;
    sessionStorage.setItem('previousPage', previousPage);
}
function checkLogin(callback) {
    // 检查token是否过期
    if (document.cookie.indexOf('token') !== -1) {
        // 获取cookie中的token
        var token = document.cookie.split(';')[0].split('=')[1];
        // 发送请求
        fetch('/api/user/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "token": token }),
        }).then(response => {
            // 检查响应是否成功
            if (!response.ok) {
                throw new Error('请求失败');
            }
            // 解析响应数据为JSON格式并返回一个新的Promise对象
            return response.json();
        }).then(data => {
            let status = data.status;
            if (status == '0') {
                // 清除cookie
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                // 刷新页面
                window.location.reload();
            } else {
                userName = data.userName;
                // 绑定登陆按钮
                const login_button = document.getElementById('UserDiv');
                // 将userName转换为中文
                if (isTextMatchingPattern(userName)) {
                    var userName = convertOctalToUTF8(userName);
                }
                // 如果超出3位字符，则截断
                if (userName.length > 3) {
                    userName = userName.slice(0, 3) + '...';
                }
                // 写入用户名
                login_button.innerHTML = `
                    <div class="container btn">
                        <div class="user-profile">
                            <img src="images/user.png" alt="User Avatar">
                            <span class="user-name">${userName}</span>
                            <button class="logout-button">
                            <svg t="1688185425012" class="logout_img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1482" width="25" height="25"><path d="M448 480A224 224 0 1 1 672 256 224 224 0 0 1 448 480z m0-384A160 160 0 1 0 608 256 160 160 0 0 0 448 96z" fill="#ffffff" p-id="1483"></path><path d="M704 960H64a32.64 32.64 0 0 1-32-30.08V896C32 631.04 218.88 416 448 416a384 384 0 0 1 289.92 135.68 32 32 0 0 1 0 44.8 32 32 0 0 1-45.44 0A320 320 0 0 0 448 480c-192 0-352 186.88-352 416H704a32 32 0 0 1 0 64zM832 928a30.08 30.08 0 0 1-22.4-9.6 30.72 30.72 0 0 1 0-44.8L914.56 768l-104.96-105.6a31.36 31.36 0 0 1 44.8-44.8l128 128a30.72 30.72 0 0 1 0 44.8l-128 128a30.08 30.08 0 0 1-22.4 9.6z" fill="#ffffff" p-id="1484"></path><path d="M960 800H576a32 32 0 0 1 0-64h384a32 32 0 0 1 0 64z" fill="#ffffff" p-id="1485"></path></svg>
                            </button>
                        </div>
                    </div>
                    `;
                callback();
            }
        }).catch(error => {
            // 清除cookie
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            // 刷新页面
            window.location.reload();
            callback();
        });
    } else {
        callback();
    }
}

function convertOctalToUTF8(octalString) {
    const octalValues = octalString.split("\\").slice(1);
    const decimalValues = octalValues.map(octal => parseInt(octal, 8));
    const utf8Bytes = new Uint8Array(decimalValues);
    const utf8Decoder = new TextDecoder("utf-8");
    const utf8 = utf8Decoder.decode(utf8Bytes);
    return utf8;
}
// 检测是否为八进制
function isTextMatchingPattern(text) {
    const pattern = /\\[0-7]{3}/;
    return pattern.test(text);
}

function changePage(url) {
    // 找到id是navbar中class有active的元素
    const navbar = document.getElementById('navbar');
    const active = navbar.querySelector('.active');
    // 设置为页面标题
    if (window.location.href.indexOf('school-') !== -1) {
        document.title = "志愿智能—院校详情";
    }
    else if (window.location.href.indexOf('detail-') !== -1) {
        document.title = "志愿智能—专业详情";
    }
    else if (window.location.href.indexOf('major?') !== -1) {
        document.title = "志愿智能—专业查询";
    }
    else {
        document.title = "志愿智能—" + active.textContent.trim();
    }
    var route_id1 = url.split('/').pop();
    if (route_id1 === 'chat.html') {
        const navbar = document.querySelector('.navbar');
        navbar.classList.remove('bg-white');
        let container_fluid = document.querySelector('.container-fluid');
        // 添加background-color: white
        container_fluid.classList.remove('bg-white');
    }
    else {
        const navbar = document.querySelector('.navbar');
        navbar.classList.add('bg-white');
    }
    // 清理当前页面中的 <script> 元素
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        var src = script.getAttribute('src');
        if (src && (src === 'js/bootstrap.bundle.min.js')) {
            continue; // 忽略指定的 <script> 标签
        }
        script.parentNode.removeChild(script);
    }
    if (window.location.href.indexOf('detail-') !== -1) {
        let script = document.createElement('script');
        script.src = 'js/echarts/echarts.min.js';
        document.body.appendChild(script);
    }
    // 关闭下拉菜单
    const nav_item = document.querySelectorAll('.nav-item');
    nav_item.forEach(nav_item => {
        // 检测是否点击
        nav_item.addEventListener('click', () => {
            // 检测是否展开
            let dropdown = document.querySelector('.navbar-collapse');
            if (dropdown.classList.contains('show')) {
                document.getElementById('closeNavbar').click();
            }
        });
    });
    const loadingAnimation = `
    <div class="loading_container loading_div">
        <div class="loading"><i></i><i></i><i></i><i></i></div>
    </div>
    `;
    document.getElementById('loadingDiv').innerHTML = loadingAnimation;
    document.getElementById('main').innerHTML = "";
    // 加载新页面的内容
    fetch(url)
        .then(response => {
            if (response.status === 404) {
                // 跳转到404页面
                window.location.href = '/404';

            } else {
                return response.text();
            }
        })
        .then(html => {
            // 在页面中替换新内容
            document.getElementById('main').innerHTML = html;

            var regex = /^(https?:\/\/[^/]+\/).*$/;
            var baseUrl = window.location.href.match(regex)[1];

            // 获取新页面中的 <script> 标签
            var scripts = document.getElementById('main').getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
                var script = document.createElement('script');
                if (scripts[i].src) {
                    let whitelist1 = baseUrl + 'js/bootstrap.bundle.min.js';
                    // 如果 <script> 标签有 src 属性，则设置新的 script 元素的 src 属性
                    if (scripts[i].src === whitelist1) {
                        continue; // 忽略指定的 <script> 标签
                    }
                    script.src = scripts[i].src;
                    // 检查是否有重复的 script 元素，有则删除重复的一个
                    var existingScript = document.querySelector('script[src="' + script.src + '"]');
                    if (existingScript) {
                        existingScript.parentNode.removeChild(existingScript);
                    }
                } else {
                    // 如果 <script> 标签没有 src 属性，则将其内部的 JavaScript 代码设置给新的 script 元素
                    script.textContent = scripts[i].textContent;
                }
                // 将新的 script 元素添加到页面中
                document.body.appendChild(script);
            };
        })
        .catch(error => console.error(error));
};

window.onload = () => {
    const dropdownButton = document.querySelector('.navbar-toggler');
    dropdownButton.addEventListener('click', () => {
        // 检查dropdownButton是否有collapsed类
        if (dropdownButton.classList.contains('collapsed')) {
            let navbar = document.querySelector('.navbar');
            let route_id = window.location.href.split('/').pop();
            if (route_id === 'chat') {
                navbar.classList.remove('bg-white');
                let container_fluid = document.querySelector('.container-fluid');
                // 添加background-color: white
                container_fluid.classList.remove('bg-white');
            }
        } else {
            // 绑定navbar-light
            let navbar = document.querySelector('.navbar');
            navbar.classList.add('bg-white');
            let container_fluid = document.querySelector('.container-fluid');
            // 添加background-color: white
            container_fluid.classList.add('bg-white');
        }
    });
    // 检查cookie
    if (document.cookie.indexOf('token') !== -1) {
        // 获取cookie中的token和userName
        checkLogin(function () {
            // 绑定登出按钮
            try {
                const logout_button = document.querySelector('.logout-button');
                logout_button.addEventListener('click', function (event) {
                    event.preventDefault();
                    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    window.location.reload();
                });
            } catch (error) {
                console.log(error);
            }
        });
    }


    // 获取导航按钮
    const nav_button = document.querySelectorAll('.navButton');
    nav_button.forEach(nav_button => {
        nav_button.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认的链接跳转行为

            var route_id = nav_button.getAttribute('href'); // 获取按钮的链接URL
            var url = 'pages/' + route_id + '.html';
            var route_btn = document.getElementById(route_id);
            try {
                var b_active = document.querySelectorAll('.b-active');
                b_active.forEach(b_active => {
                    b_active.classList.remove('active', 'show', 'b-active');
                });
                var navButton2 = document.querySelectorAll('.navButton2');
                navButton2.forEach(navButton2 => {
                    navButton2.classList.remove('active');
                });
            } catch (error) {
            }
            route_btn.classList.add('active', 'show', 'b-active');
            changePage(url);

            // 获取新页面标题
            var title = "志愿智能—" + nav_button.textContent.trim();
            // 更新页面标题
            document.title = title;

            // 使用History API将新的URL添加到浏览器历史记录中
            history.pushState(null, title, route_id);
        });
    });


    // 页面加载完成后执行一次
    const login_button = document.getElementById('UserDiv').querySelector('a');
    login_button.addEventListener('click', function (event) {
        savePreviousPage();
        // 检测屏幕尺寸
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        // 根据屏幕宽度决定跳转的URL
        var url = screenWidth < 767 ? '/login?wap=true' : '/login';
        window.location.href = url;
    })
    try {
        var route_id = window.location.href.split('/').pop(); // 获取URL中的路由ID
        // 如果route_id为空
        if (route_id === '') {
            route_id = 'index';
        }
        var url = 'pages/' + route_id + '.html';
    } catch (error) {
        var route_id = 'index';
        var url = '/pages/index.html';
    }
    if (route_id === 'login' || route_id === 'register') {
        let btn = document.getElementById(route_id);
        btn.classList.add('active');
    }
    else {
        try {
            var route_btn = document.getElementById(route_id);
            route_btn.classList.add('active', 'show', 'b-active');
        } catch (error) { }
    }
    // 检查url中路径是否包含school-
    if (window.location.href.indexOf('school-') !== -1) {
        changePage('/pages/SchoolDetails.html');
    }
    else if (window.location.href.indexOf('detail-') !== -1) {
        changePage('/pages/MajorDetail.html');
    } else if (window.location.href.indexOf('major?') !== -1) {
        changePage('/pages/major.html');
    }
    else {
        changePage(url);
    }
};

window.onpopstate = function (event) {
    // 获取上一个页面的URL
    var url = document.location.href;
    if (url.indexOf('school-') !== -1) {
        changePage('/pages/SchoolDetails.html');
    }
    else if (url.indexOf('detail-') !== -1) {
        changePage('/pages/MajorDetail.html');
    } else {
        var route_id = url.split('/').pop(); // 获取URL中的路由ID
        if (route_id === '') {
            route_id = 'index';
        }
        url = 'pages/' + route_id + '.html';
        changePage(url);
        var route_btn = document.getElementById(route_id);
        try {
            var b_active = document.querySelectorAll('.b-active');
            b_active.forEach(b_active => {
                b_active.classList.remove('active', 'show', 'b-active');
            });
            var navButton2 = document.querySelectorAll('.navButton2');
            navButton2.forEach(navButton2 => {
                navButton2.classList.remove('active');
            });
        } catch (error) {
        }
        route_btn.classList.add('active', 'show', 'b-active');
    }

    try {
        var b_active = document.querySelectorAll('.b-active');
        b_active.forEach(b_active => {
            b_active.classList.remove('active', 'show', 'b-active');
        });
        var navButton2 = document.querySelectorAll('.navButton2');
        navButton2.forEach(navButton2 => {
            navButton2.classList.remove('active');
        });
    } catch (error) {
    }
};

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});
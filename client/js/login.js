// 获取并清除保存的页面URL
function getPreviousPage() {
    var previousPage = sessionStorage.getItem('previousPage');
    sessionStorage.removeItem('previousPage');
    return previousPage;
}

// 登录成功后跳转回登录前的页面
function redirectToPreviousPage() {
    var previousPage = getPreviousPage();
    if (previousPage) {
        window.location.href = previousPage;
    } else {
        // 如果没有保存的页面URL，则跳转到默认页面
        window.location.href = 'index';
    }
}

let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {

    switchCtn.classList.add("is-gx");
    setTimeout(function () {
        switchCtn.classList.remove("is-gx");
    }, 1500)

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
}

let mainF = (e) => {
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons);
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
    const form__link = document.querySelector('.form__link');
    form__link.addEventListener('click', () => {
        alert("请联系网站管理员");
    })
}

window.addEventListener("load", mainF);


function main() {
    // 绑定提交按钮
    const register_submitButton = document.getElementById('register_submit');
    // 绑定用户名输入框
    const register_usernameInput = document.getElementById('register_username');
    // 绑定邮箱输入框
    const register_emailInput = document.getElementById('register_email');
    // 绑定密码输入框
    const register_passwordInput = document.getElementById('register_password');
    // 如果用户名有内容，就移除警告
    register_usernameInput.addEventListener('input', () => {
        // 获取用户名
        const register_username = register_usernameInput.value;
        if (register_username !== '') {
            // 移除属性
            register_usernameInput.setAttribute('placeholder', '用户名');
            // 移除类
            register_usernameInput.classList.remove('waring');
        }
    });
    // 如果邮箱有内容，就移除警告
    register_emailInput.addEventListener('input', () => {
        // 获取邮箱
        const register_email = register_emailInput.value;
        if (register_email !== '') {
            // 移除属性
            register_emailInput.setAttribute('placeholder', '邮箱 测试账号admin');
            // 移除类
            register_emailInput.classList.remove('waring');
        }
    });
    // 如果密码有内容，就移除警告
    register_passwordInput.addEventListener('input', () => {
        // 获取密码
        const register_password = register_passwordInput.value;
        if (register_password !== '') {
            // 移除属性
            register_passwordInput.setAttribute('placeholder', '密码 测试密码admin');
            // 移除类
            register_passwordInput.classList.remove('waring');
        }
    });

    register_submitButton.addEventListener('click', () => {
        // 获取用户名
        const register_username = register_usernameInput.value;
        // 获取邮箱
        const register_email = register_emailInput.value;
        // 获取密码
        const register_password = register_passwordInput.value;
        // 不能为空
        if (register_username === '') {
            // 添加属性
            register_usernameInput.setAttribute('placeholder', '用户名不能为空');
            // 添加类
            register_usernameInput.classList.add('waring');
            return;
        }
        // 不能为空
        if (register_email === '') {
            // 添加属性
            register_emailInput.setAttribute('placeholder', '邮箱不能为空');
            // 添加类
            register_emailInput.classList.add('waring');
            return;
        }
        // 不能为空
        if (register_password === '') {
            // 添加属性
            register_passwordInput.setAttribute('placeholder', '密码不能为空');
            // 添加类
            register_passwordInput.classList.add('waring');
            return;
        }

        // 发送请求
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ "register_username": register_username, "register_email": register_email, "register_password": register_password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // 检查响应是否成功
                if (!response.ok) {
                    throw new Error('请求失败');
                }
                return response.json();
            })
            .then(data => {
                // 获取data中status的值
                const status = data.status;
                if (status === '1') {
                    // 注册成功
                    // 刷新
                    window.location.reload();
                } else {
                    // 登录失败
                }
            })
            .catch(error => {
                // 处理错误
                console.error('请求出错:', error);
            });
    });
    // 绑定提交按钮
    const login_submitButton = document.getElementById('login_submit');
    // 绑定邮箱输入框
    const login_emailInput = document.getElementById('login_email');
    // 绑定密码输入框
    const login_passwordInput = document.getElementById('login_password');
    // 如果邮箱有内容，就移除警告
    login_emailInput.addEventListener('input', () => {
        // 获取邮箱
        const login_email = login_emailInput.value;
        if (login_email !== '') {
            // 移除属性
            login_emailInput.setAttribute('placeholder', '邮箱 测试账号admin');
            // 移除类
            login_emailInput.classList.remove('waring');
            const form__link = document.querySelector('.form__link');
            form__link.classList.remove('form__linkWaring');
            form__link.innerHTML = '忘记密码？';
        }
    });
    // 如果密码有内容，就移除警告
    login_passwordInput.addEventListener('input', () => {
        // 获取密码
        const login_password = login_passwordInput.value;
        if (login_password !== '') {
            // 移除属性
            login_passwordInput.setAttribute('placeholder', '密码 测试密码admin');
            // 移除类
            login_passwordInput.classList.remove('waring');
            const form__link = document.querySelector('.form__link');
            form__link.classList.remove('waring');
        }
    });

    login_submitButton.addEventListener('click', () => {
        // 获取邮箱
        const login_email = login_emailInput.value;
        // 获取密码
        const login_password = login_passwordInput.value;

        // 不能为空
        if (login_email === '') {
            // 设置属性
            login_emailInput.setAttribute('placeholder', '邮箱不能为空');
            // 添加类
            login_emailInput.classList.add('waring');
            return;
        }
        if (login_password === '') {
            // 设置属性
            login_passwordInput.setAttribute('placeholder', '密码不能为空');
            // 添加类
            login_passwordInput.classList.add('waring');
            return;
        }
        // 发送请求
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ "login_email": login_email, "login_password": login_password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // 检查响应是否成功
                if (!response.ok) {
                    throw new Error('请求失败');
                }
                return response.json();
            })
            .then(data => {
                // 获取data中status的值
                const status = data.status;
                if (status === '1') {
                    // 登录成功
                    redirectToPreviousPage();
                } else {
                    // 登录失败
                    login_emailInput.setAttribute('placeholder', '邮箱或密码错误');
                    login_emailInput.classList.add('waring');
                    // 设置属性
                    login_passwordInput.setAttribute('placeholder', '邮箱或密码错误');
                    login_passwordInput.classList.add('waring');
                    const form__link = document.querySelector('.form__link');
                    form__link.classList.add('form__linkWaring');
                    // 修改文本
                    form__link.innerHTML = '邮箱或密码错误！忘记密码？';
                }
            })
            .catch(error => {
                // 处理错误
                console.error('请求出错:', error);
                login_emailInput.classList.add('waring');
                login_passwordInput.classList.add('waring');
                const form__link = document.querySelector('.form__link');
                form__link.classList.add('form__linkWaring');
                form__link.innerHTML = '邮箱或密码错误！忘记密码？';
            });
    });
}
try {
    main();
} catch (e) {
    window.onload = main;
}

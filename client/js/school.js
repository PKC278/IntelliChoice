var worker = new Worker('js/getSchool_load.js');
var searchText = "";
var loading_animation = `<div class="col-md-6 mb-4 schoolLoading_container">
        <div class="card" style="overflow: hidden;">
            <div class="loading_animation"></div>
            <div class="card-body">
                <span class="img-load"></span>
                <div class="info">
                    <h5 class="card-title title-load"></h5>
                    <div class="rounded-rectangle manyidu">
                        <span class="manyidu-info">满意度</span>
                        <div class="star">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 512 512">
                                <!-- Original SVG path -->
                                <path
                                    d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                                    fill="#e9e9e9" style="--darkreader-inline-fill: #dad7d2;"
                                    data-darkreader-inline-fill=""></path>
                                <!-- Filled SVG path with the clip-path applied -->
                                <path style="fill: gold;clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);-webkit-clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);"
                                    d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z">
                                </path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 512 512">
                                <!-- Original SVG path -->
                                <path
                                    d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                                    fill="#e9e9e9" style="--darkreader-inline-fill: #dad7d2;"
                                    data-darkreader-inline-fill=""></path>
                                <!-- Filled SVG path with the clip-path applied -->
                                <path style="fill: gold;clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);-webkit-clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);"
                                    d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z">
                                </path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 512 512">
                                <!-- Original SVG path -->
                                <path
                                    d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                                    fill="#e9e9e9" style="--darkreader-inline-fill: #dad7d2;"
                                    data-darkreader-inline-fill=""></path>
                                <!-- Filled SVG path with the clip-path applied -->
                                <path style="fill: gold;clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);-webkit-clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);"
                                    d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z">
                                </path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 512 512">
                                <!-- Original SVG path -->
                                <path
                                    d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                                    fill="#e9e9e9" style="--darkreader-inline-fill: #dad7d2;"
                                    data-darkreader-inline-fill=""></path>
                                <!-- Filled SVG path with the clip-path applied -->
                                <path style="fill: gold;clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);-webkit-clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);"
                                    d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z">
                                </path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 512 512">
                                <!-- Original SVG path -->
                                <path
                                    d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                                    fill="#e9e9e9" style="--darkreader-inline-fill: #dad7d2;"
                                    data-darkreader-inline-fill=""></path>
                                <!-- Filled SVG path with the clip-path applied -->
                                <path style="fill: gold;clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);-webkit-clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);"
                                    d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z">
                                </path>
                            </svg>
                        </div>
                        <span class="manyidu-score">-.-</span>
                    </div>
                    <div class="card-text">
                        <div class="secend-load"></div><br>
                        <div class="thired-load"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

var Loading_container = "";
for (let i = 0; i < 16; i++) {
    Loading_container += `${loading_animation}`;
}
// 检查span点击事件
function checkAddressClick() {
    const spans = document.querySelectorAll('.item-box .item-options span');
    spans.forEach(span => {
        span.addEventListener('click', () => {
            page = 1;
            // 获取上一级元素的class
            const parentClass = span.parentElement.parentElement.className.replace('item-box row ', '');
            // 绑定class是parentClass的元素
            const selected_div = document.querySelectorAll(`.${parentClass}`);
            // 获取selected_div中class是selected的span
            const selectedSpans = selected_div[0].querySelectorAll('span.selected');
            selectedSpans.forEach(span => {
                span.classList.remove('selected');
            });
            span.classList.add('selected');
            getSchoolList(searchText)
        });
    });
}
function getSchoolList(search = '', page = 1) {
    isScrolling = true;
    const selectedItem = document.querySelectorAll('.selected');
    const address = selectedItem[0].innerText;
    const type = selectedItem[1].innerText;
    const level = selectedItem[2].innerText;
    const feature = selectedItem[3].innerText;
    // 组成json
    const json = {}
    json['address'] = address;
    json['type'] = type;
    json['level'] = level;
    json['feature'] = feature;
    json['search'] = search;
    json['page'] = page;
    // 绑定class是schoolList的div
    const schoolList = document.querySelector('.schoolList');
    // 如果page=1则清空schoolList
    if (page === 1) {
        schoolList.innerHTML = "";
    }
    schoolList.innerHTML += Loading_container;
    // 在主线程中向 Worker 发送消息
    worker.postMessage(json);
    // 在主线程中监听来自 Worker 的消息
    worker.onmessage = function (e) {
        // 处理从 Worker 返回的结果
        prepared_data = e.data;
        // 删除class是schoolLoading_container的div
        const schoolLoading_containers = document.querySelectorAll('.schoolLoading_container');
        if (schoolLoading_containers) {
            schoolLoading_containers.forEach(container => container.remove());
        }
        isScrolling = false;
        // 如果没有数据
        if (!e.data) {
            // 如果已显示数据
            if (document.querySelector('.card')) {
                isScrolling = true;
                prepared_data = `
                <div class="schoolLoading_container">
                    没有更多了
                </div>
                `;
            } else {
                isScrolling = true;
                prepared_data = `
                <div class="schoolLoading_container">
                    无数据
                </div>
                `;
            }
        }
        schoolList.innerHTML += prepared_data;
        loadFavoriteSchool();
    };
};
function search() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const delButton = document.querySelector('.delButton');
    searchInput.addEventListener('input', () => {
        if (searchInput.value) {
            delButton.classList.remove('hide');
        } else {
            delButton.classList.add('hide');
        }
    })
    delButton.addEventListener('click', () => {
        searchInput.value = '';
        delButton.classList.add('hide');
        searchBtn.click();
    })
    searchBtn.addEventListener('click', () => {
        page = 1;
        searchText = searchInput.value;
        getSchoolList(searchText);
    });
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    })
};
function collectSchool(event) {
    schoolID = event.currentTarget.parentElement.parentElement.parentElement.id;
    const collectBtn = event.currentTarget;
    const messageDiv = event.currentTarget.parentElement.parentElement;
    if (event.currentTarget.classList.contains('collected')) {
        const token = document.cookie.split(';')[0].split('=')[1];
        const json = { "token": token, "schoolID": schoolID };
        fetch('/api/delFavorite', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .then(response => {
                if (response.status === 'success') {
                    collectBtn.classList.remove('collected');
                    collectBtn.innerHTML =
                        `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="gold" class="bi bi-bookmark-plus-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
                        </svg>`;
                    messageDiv.classList.add('DelcollectMessage');
                    setTimeout(() => {
                        messageDiv.classList.remove('DelcollectMessage');
                    }, 1500);
                    getFavoriteSchool();
                    loadFavoritesBar();
                }
                else {
                    alert('取消收藏失败');
                }
            })
        event.stopPropagation();
        return;
    }
    if (document.cookie.indexOf('token') !== -1) {
        // 获取cookie中的token
        const token = document.cookie.split(';')[0].split('=')[1];
        const json = { "token": token, "schoolID": schoolID };
        fetch('/api/addFavorite', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .then(response => {
                if (response.status === 'success') {
                    collectBtn.classList.add('collected');
                    collectBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="red" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
                    <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                    </svg>`;
                    messageDiv.classList.add('collectMessage');
                    setTimeout(() => {
                        messageDiv.classList.remove('collectMessage');
                    }, 1500);
                    getFavoriteSchool();
                    loadFavoritesBar();
                } else {
                    alert('收藏失败');
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('请先登录');
        // savePreviousPage();
        // window.location.href = '/login';
    }
    event.stopPropagation();
}
var FavoriteSchool;
var StatusFavoriteSchool = false;
function getFavoriteSchool() {
    const token = document.cookie.split(';')[0].split('=')[1];
    if (!token) {
        return;
    }
    const json = { "token": token };
    fetch('/api/getFavoriteSchool', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .then(response => {
            FavoriteSchool = response.FavoriteSchool;
            StatusFavoriteSchool = true;
        })
}
function loadFavoriteSchool() {
    if (!StatusFavoriteSchool) {
        setTimeout(loadFavoriteSchool, 100);
        return;
    }
    for (let i = 0; i < FavoriteSchool.length; i++) {
        try {
            let collectBtn = document.getElementById(FavoriteSchool[i]).querySelector('.collect');
            collectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="red" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
            <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
            </svg>`;
            collectBtn.classList.add('collected');
        }
        catch {
            continue;
        }
    }
}
function loadFavoritesBar() {
    const FavoriteContainer = document.querySelector('.offcanvas-body');
    const token = document.cookie.split(';')[0].split('=')[1];
    if (!token) {
        FavoriteContainer.innerHTML = `<div class="alert alert-warning" style="margin-right: 10px;">请先登录</div>`
        return;
    }
    const json = { "token": token };
    fetch('/api/getFavoriteSchoolInfo', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json()).then(response => {
        FavoriteContainer.innerHTML = "";
        for (let i = 0; i < response.FavoriteSchoolInfo.length; i++) {
            const FavoriteSchoolInfo = response.FavoriteSchoolInfo[i];
            let sylText = "";
            let yjsText = "";
            if (FavoriteSchoolInfo[6] === "True") {
                sylText = "｜“双一流”建设高校";
            }
            if (FavoriteSchoolInfo[7] === "True") {
                yjsText = "｜研究生院";
            }
            FavoriteContainer.innerHTML += `
            <div id="${FavoriteSchoolInfo[8]}" onclick="openSchool(event);">
                <div class="card">
                    <div class="card-body">
                        <img src="data:image/png;base64,${FavoriteSchoolInfo[1]}" width="65px" height="65px" id="schoolBadge">
                        <div class="info">
                            <h5 class="card-title">${FavoriteSchoolInfo[0]}</h5>
                            <div class="rounded-rectangle manyiduSmall">
                                <span class="manyidu-info">满意度</span>
                                <span class="manyidu-score">${FavoriteSchoolInfo[3]}</span>
                            </div>
                            <div class="card-text">
                                <svg t="1690609863251" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2498" width="20" height="20">
                                    <path
                                        d="M808.442084 750.473323c-19.128663-12.814864-45.00603-23.89727-76.91374-32.93818-29.814026-8.447393-64.333214-14.988366-101.734032-19.411095 8.888438-13.238512 17.989723-27.236318 27.111474-41.869596 35.539424-57.014528 63.920822-111.757317 84.355223-162.708755 26.170033-65.25419 39.440267-124.84131 39.440267-177.104627 0-34.364669-7.223518-67.695798-21.468964-99.06832-13.684674-30.134321-33.229822-57.155744-58.09207-80.313164-24.708751-23.014156-53.446259-41.069371-85.416392-53.6632-32.979112-12.990872-67.976184-19.578917-104.018052-19.578917-36.042891 0-71.039963 6.588045-104.019075 19.578917-31.968086 12.593829-60.706617 30.649044-85.415368 53.6632-24.862247 23.157419-44.407396 50.178843-58.091046 80.313164-14.246469 31.372521-21.469987 64.703651-21.469987 99.06832 0 52.264341 13.269211 111.850437 39.440267 177.104627 20.434401 50.952462 48.815799 105.695251 84.355223 162.708755 9.123798 14.636349 18.22713 28.637224 27.117614 41.877783-37.374212 4.421706-71.868841 10.960633-101.664448 19.402909-31.906687 9.041934-57.784054 20.123316-76.912717 32.93818-37.658691 25.228591-45.563732 54.501288-45.563732 74.614371s7.90504 49.386804 45.562708 74.615395c19.128663 12.814864 45.00603 23.898293 76.91374 32.93818 59.391668 16.829294 137.445372 26.098401 219.785705 26.098401 82.33931 0 160.394037-9.269108 219.785705-26.098401 31.906687-9.04091 57.784054-20.123316 76.912717-32.93818 37.658691-25.228591 45.562708-54.502311 45.562708-74.615395S846.100776 775.701914 808.442084 750.473323zM511.705799 198.241017c66.177212 0 119.839389 53.661154 119.839389 119.838366 0 66.177212-53.661154 119.838366-119.839389 119.838366-66.176189 0-119.838366-53.661154-119.838366-119.838366C391.866411 251.90217 445.528588 198.241017 511.705799 198.241017zM511.743662 907.575384c-160.768567 0-291.096844-36.930097-291.096844-82.486666 0-37.220716 87.008656-68.678172 206.531843-78.945003 34.139541 46.972824 59.659775 76.699869 61.278645 78.576613l23.248494 26.960025 23.249517-26.960025c1.617847-1.876744 27.140127-31.606859 61.282738-78.582753 119.559003 10.260691 206.602452 41.723264 206.602452 78.951143C802.840506 870.645286 672.511205 907.575384 511.743662 907.575384z"
                                        fill="#d8d8d8" p-id="2499"></path>
                                </svg>
                                <span>${FavoriteSchoolInfo[2]}</span>｜<span>主管部门：${FavoriteSchoolInfo[5]}</span><br>
                                <span>${FavoriteSchoolInfo[4]}</span>${sylText}<span></span><span>${yjsText}</span>
                            </div>
                        </div>
                        <div class="DelBtn" onclick="delFavorite(event);">删除</div>
                    </div>
                </div>
            </div>
            `;
        }
    })
}
function delFavorite(event) {
    const parentElement = event.currentTarget.parentElement.parentElement.parentElement;
    const schoolID = parentElement.id
    const token = document.cookie.split(';')[0].split('=')[1];
    const json = { "token": token, "schoolID": schoolID };
    fetch('/api/delFavorite', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .then(response => {
            if (response.status === 'success') {
                parentElement.remove();
                getFavoriteSchool();
                loadFavoritesBar();
                const collectedSchool = document.getElementById(schoolID).querySelector('.collect');
                collectedSchool.classList.remove('collected');
                collectedSchool.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="gold" class="bi bi-bookmark-plus-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
                </svg>`;
            }
            else {
                alert('取消收藏失败');
            }
        })
    event.stopPropagation();
}
function isPageNearBottom() {
    // 获取页面文档的高度
    const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );

    // 获取页面滚动的高度
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // 获取浏览器窗口的高度
    const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    // 计算距离页面底部20%的位置
    const threshold = Math.floor(docHeight - windowHeight * 1.2);
    return scrollTop >= threshold;
}
try {
    var isScrolling = false;
} catch (e) {
    isScrolling = false;
}

function onScroll() {
    if (isScrolling) return;
    if (isPageNearBottom()) {
        isScrolling = true;
        nextPage()
    }
}

// 监听scroll事件，并在页面滚动到距离页面底部1%的位置时执行代码
window.addEventListener('scroll', onScroll);
try {
    var page = 1;
} catch (e) {
    page = 1;
}
function nextPage() {
    page++;
    getSchoolList(searchText, page);
}
function openSchool(event) {
    let schoolID = event.currentTarget.id;
    window.open(`/school-${schoolID}`);
}

main = () => {
    getFavoriteSchool();
    getSchoolList();
    checkAddressClick();
    search();
    loadFavoritesBar();
}

try {
    main();
} catch (e) {
    window.onload = main;
}
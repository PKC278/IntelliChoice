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
        document.querySelector('.left_img img').alt = firstItem[0];

        data.hotSchool.forEach(function (item) {
            const hotSchool = `
            <div class="school_msg">
                <div>
                    <img src="data:image/png;base64,${item[1]}" alt="${item[0]}" class="right_img">
                </div>
                <div class="wenzi">
                    <p>${item[0]}</p>
                    <span style="white-space: nowrap;">
                        <span class="right_span_border">${item[3]}</span>
                        <span><a href="/school-${item[2]}">查看院校 &gt;</a></span>
                    </span>
                </div>
            </div>
            `;
            hotSchoolList.innerHTML += hotSchool;
            school_listLoading.classList.add('hide');
        })
    })
}
// function getUserLocation() {
//     fetch('/api/userLocation', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(function (res) {
//             // 解析JSON响应
//             return res.json();
//         })
//         .then(function (data) {
//             // 处理响应数据
//             try {
//                 userLocation = data.location
//                 if (userLocation = '本机') {
//                     var userLocation = '山东省';
//                 }
//                 var userLocation = userLocation.split('省')[0];
//             } catch (e) { }
//             const hschool_location = document.querySelectorAll('.hschool_location');
//             hschool_location.forEach(function (item) {
//                 item.innerHTML = userLocation;
//             })
//             document.querySelector(".title_choicesList option:nth-child(1)").innerHTML = userLocation + '本科院校';
//             document.querySelector(".title_choicesList option:nth-child(2)").innerHTML = userLocation + '专科院校';
//             loadHotSchool(userLocation, hotSchoolType);
//         })
// }
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
main = () => {
    // getUserLocation();
    loadHotSchool(userLocation, hotSchoolType);
    menubar();
    topics();
    AutoList();
}
try {
    main();
} catch (e) {
    window.onload = main;
}
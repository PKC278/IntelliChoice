var worker = new Worker('js/major_load.js');
var Type = "本科（普通教育）";
var Category = "";
var Professional = "";
var isLoading = false;

LoadingAnimation(1, true);
worker.postMessage({ type: Type, Category: Category, Professionals: Professional });
function switchBtn() {
    const switchBtn = document.querySelectorAll(".table-btn .btn");
    for (let i = 0; i < switchBtn.length; i++) {
        switchBtn[i].addEventListener("click", function () {
            document.querySelector(".sr").classList.add("hide");
            document.querySelector(".zy-main").classList.remove("hide");
            if (isLoading) { return; }
            LoadingAnimation(1, true);
            switchBtn.forEach(function (item) {
                item.classList.remove("active");
            })
            this.classList.add("active");
            Type = this.innerText;
            Category = "";
            Professional = "";
            const message = { type: Type, Category: Category, Professional: Professional };
            isLoading = true;
            worker.postMessage(message);
        })
    }
}
function typeBtn() {
    const parentElement = document.querySelector(".zy-main tbody"); // 选择包含td元素的父元素
    parentElement.addEventListener("click", function (event) {
        if (isLoading) { return; }
        const target = event.target; // 获取触发事件的元素
        if (target.tagName === "TD" && target.classList.contains("t-hover") && target.cellIndex === 0) {
            if (target.innerText == "") {
                return;
            }
            LoadingAnimation(2, true);
            const typeBtnElements = document.querySelectorAll(".zy-main tr td:nth-child(1).t-hover");
            typeBtnElements.forEach(function (item) {
                item.classList.remove("t-active");
            });
            target.classList.add("t-active");
            Category = target.innerText;
            Professional = "";
            const message = { type: Type, Category: Category, Professional: Professional };
            isLoading = true;
            worker.postMessage(message);
        }
    });
}
function professionalBtn() {
    const parentElement = document.querySelector(".zy-main tbody"); // 选择包含td元素的父元素
    parentElement.addEventListener("click", function (event) {
        if (isLoading) { return; }
        const target = event.target; // 获取触发事件的元素
        if (target.tagName === "TD" && target.classList.contains("t-hover") && target.cellIndex === 1) {
            if (target.innerText == "") {
                return;
            }
            LoadingAnimation(3, true);
            const secondColumnTdElements = document.querySelectorAll(".zy-main tr td:nth-child(2).t-hover");
            secondColumnTdElements.forEach(function (item) {
                item.classList.remove("t-active");
            });
            target.classList.add("t-active");
            Professional = target.innerText;
            const message = { type: Type, Category: Category, Professional: Professional };
            isLoading = true;
            worker.postMessage(message);
        }
    });
}
function cleanTr(majorList) {
    const tr = majorList.querySelectorAll("tr");
    for (let i = 0; i < tr.length; i++) {
        if (tr[i].innerText == "") {
            tr[i].remove();
        }
    }
    const td = majorList.querySelectorAll("td");
    for (let i = 0; i < td.length; i++) {
        if (td[i].innerText == "") {
            td[i].classList.remove("t-hover");
        }
    }
}
function loadProfessionals(majorList, Professionals) {
    for (let i = 0; i < majorList.childElementCount; i++) {
        let tr = majorList.querySelector(`tr:nth-child(${i + 1})`);
        tr.querySelector('td:nth-child(2)').innerText = "";
        tr.querySelector('td:nth-child(2)').classList.remove("t-active");
    }
    for (let i = 0; i < Professionals.length; i++) {
        let tr = majorList.querySelector('tr:nth-child(' + (i + 1) + ')');
        if (tr) {
            tr.querySelector('td:nth-child(2)').innerText = Professionals[i];
            tr.querySelector('td:nth-child(2)').classList.add("t-hover");
        } else {
            majorList.innerHTML += `
            <tr>
                <td></td>
                <td class="t-hover">${Professionals[i]}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            `;
        }
    }
    cleanTr(majorList);
    isLoading = false;
    const tr = majorList.querySelector("tr");
    tr.querySelector("td:nth-child(2)").click();
}
function loadZy(majorList, zys) {
    for (let i = 0; i < majorList.childElementCount; i++) {
        let tr = majorList.querySelector(`tr:nth-child(${i + 1})`);
        tr.querySelector('td:nth-child(3)').innerHTML = "";
        tr.querySelector('td:nth-child(4)').innerHTML = "";
        tr.querySelector('td:nth-child(5)').innerHTML = "";
    }
    for (let i = 0; i < zys.length; i++) {
        let tr = majorList.querySelector(`tr:nth-child(${i + 1})`);
        if (tr) {
            tr.querySelector('td:nth-child(3)').innerHTML = `<a class="text-hover" target="_blank" href="detail-${zys[i].specId}">${zys[i].zymc}</a>`;
            tr.querySelector('td:nth-child(3)').classList.add("t-hover");
            tr.querySelector('td:nth-child(4)').innerText = zys[i].zydm;
            tr.querySelector('td:nth-child(5)').innerHTML = `
            <svg class="manyidu" viewBox="0 0 100 5" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="0" width="50" height="3" fill="#e1e3e5" rx="1.5" />
                <rect x="12" y="0" height="3" fill="#54af7d" rx="1.5">
                    <animate attributeName="width" from="0" to="${zys[i].zymyd / 5 * 50}" dur="0.5s" fill="freeze" />
                </rect>
                <text x="87" y="5" text-anchor="end" font-size="10" fill="#262b29">${zys[i].zymyd}</text>
            </svg><span class="mydtext">${zys[i].zymyd}</span>
            `;
        } else {
            majorList.innerHTML += `
            <tr>
                <td></td>
                <td></td>
                <td class="t-hover"><a class="text-hover">${zys[i].zymc}</a></td>
                <td>${zys[i].zydm}</td>
                <td><svg class="manyidu" viewBox="0 0 100 5" xmlns="http://www.w3.org/2000/svg">
                        <rect x="12" y="0" width="50" height="3" fill="#e1e3e5" rx="1.5" />
                        <rect x="12" y="0" height="3" fill="#54af7d" rx="1.5">
                            <animate attributeName="width" from="0" to="${zys[i].zymyd / 5 * 50}" dur="0.5s" fill="freeze" />
                        </rect>
                        <text x="87" y="5" text-anchor="end" font-size="10" fill="#262b29">${zys[i].zymyd}</text>
                    </svg></td>
                </tr>
                `;
        }
    }
    zyStytle();
    isLoading = false;
}
function loadSearch(data) {
    let switchBtn = document.querySelectorAll(".table-btn .btn");
    switchBtn.forEach(function (item) {
        item.classList.remove("active");
    })
    const bktab = document.querySelector(".bktab tbody");
    const bkzytab = document.querySelector(".bkzytab tbody");
    const zktab = document.querySelector(".zktab tbody");
    bktab.innerHTML = "";
    bkzytab.innerHTML = "";
    zktab.innerHTML = "";
    function generateTableRow(dataItem) {
        disableFlag = "";
        href = `detail-${dataItem[3]}`;
        if (dataItem[3].length <= 4) {
            disableFlag = "disabled";
            href = "javascript:void(0)";
        }
        return `
        <tr>
            <td><a target="_blank" class="${disableFlag}" href="${href}">${dataItem[0]}</a></td>
            <td>${dataItem[1]}</td>
            <td>
                <svg class="manyidu" viewBox="0 0 100 5" xmlns="http://www.w3.org/2000/svg">
                    <rect x="12" y="0" width="50" height="3" fill="#e1e3e5" rx="1.5" />
                    <rect x="12" y="0" height="3" fill="#54af7d" rx="1.5">
                        <animate attributeName="width" from="0" to="${dataItem[2] / 5 * 50}" dur="0.5s" fill="freeze" />
                    </rect>
                    <text x="87" y="5" text-anchor="end" font-size="10" fill="#262b29">${dataItem[2]}</text>
                </svg>
                <span class="mydtext">${dataItem[2]}</span>
            </td>
        </tr>
    `;
    }
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const tableHTML = generateTableRow(data[i][j]);
            if (i === 0) {
                bktab.innerHTML += tableHTML;
            } else if (i === 1) {
                bkzytab.innerHTML += tableHTML;
            } else if (i === 2) {
                zktab.innerHTML += tableHTML;
            }
        }
    }
}
function loadMajor() {
    worker.onmessage = function (e) {
        if (e.data.type == "search") {
            zylist = e.data.zylist;
            loadSearch(zylist);
            return;
        }
        const majorList = document.querySelector(".zy-main tbody");
        const Categorys = e.data.Categorys;
        const Professionals = e.data.Professionals;
        const Zys = e.data.Zys;
        if (Zys.length > 0) {
            loadZy(majorList, Zys);
            LoadingAnimation(3, false);
            return;
        }
        if (Professionals.length > 0) {
            loadProfessionals(majorList, Professionals);
            LoadingAnimation(2, false);
            return;
        }
        majorList.innerHTML = "";
        for (let i = 0; i < Categorys.length; i++) {
            majorList.innerHTML += `
            <tr>
                <td class="t-hover">${Categorys[i]}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            `;
        };
        cleanTr(majorList);
        isLoading = false;
        LoadingAnimation(1, false);
        let tr = majorList.querySelector("tr:nth-child(1)");
        tr.querySelector("td:nth-child(1)").click();
    }
}
function zyStytle() {
    const parentElement = document.querySelector(".zy-main tbody"); // 选择包含td元素的父元素
    function handleMouseOver(event) {
        const target = event.target; // 获取触发事件的元素
        if (target.tagName === "TD" && target.cellIndex >= 2 && target.cellIndex <= 4) { // 选择第3到第6个元素
            // 同时修改这一行第3-6个元素的样式
            const tr = target.parentNode;
            const tds = tr.querySelectorAll("td");
            for (let i = 2; i < 5; i++) {
                if (tds[i].innerText == "") {
                    return;
                }
                tds[i].classList.add("zy-hover");
            }
            parentElement.addEventListener("mouseout", handleMouseOut); // 添加mouseout事件监听
        } else if (target.tagName === "A" && target.parentNode.tagName === "TD" && target.parentNode.cellIndex >= 2 && target.parentNode.cellIndex <= 4) { // 选择第3到第6个元素内的span元素
            // 同时修改这一行第3-6个元素的样式
            const tr = target.parentNode.parentNode;
            const tds = tr.querySelectorAll("td");
            for (let i = 2; i < 5; i++) {
                if (tds[i].innerText == "") {
                    return;
                }
                tds[i].classList.add("zy-hover");
            }
            parentElement.addEventListener("mouseout", handleMouseOut); // 添加mouseout事件监听
        }
    }
    function handleMouseOut(event) {
        const target = event.target; // 获取触发事件的元素
        if (target.tagName === "TD" && target.cellIndex >= 2 && target.cellIndex <= 4) { // 选择第3到第6个元素
            // 同时删除这一行第3-6个元素的样式
            const tr = target.parentNode;
            const tds = tr.querySelectorAll("td");
            for (let i = 2; i < 5; i++) {
                tds[i].classList.remove("zy-hover");
            }
        } else if (target.tagName === "A" && target.parentNode.tagName === "TD" && target.parentNode.cellIndex >= 2 && target.parentNode.cellIndex <= 4) { // 选择第3到第6个元素内的span元素
            // 同时删除这一行第3-6个元素的样式
            const tr = target.parentNode.parentNode;
            const tds = tr.querySelectorAll("td");
            for (let i = 2; i < 5; i++) {
                tds[i].classList.remove("zy-hover");
            }
        }
    }
    parentElement.addEventListener("mouseover", handleMouseOver);
}
function LoadingAnimation(i, state) {
    if (state) {
        for (let j = i; j <= 3; j++) {
            const secondColumnTdElements = document.querySelectorAll(`.zy-main tr td:nth-child(${j})`);
            secondColumnTdElements.forEach(function (item) {
                if (j == 3) {
                    let td = document.querySelectorAll(`.zy-main td:nth-child(n+3):nth-child(-n+5)`);
                    td.forEach(function (item) {
                        item.classList.add("t-loading");
                    })
                    return;
                }
                item.classList.add("t-loading");
            })
        }
    }
    else {
        const secondColumnTdElements = document.querySelectorAll(`.zy-main tr td:nth-child(${i})`);
        secondColumnTdElements.forEach(function (item) {
            if (i == 3) {
                let td = document.querySelectorAll(`.zy-main td:nth-child(n+3):nth-child(-n+5)`);
                td.forEach(function (item) {
                    item.classList.remove("t-loading");
                })
                return;
            }
            item.classList.remove("t-loading");
        })
    }
}
function search() {
    const searchInput = document.querySelector(".zy-search input");
    const searchBtn = document.querySelector(".zy-search svg");
    const zyMain = document.querySelector(".zy-main");
    const sr = document.querySelector(".sr");

    searchInput.addEventListener("input", function () {
        searchBtn.classList.toggle("active", searchInput.value !== "");
    });

    function performSearch() {
        if (searchInput.value === "") {
            return;
        }
        zyMain.classList.add("hide");
        sr.classList.remove("hide");
        // 在url中添加参数
        worker.postMessage({ type: "search", search: searchInput.value });
        window.history.pushState(null, null, `?search=${searchInput.value}`);
    }
    searchBtn.addEventListener("click", performSearch);

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });
    // 检查url中是否有搜索
    if (window.location.search) {
        const search = decodeURIComponent(window.location.search.split("=")[1]);
        searchInput.value = search;
        searchBtn.classList.add("active");
        performSearch();
    }
}
main = () => {
    search();
    switchBtn();
    typeBtn();
    professionalBtn();
    loadMajor();
}

try {
    main();
} catch (e) {
    window.onload = main;
}
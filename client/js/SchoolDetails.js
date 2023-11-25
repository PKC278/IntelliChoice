var schoolID = window.location.href.split('-')[1];
var worker = new Worker('js/SchoolDetails_Worker.js');
worker.postMessage(schoolID);
function getSchoolDetail(schoolID) {
    worker.onmessage = function (e) {
        data = e.data;
        const DetailLength = Object.keys(data).length;
        for (let i = 0; i < DetailLength; i++) {
            // 获取数据
            const schoolBadge = data[i][0];
            const collegesName = data[i][1];
            const followCount = data[i][2];
            const department = data[i][3];
            const syl = data[i][4].toString();
            const yjs = data[i][5].toString();
            const location = data[i][6];
            const txdz = data[i][7];
            const gfwz = data[i][8];
            const zswz = data[i][9];
            const gfdh = data[i][10];
            const avgRank = data[i][11];
            const sjzh = data[i][12];
            const wxQR = data[i][13];
            const wbQR = data[i][14];

            document.querySelector(".schoolBadge img").src = `data:image/png;base64,${schoolBadge}`;
            document.getElementById("schoolName").innerHTML = collegesName;
            document.getElementById("followCount").innerHTML = followCount;
            document.getElementById("zgbmmc").innerHTML = department;
            // 设置页面标题
            document.title = collegesName + "-院校详情";
            if (syl === "True") {
                sylText = `<span>“双一流”建设高校</span>`;
                document.querySelector(".yxtx").innerHTML += sylText;
            }
            if (yjs === "True") {
                yjsText = `<span>研究生院</span>`;
                document.querySelector(".yxtx").innerHTML += yjsText;
            }
            document.querySelector(".yxszd").innerHTML = location;
            document.querySelector(".xxdz").innerHTML = txdz;
            document.querySelector(".gfwz a").href = gfwz;
            document.querySelector(".gfwz a").innerHTML = gfwz;
            document.querySelector(".zswz a").href = zswz;
            document.querySelector(".zswz a").innerHTML = zswz;
            document.querySelector(".gfdh").innerHTML = gfdh;
            HomeDetail(avgRank, sjzh, wxQR, wbQR);
        }

    }
}
function HomeDetail(avgRank, sjzh, wxQR, wbQR) {
    avgRank = JSON.parse(avgRank);
    sjzh = JSON.parse(sjzh);
    wxmc = sjzh["wxmc"];
    wxh = sjzh["wxh"];
    wbmc = sjzh["wbmc"];
    wbwz = sjzh["wbwz"];
    bjhmc = sjzh["bjhmc"];
    bjhId = sjzh["bjhId"];

    var wxmcElement = document.querySelectorAll(".wxmc");
    var wxhElement = document.querySelectorAll(".wxh");
    var wxQRElement = document.querySelectorAll(".wxQR");
    var wbmcElement = document.querySelectorAll(".wbmc");
    var wbwzElement = document.querySelectorAll(".wbwz");
    var wbQRElement = document.querySelectorAll(".wbQR");
    var bjhmcElement = document.querySelectorAll(".bjhmc");
    var bjhidElement = document.querySelectorAll(".bjhid");
    var sphElement = document.querySelectorAll(".sph");
    wxmcElement.forEach(function (element) {
        element.innerHTML = wxmc;
    });
    wxhElement.forEach(function (element) {
        element.innerHTML = wxh;
    });
    wxQRElement.forEach(function (element) {
        if (wxQR) {
            element.src = `data:image/png;base64,${wxQR}`;
        }
    });
    wbmcElement.forEach(function (element) {
        element.innerHTML = wbmc;
    });
    wbwzElement.forEach(function (element) {
        try {
            element.innerHTML = wbwz.slice(0, 18) + "...";
        } catch (e) {
            element.innerHTML = wbwz;
        }
        element.href = wbwz;
    });
    wbQRElement.forEach(function (element) {
        if (wbQR) {
            element.src = `data:image/png;base64,${wbQR}`
        }
    });
    bjhmcElement.forEach(function (element) {
        element.innerHTML = bjhmc;
    });
    bjhidElement.forEach(function (element) {
        element.innerHTML = bjhId;
    });
    sphElement.forEach(function (element) {
        element.innerHTML = "";
    });

    if (sjzh["sphList"]) {
        sphLength = Object.keys(sjzh["sphList"]).length;
        for (let i = 0; i < sphLength; i++) {
            ptmc = sjzh["sphList"][i]["ptmc"];
            mc = sjzh["sphList"][i]["mc"];
            if (ptmc === "") {
                console.log("ptmc为空");
            }
            sphElement.forEach(function (element) {
                element.innerHTML += `
                <p>
                    <span>${ptmc}</span>：<span>${mc}</span>
                </p>
                `;
            });
        }
    }
    const pfn_ul = document.querySelectorAll("div.pfn-ul");
    const specappraisalinfo = avgRank.specappraisalinfo;
    const infoBoxes = pfn_ul[0].querySelectorAll(".pfn-content");
    for (let i = 0; i < 10; i++) {
        let n = i + 1;
        let infoBox = infoBoxes[i];
        infoBox.querySelector(".pfn-link").href = `/major?search=${specappraisalinfo[i]["zymc"]}`;
        infoBox.querySelector(".pfn-name").innerHTML = specappraisalinfo[i]["zymc"];
        infoBox.querySelector(".pfn-grade").innerHTML = specappraisalinfo[i]["avgRank"].toFixed(1);
        infoBox.querySelector(".pfn-member").innerHTML = `(${specappraisalinfo[i]["count"]}人)`;

    }
    const zytjcountinfo = avgRank.zytjcountinfo;
    const infoBoxes2 = pfn_ul[1].querySelectorAll(".pfn-content");
    for (let i = 0; i < 10; i++) {
        let n = i + 1;
        let infoBox = infoBoxes2[i];
        infoBox.querySelector(".pfn-link").href = `/major?search=${zytjcountinfo[i]["zymc"]}`;
        infoBox.querySelector(".pfn-name").innerHTML = zytjcountinfo[i]["zymc"];
        infoBox.querySelector(".pfn-grade").innerHTML = zytjcountinfo[i]["avgRank"].toFixed(1);
        infoBox.querySelector(".pfn-member").innerHTML = `(${zytjcountinfo[i]["count"]}人)`;
    }
    const zytjzsinfo = avgRank.zytjzsinfo;
    const infoBoxes3 = pfn_ul[2].querySelectorAll(".pfn-content");
    for (let i = 0; i < 10; i++) {
        let n = i + 1;
        let infoBox = infoBoxes3[i];
        infoBox.querySelector(".pfn-link").href = `/major?search=${zytjzsinfo[i]["zymc"]}`;
        infoBox.querySelector(".pfn-name").innerHTML = zytjzsinfo[i]["zymc"];
        infoBox.querySelector(".pfn-grade").innerHTML = zytjzsinfo[i]["avgRank"].toFixed(1);
        infoBox.querySelector(".pfn-member").innerHTML = `(${zytjzsinfo[i]["count"]}人)`;
    }
    const schappraisalinfo = avgRank.schappraisalinfo;
    for (let i = 0; i < 3; i++) {
        type = schappraisalinfo[i]["type"];
        rank = schappraisalinfo[i]["avgRank"];
        count = schappraisalinfo[i]["count"];
        document.querySelector(`.single-chart:nth-of-type(${i + 1}) .circle`).setAttribute("stroke-dasharray", `${rank / 5 * 100} 100`);
        document.querySelector(`.single-chart:nth-of-type(${i + 1}) .percentage-rank`).innerHTML = rank.toFixed(1);
        document.querySelector(`.single-chart:nth-of-type(${i + 1}) .percentage-count`).innerHTML = count + "人投票";
    }
}
function OpenZyjs(zyList, zyInfos, yxcc) {
    // 获取所有 class 为 zy-item 的元素
    const zyItems = document.querySelectorAll('.zy-item:not(.disabled)');
    // 遍历所有元素并为它们绑定点击事件
    zyItems.forEach(item => {
        item.addEventListener('click', () => {
            // 获取元素中的内容
            const zyName = item.textContent;
            zyInfos.innerHTML = `
            <div class="tab-content_loadingInfo">加载中</div>
            <div class="closeButton">
            <svg t="1692722614114" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4264" width="30" height="30"><path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m0-572.330667L330.965333 270.634667a42.666667 42.666667 0 0 0-60.330666 60.330666L451.669333 512l-181.034666 181.034667a42.666667 42.666667 0 1 0 60.330666 60.330666L512 572.330667l181.034667 181.034666a42.666667 42.666667 0 1 0 60.330666-60.330666L572.330667 512l181.034666-181.034667a42.666667 42.666667 0 0 0-60.330666-60.330666L512 451.669333z" fill="#09131D" p-id="4265"></path></svg>
            </div>`;
            const closeButton = document.querySelector(".closeButton");
            closeButton.addEventListener('click', () => {
                zyList.classList.remove("hide");
                zyInfos.innerHTML = "";
            });
            zyList.classList.add("hide");
            fetch('/api/getZyjsDetail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "schoolID": schoolID,
                    "zyName": zyName
                })
            }).then(res => {
                return res.json();
            }).then(data => {
                const title = item.textContent + '（' + yxcc + '类）';
                const info = data.data;
                zyInfos.innerHTML = `
                <div class="closeButton">
                    <svg t="1692722614114" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4264" width="30" height="30"><path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m0-572.330667L330.965333 270.634667a42.666667 42.666667 0 0 0-60.330666 60.330666L451.669333 512l-181.034666 181.034667a42.666667 42.666667 0 1 0 60.330666 60.330666L512 572.330667l181.034667 181.034666a42.666667 42.666667 0 1 0 60.330666-60.330666L572.330667 512l181.034666-181.034667a42.666667 42.666667 0 0 0-60.330666-60.330666L512 451.669333z" fill="#09131D" p-id="4265"></path></svg>
                </div>
                <table class="zy-table">
                    <tbody>
                        <tr>
                            <td class="zy-name" width="120">专业名称：</td>
                            <td>
                                ${title}
                            </td>
                        </tr>
                        <tr>
                            <td class="zy-info">专业介绍：</td>
                            <td>
                                ${info}
                            </td>
                        </tr>
                    </tbody>
                </table>
                `;
                const closeButton = document.querySelector(".closeButton");
                closeButton.addEventListener('click', () => {
                    zyList.classList.remove("hide");
                    zyInfos.innerHTML = "";
                });
            });
        });
    });
}
function zyjs(name, ContentDiv) {
    fetch('/api/getZyjsInfos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "schoolID": schoolID })
    }).then(res => {
        return res.json();
    }).then(data => {
        ContentDiv.innerHTML = `
        <div class="title">${name}</div>
        <div id="zyList"></div>
        <div class="zyInfos"></div>`;
        const zyList = document.getElementById("zyList");
        const zyInfos = document.querySelector(".zyInfos");
        // 遍历JSON数据生成HTML
        for (var yxcc in data) {
            if (data.hasOwnProperty(yxcc)) {
                // 创建一个最外层div
                var yxccTabDiv = document.createElement("div");
                yxccTabDiv.className = "yxcc-tab";

                // 创建一级标题的div
                var yxccTitleDiv = document.createElement("div");
                yxccTitleDiv.className = "second-title";
                yxccTitleDiv.textContent = yxcc;

                // 将一级标题div添加到最外层div
                yxccTabDiv.appendChild(yxccTitleDiv);

                for (var type in data[yxcc]) {
                    if (data[yxcc].hasOwnProperty(type)) {
                        // 创建一个div用于容纳二级标题和专业
                        var typeTabDiv = document.createElement("div");
                        typeTabDiv.className = "type-tab";

                        // 创建二级标题的div
                        var typeTitleDiv = document.createElement("div");
                        typeTitleDiv.className = "type-title";
                        typeTitleDiv.textContent = type;
                        typeTabDiv.appendChild(typeTitleDiv);
                        var clear_both = document.createElement("div");
                        clear_both.className = "clear-both";
                        typeTabDiv.appendChild(clear_both);


                        // 用一个数组来存储同级的专业
                        var zySpanArray = [];

                        for (var i = 0; i < data[yxcc][type].length; i++) {
                            var zyData = data[yxcc][type][i];

                            var zySpan = document.createElement("li");
                            zySpan.textContent = zyData.zy;
                            zySpan.className = "zy-item";

                            // 根据hasInfo属性设置class
                            if (zyData.hasInfo === "False") {
                                zySpan.classList.add("disabled");
                            }

                            zySpanArray.push(zySpan);
                        }

                        // 创建一个div来容纳同级的专业
                        var zyDiv = document.createElement("ul");
                        zyDiv.className = "zy";

                        // 将所有专业的span添加到zyDiv中
                        zySpanArray.forEach(function (zySpan) {
                            zyDiv.appendChild(zySpan);
                        });

                        typeTabDiv.appendChild(zyDiv);
                        yxccTabDiv.appendChild(typeTabDiv);
                    }
                }

                // 将最外层div添加到页面的容器中
                zyList.appendChild(yxccTabDiv);
            }
        }
        OpenZyjs(zyList, zyInfos, yxcc);
    });
};
function getInfos() {
    // 获取nav-pills li的点击事件
    const liElements = document.querySelectorAll('.fldTab .nav-pills li');
    const liLength = liElements.length;
    for (let i = 1; i < liLength; i++) {
        liElements[i].addEventListener('click', function () {
            // 获取元素中的button内容
            const name = this.textContent;
            const liID = this.querySelector('button').id;
            let dataDiv = document.getElementById("pills-tabContent");
            let ContentDiv = dataDiv.querySelector("#" + "pills-" + liID);
            if (ContentDiv.textContent.trim() !== "") {
                return;
            }
            ContentDiv.innerHTML = `<div class="tab-content_loadingInfo">加载中</div>`;
            if (liID === "zyjs") {
                zyjs(name, ContentDiv);
                return;
            }
            fetch('/api/getSchoolInfos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "schoolID": schoolID,
                    "fldName": liID
                })
            }).then(res => {
                return res.json();
            }).then(data => {
                // 遍历数据
                const dataLength = Object.keys(data).length;
                if (dataLength === 0) {
                    ContentDiv.innerHTML = `<div class="title">${name}</div>`;
                    ContentDiv.innerHTML += `<div class="yxk-detail-con">暂时还没有信息</div>`;
                    return;
                }
                let dataText = "";
                try {
                    for (let i = 0; i < dataLength; i++) {
                        // console.log(data[i]);
                        infoItemName = data[i]["infoItemName"];
                        content = data[i]["content"].replace(/a\?a/g, '"');
                        dataText += `
                        <div class="second-title">${infoItemName}</div>
                        <div class="yxk-detail-con">${content}</div>
                        `;
                    }
                } catch (e) {
                    dataText = "暂时还没有信息"
                };
                ContentDiv.innerHTML = `<div class="title">${name}</div>`;
                ContentDiv.innerHTML += dataText;
            });
        });
    }
}

main = () => {
    getSchoolDetail(schoolID);
    getInfos();
}

try {
    main();
} catch (e) {
    window.onload = main;
}

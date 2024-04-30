self.onmessage = function (e) {
    // 在这里执行任务
    const json = e.data;
    // 发送post请求
    fetch('/api/getSchoolList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    }).then(res => {
        return res.json();
    }).then(data => {
        const schoolLength = Object.keys(data).length;
        // 有几个列表就插入几个schoolCard
        let schoolListCard = ""
        for (let i = 0; i < schoolLength; i++) {
            // 获取数据
            const collegesName = data[i][0];
            const schoolBadge = data[i][1];
            const local = data[i][2];
            const manyidu = data[i][3];
            const benke = data[i][4];
            const department = data[i][5];
            const syl = data[i][6].toString();
            const yjs = data[i][7].toString();
            const schoolID = data[i][8];
            let sylText = "";
            let yjsText = "";
            if (syl === "True") {
                sylText = "｜“双一流”建设高校";
            } else {
                sylText = "";
            }
            if (yjs === "True") {
                yjsText = "｜研究生院";
            } else {
                yjsText = "";
            }
            // 计算星星填充百分比
            const starPercentages = getScore(manyidu);
            let schoolCard = `
            <div class="col-md-6 mb-4" id="${schoolID}" onclick="openSchool(event);">
                <div class="card">
                    <div class="message_content"><strong>收藏成功!</strong></div>
                    <div class="Delmessage_content"><strong>取消收藏成功!</strong></div>
                    <div class="card-body">
                        <img src="data:image/png;base64,${schoolBadge}" width="75px" height="75px" id="schoolBadge">
                        <div class="collect" onclick="collectSchool(event)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="gold" class="bi bi-bookmark-plus-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
                            </svg>
                        </div>
                        <div class="info">
                            <h5 class="card-title">${collegesName}</h5>
                            <div class="rounded-rectangle manyidu">
                                <span class="manyidu-info">满意度</span>
                                <div class="star">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                                    <!-- Define the clip-path with a rectangle -->
                                    <!-- Original SVG path -->
                                    <path
                                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                                        fill="#e9e9e9" />
                                    <!-- Filled SVG path with the clip-path applied -->
                                    <path style="fill: gold;clip-path: polygon(0 0, ${starPercentages[0]}% 0, ${starPercentages[0]}% 100%, 0 100%);-webkit-clip-path: polygon(0 0, ${starPercentages[0]}% 0, ${starPercentages[0]}% 100%, 0 100%);"
                                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                                    <!-- Define the clip-path with a rectangle -->
                                    <!-- Original SVG path -->
                                    <path
                                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                                        fill="#e9e9e9" />
                                    <!-- Filled SVG path with the clip-path applied -->
                                    <path style="fill: gold;clip-path: polygon(0 0, ${starPercentages[1]}% 0, ${starPercentages[1]}% 100%, 0 100%);-webkit-clip-path: polygon(0 0, ${starPercentages[1]}% 0, ${starPercentages[1]}% 100%, 0 100%);"
                                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                                    <!-- Define the clip-path with a rectangle -->
                                    <!-- Original SVG path -->
                                    <path
                                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                                        fill="#e9e9e9" />
                                    <!-- Filled SVG path with the clip-path applied -->
                                    <path style="fill: gold;clip-path: polygon(0 0, ${starPercentages[2]}% 0, ${starPercentages[2]}% 100%, 0 100%);-webkit-clip-path: polygon(0 0, ${starPercentages[2]}% 0, ${starPercentages[2]}% 100%, 0 100%);"
                                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                                    <!-- Define the clip-path with a rectangle -->
                                    <!-- Original SVG path -->
                                    <path
                                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                                        fill="#e9e9e9" />
                                    <!-- Filled SVG path with the clip-path applied -->
                                    <path style="fill: gold;clip-path: polygon(0 0, ${starPercentages[3]}% 0, ${starPercentages[3]}% 100%, 0 100%);-webkit-clip-path: polygon(0 0, ${starPercentages[3]}% 0, ${starPercentages[3]}% 100%, 0 100%);"
                                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                                    <!-- Define the clip-path with a rectangle -->
                                    <!-- Original SVG path -->
                                    <path
                                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                                        fill="#e9e9e9" />
                                    <!-- Filled SVG path with the clip-path applied -->
                                    <path style="fill: gold;clip-path: polygon(0 0, ${starPercentages[4]}% 0, ${starPercentages[4]}% 100%, 0 100%);-webkit-clip-path: polygon(0 0, ${starPercentages[4]}% 0, ${starPercentages[4]}% 100%, 0 100%);"
                                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
                                </svg>
                                </div>
                                <span class="manyidu-score">${manyidu}</span>
                            </div>
                            <div class="card-text">
                                <svg t="1690609863251" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2498" width="20" height="20">
                                    <path
                                        d="M808.442084 750.473323c-19.128663-12.814864-45.00603-23.89727-76.91374-32.93818-29.814026-8.447393-64.333214-14.988366-101.734032-19.411095 8.888438-13.238512 17.989723-27.236318 27.111474-41.869596 35.539424-57.014528 63.920822-111.757317 84.355223-162.708755 26.170033-65.25419 39.440267-124.84131 39.440267-177.104627 0-34.364669-7.223518-67.695798-21.468964-99.06832-13.684674-30.134321-33.229822-57.155744-58.09207-80.313164-24.708751-23.014156-53.446259-41.069371-85.416392-53.6632-32.979112-12.990872-67.976184-19.578917-104.018052-19.578917-36.042891 0-71.039963 6.588045-104.019075 19.578917-31.968086 12.593829-60.706617 30.649044-85.415368 53.6632-24.862247 23.157419-44.407396 50.178843-58.091046 80.313164-14.246469 31.372521-21.469987 64.703651-21.469987 99.06832 0 52.264341 13.269211 111.850437 39.440267 177.104627 20.434401 50.952462 48.815799 105.695251 84.355223 162.708755 9.123798 14.636349 18.22713 28.637224 27.117614 41.877783-37.374212 4.421706-71.868841 10.960633-101.664448 19.402909-31.906687 9.041934-57.784054 20.123316-76.912717 32.93818-37.658691 25.228591-45.563732 54.501288-45.563732 74.614371s7.90504 49.386804 45.562708 74.615395c19.128663 12.814864 45.00603 23.898293 76.91374 32.93818 59.391668 16.829294 137.445372 26.098401 219.785705 26.098401 82.33931 0 160.394037-9.269108 219.785705-26.098401 31.906687-9.04091 57.784054-20.123316 76.912717-32.93818 37.658691-25.228591 45.562708-54.502311 45.562708-74.615395S846.100776 775.701914 808.442084 750.473323zM511.705799 198.241017c66.177212 0 119.839389 53.661154 119.839389 119.838366 0 66.177212-53.661154 119.838366-119.839389 119.838366-66.176189 0-119.838366-53.661154-119.838366-119.838366C391.866411 251.90217 445.528588 198.241017 511.705799 198.241017zM511.743662 907.575384c-160.768567 0-291.096844-36.930097-291.096844-82.486666 0-37.220716 87.008656-68.678172 206.531843-78.945003 34.139541 46.972824 59.659775 76.699869 61.278645 78.576613l23.248494 26.960025 23.249517-26.960025c1.617847-1.876744 27.140127-31.606859 61.282738-78.582753 119.559003 10.260691 206.602452 41.723264 206.602452 78.951143C802.840506 870.645286 672.511205 907.575384 511.743662 907.575384z"
                                        fill="#d8d8d8" p-id="2499"></path>
                                </svg>
                                <span>${local}</span>｜<span>主管部门：${department}</span><br>
                                <span>${benke}</span><span>${sylText}</span><span>${yjsText}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    `;
            schoolListCard += schoolCard;
        };
        prepared_data = schoolListCard;
        // 发送数据
        self.postMessage(prepared_data);
    });
};
function getScore(score) {
    let integerPart = Math.floor(score);
    let decimalPart = Number('0.' + (score % 1).toFixed(2).slice(2));
    const starPercentages = Array(5).fill(0);
    for (let i = 0; i < 5; i++) {
        if (integerPart > 0) {
            starPercentages[i] = 100;
            integerPart--;
        } else if (decimalPart > 0) {
            starPercentages[i] = decimalPart * 100;
            decimalPart = 0;
        } else {
            break;
        }
    }
    return starPercentages;
}
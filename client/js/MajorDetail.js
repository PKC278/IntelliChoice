var majorID = window.location.href.split('-')[1];
var worker = new Worker('js/MajorDetail_Worker.js');
worker.postMessage(majorID);
function getMajorDetail() {
    worker.onmessage = function (e) {
        xlcc = e.data.xlcc;
        zydm = e.data.zydm;
        zymc = e.data.zymc;
        xk = e.data.xk;
        zyjs = e.data.zyjs;
        xsgm = e.data.xsgm;
        boy_girlPercent = e.data.boy_girlPercent.split(',');
        zymyd = e.data.zymyd;
        zytjzsList = e.data.zytjzsList;
        simileZyList = e.data.simileZyList;
        kyfx = e.data.kyfx;
        jyfx = e.data.jyfx;
        xcspList = e.data.xcspList;

        const zymcContent = document.querySelector('.zymc p');
        const zydw = document.querySelectorAll('.zydw span');
        const zyjsContent = document.querySelector('.zyjs .content');
        const xsgmContent = document.getElementById('gm');
        const nvblContent = document.getElementById('nvbl');
        const zymydul = document.querySelectorAll('ul.zhmyd div:nth-child(2)');
        const zymydcount = document.querySelectorAll('ul.zhmyd div:nth-child(3) .count');
        const zytjzsContent = document.querySelector('.tjgx ul');
        const xjzyContent = document.querySelector('.xjzy .content');
        const kyfxContent = document.querySelector('.kyfx .content');
        const jyfxContent = document.querySelector('.cyfx .content');
        zymcContent.innerText = zymc;
        zydw[0].innerText = xlcc;
        zydw[1].innerText = zydm;
        zydw[2].innerText = zymc;
        zydw[3].innerText = xk;
        if (zyjs.length > 0)
            zyjsContent.innerText = zyjs;
        else {
            zyjsContent.innerHTML = `<span class="none">暂无数据</span>`;
        }
        xsgmContent.innerText = xsgm;
        if (boy_girlPercent[0] !== "0" && boy_girlPercent[1] !== "0")
            nvblContent.innerHTML = `<svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
                                <rect x="250" y="30" width="500" height="30" fill="#ffc596" rx="15" />
                                <rect x="250" y="30" width="${boy_girlPercent[0] / 100 * 500}" height="30" fill="#9abcff" rx="15">
                                </rect>
                                <text x="220" y="70" text-anchor="end" font-size="72" fill="#1db278">男${boy_girlPercent[0]}%</text>
                                <text x="1000" y="70" text-anchor="end" font-size="72" fill="#1db278">女${boy_girlPercent[1]}%</text>
                                </svg>`;
        else {
            nvblContent.innerHTML = `<span class="none">暂无数据</span>`;
        }
        manyidu(zymyd);
        for (let i = 0; i < 4; i++) {
            let starPercentages = getScore(zymyd[i].rank);
            zymydul[i].innerHTML = `
            <span>${zymyd[i].rank.toFixed(1)}</span>
            <div class="star">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                    <!-- Define the clip-path with a rectangle -->
                    <clipPath id="clip-path">
                        <!-- Change the width of this rectangle based on the percentage you want to fill with gold -->
                        <rect x="0" y="0" width="${starPercentages[0]}%" height="100%" fill="black" />
                        <!-- Black rectangle to reveal the gold fill based on the percentage -->
                    </clipPath>
                    <!-- Original SVG path -->
                    <path
                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                        fill="#e9e9e9" />
                    <!-- Filled SVG path with the clip-path applied -->
                    <path class="golden-fill"
                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                    <!-- Define the clip-path with a rectangle -->
                    <clipPath id="clip-path">
                        <!-- Change the width of this rectangle based on the percentage you want to fill with gold -->
                        <rect x="0" y="0" width="${starPercentages[1]}%" height="100%" fill="black" />
                        <!-- Black rectangle to reveal the gold fill based on the percentage -->
                    </clipPath>
                    <!-- Original SVG path -->
                    <path
                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                        fill="#e9e9e9" />
                    <!-- Filled SVG path with the clip-path applied -->
                    <path class="golden-fill"
                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                    <!-- Define the clip-path with a rectangle -->
                    <clipPath id="clip-path">
                        <!-- Change the width of this rectangle based on the percentage you want to fill with gold -->
                        <rect x="0" y="0" width="${starPercentages[2]}%" height="100%" fill="black" />
                        <!-- Black rectangle to reveal the gold fill based on the percentage -->
                    </clipPath>
                    <!-- Original SVG path -->
                    <path
                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                        fill="#e9e9e9" />
                    <!-- Filled SVG path with the clip-path applied -->
                    <path class="golden-fill"
                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                    <!-- Define the clip-path with a rectangle -->
                    <clipPath id="clip-path">
                        <!-- Change the width of this rectangle based on the percentage you want to fill with gold -->
                        <rect x="0" y="0" width="${starPercentages[3]}%" height="100%" fill="black" />
                        <!-- Black rectangle to reveal the gold fill based on the percentage -->
                    </clipPath>
                    <!-- Original SVG path -->
                    <path
                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                        fill="#e9e9e9" />
                    <!-- Filled SVG path with the clip-path applied -->
                    <path class="golden-fill"
                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                    <!-- Define the clip-path with a rectangle -->
                    <clipPath id="clip-path">
                        <!-- Change the width of this rectangle based on the percentage you want to fill with gold -->
                        <rect x="0" y="0" width="${starPercentages[4]}%" height="100%" fill="black" />
                        <!-- Black rectangle to reveal the gold fill based on the percentage -->
                    </clipPath>
                    <!-- Original SVG path -->
                    <path
                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
                        fill="#e9e9e9" />
                    <!-- Filled SVG path with the clip-path applied -->
                    <path class="golden-fill"
                        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z" />
                </svg>
        </div>
            `;
            zymydcount[i].innerText = zymyd[i].count;
        }
        if (zytjzsList.length > 0)
            for (let i = 0; i < zytjzsList.length; i++) {
                zytjzsContent.innerHTML += `
                <li>
                    <span>${zytjzsList[i].yxmc}</span>
                    <span>${zytjzsList[i].rank}（${zytjzsList[i].count}人）</span>
                </li>
                `;
            }
        else {
            document.querySelector(".tjgx .content").innerHTML = `<span class="none">暂无数据</span>`;
        }
        if (simileZyList.length > 0)
            for (let i = 0; i < simileZyList.length; i++) {
                xjzyContent.innerHTML += `
                <span><a target="_blank" href="detail-${simileZyList[i].specId}">${simileZyList[i].zymc}</a></span>
                `;
            }
        else {
            document.querySelector('.xjzy .content').innerHTML = `<span class="none">暂无数据</span>`;
        }
        if (kyfx.length > 0)
            for (let i = 0; i < kyfx.length; i++) {
                kyfxContent.innerHTML += `
                <span>${kyfx[i].zymc}</span>
                `;
            }
        else {
            document.querySelector('.kyfx .content').innerHTML = `<span class="none">暂无数据</span>`;
        }
        if (jyfx.length > 0)
            for (let i = 0; i < jyfx.length; i++) {
                jyfxContent.innerHTML += `
                <span>${jyfx[i]}</span>
                `;
            }
        else {
            document.querySelector('.cyfx .content').innerHTML = `<span class="none">暂无数据</span>`;
        }
        if (xcspList.length > 0)
            pjyx(xcspList);
        else {
            document.querySelector('.xcsp .content').innerHTML = `<span class="none">暂无数据</span>`;
        }
    }
}
function manyidu(zymyd) {
    // 获取Canvas元素
    const radarChart = document.getElementById('radarChart');
    // 基于Canvas创建一个ECharts实例
    var RaderChart = echarts.init(radarChart);
    // 定义颜色
    const vertexColor = '#59bb73';  // 四个顶点颜色
    const areaColor = '#d6f0e0';    // 内部面积颜色
    const textColor = 'black';      // 文字颜色
    // 定义雷达图的配置项
    const option = {
        grid: {
            left: '0', // 调整左边距以实现右偏移
            right: '0', // 可以根据需要调整右边距
            containLabel: false // 自动计算标签大小
        },
        radar: {
            shape: 'circle', // 设置为圆形
            indicator: [
                { name: `${zymyd[0].typeDesc}`, max: 5, color: textColor },
                { name: `${zymyd[1].typeDesc}`, max: 5, color: textColor },
                { name: `${zymyd[2].typeDesc}`, max: 5, color: textColor },
                { name: `${zymyd[3].typeDesc}`, max: 5, color: textColor }
            ]
        },
        series: [{
            name: '分数',
            type: 'radar',
            silent: true,
            data: [
                {
                    value: [zymyd[0].rank, zymyd[1].rank, zymyd[2].rank, zymyd[3].rank],
                    areaStyle: {
                        color: areaColor  // 内部面积颜色
                    },
                    lineStyle: {
                        color: 'transparent'  // 移除连接线的颜色
                    },
                    itemStyle: {
                        color: vertexColor  // 四个顶点颜色
                    }
                }
            ]
        }],
        color: [vertexColor]  // 四个顶点颜色
    };

    // 使用配置项渲染雷达图
    RaderChart.setOption(option);
    window.addEventListener('resize', function () {
        RaderChart.resize();
        // 检查屏幕宽度，如果小于 768 则设置雷达图的半径为 50%
        if (window.innerWidth < 768) {
            RaderChart.setOption({
                radar: {
                    radius: '50%'
                }
            });
        } else {
            RaderChart.setOption({
                radar: {
                    radius: '70%'
                }
            });
        }
    });
}
function pjyx(xcspList) {
    xdata = [];
    for (let i = 0; i < xcspList.length; i++) {
        xdata.push(xcspList[i].ssmc);
    }
    xvalue = [];
    for (let i = 0; i < xcspList.length; i++) {
        xvalue.push(xcspList[i].salary);
    }
    // 获取包含柱状图的容器
    const barChart = document.getElementById('barChart');

    // 基于容器创建一个 ECharts 实例
    var BarChart = echarts.init(barChart);

    // 定义 Y 轴刻度
    const yAxisData = ['0', '3000', '6000', '9000', '12000', '15000'];

    // 自定义 Y 轴标签格式化函数
    function formatYAxisLabel(value) {
        // 将数字格式化为每三位加一个逗号的形式
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 定义柱状图的配置项
    const option = {
        grid: {
            left: '0', // 调整左边距以实现右偏移
            right: '0', // 可以根据需要调整右边距
            containLabel: true // 自动计算标签大小
        },
        xAxis: {
            type: 'category',
            data: xdata,  // X 轴的数据
            axisLabel: {
                show: true  // 显示文字标签
            },
            axisLine: {
                show: false  // 不显示X轴线
            },
            axisTick: {
                show: false  // 不显示X轴刻度
            }
        },
        yAxis: {
            type: 'value',
            data: yAxisData,  // Y 轴的刻度数据
            axisLabel: {
                show: true,  // 显示文字标签
                color: 'black', // 文字颜色设置为黑色
                fontSize: 14,  // 文字大小设置为 12
                formatter: formatYAxisLabel // 使用自定义格式化函数
            },
            axisTick: {
                show: false  // 不显示刻度标记
            },
            boundaryGap: false,  // 设置 Y 轴从坐标原点开始
            splitLine: {
                show: true,  // 显示虚线
                lineStyle: {
                    type: 'dashed'  // 设置虚线样式
                }
            }
        },
        tooltip: {
            trigger: 'axis', // 触发类型为坐标轴
            formatter: '{b}: {c}' // 提示框内容格式
        },
        series: [{
            type: 'bar',
            data: xvalue,  // 柱状图的数据
            barWidth: 15,  // 设置柱宽
            itemStyle: {
                borderRadius: [10, 10, 10, 10],  // 设置圆角矩形
                color: '#6e96f7'  // 设置柱状图颜色为#6e96f7
            }
        }]
    };
    // 使用配置项渲染柱状图
    BarChart.setOption(option);
    window.addEventListener('resize', function () {
        BarChart.resize();
    });
}
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
main = () => {
    getMajorDetail();
}

try {
    main();
} catch (e) {
    window.onload = main;
}

self.onmessage = function (e) {
    getSchoolDetail(e.data);
};
function getSchoolDetail(schoolID) {
    // 获取学校详情
    fetch('/api/getSchoolDetail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "schoolID": schoolID })
    }).then(res => {
        return res.json();
    }).then(data => {
        self.postMessage(data);
    })
}
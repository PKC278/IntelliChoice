self.onmessage = function (e) {
    getMajorDetail(e.data);
};
function getMajorDetail(specId) {
    // 获取学校详情
    fetch('/api/getMajorDetail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "specId": specId })
    }).then(res => {
        return res.json();
    }).then(data => {
        self.postMessage(data);
    })
}
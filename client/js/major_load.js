self.onmessage = function (e) {
    const type = e.data.type;
    const Category = e.data.Category;
    const Professional = e.data.Professional;
    const search = e.data.search;
    fetch('/api/majorList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: type,
            Category: Category,
            Professional: Professional,
            search: search
        })
    }).then(res => {
        return res.json();
    }).then(data => {
        self.postMessage(data);
    })
}
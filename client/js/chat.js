var chatID = '';
try {
    class NetworkError extends Error {
        constructor(message) {
            super(message);
            this.name = 'NetworkError';
        }
    }
} catch (error) {
}
function getChatList() {
    // 获取cookie中的token
    const token = document.cookie.split(';')[0].split('=')[1];
    data = { "token": token };
    fetch('/api/chat/list', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            let chatlist = document.getElementById("chatlist");
            chatlist.innerHTML = '';
            data.forEach((item) => {
                // 创建li
                let li = document.createElement("li");
                li.classList.add('chatlist-item');
                item.historyName = item.historyName.slice(0, 15);
                const historyList = `
                <div>
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    <span class="chatName">${item.historyName}</span>
                </div>
                <div class="history-del">
                    <div class="historyDelBtn">
                        <svg t="1691832751931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5077" width="16" height="16"><path d="M214.6048 298.666667v598.613333a41.429333 41.429333 0 0 0 41.386667 41.386667h513.28c22.869333 0 41.386667-18.56 41.386666-41.386667V298.666667h-596.053333z m554.666667 725.333333h-513.28c-69.845333 0-126.72-56.832-126.72-126.72V213.333333h766.72v683.946667c0 69.888-56.832 126.72-126.72 126.72z" fill="#000000" p-id="5078"></path><path d="M981.333333 298.666667H42.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667h938.666666c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667M768 213.333333H682.666667V128c0-23.509333-19.114667-42.666667-42.666667-42.666667H384c-23.509333 0-42.666667 19.157333-42.666667 42.666667v85.333333H256V128c0-70.570667 57.429333-128 128-128h256c70.570667 0 128 57.429333 128 128v85.333333zM384 810.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667V469.333333c0-23.466667 19.2-42.666667 42.666667-42.666666s42.666667 19.2 42.666667 42.666666v298.666667c0 23.466667-19.2 42.666667-42.666667 42.666667M640 810.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667V469.333333c0-23.466667 19.2-42.666667 42.666667-42.666666s42.666667 19.2 42.666667 42.666666v298.666667c0 23.466667-19.2 42.666667-42.666667 42.666667" fill="#000000" p-id="5079"></path></svg>
                    </div>
                </div>
                `
                li.innerHTML = historyList;
                li.setAttribute("id", item.Id);
                chatlist.appendChild(li);
            });
            historyDel();
            LoadHistory();
        });
}
function LoadHistory() {
    let chatlist_item = document.querySelectorAll(".chatlist-item");
    let historyDelbtns = document.querySelectorAll('.historyDelBtn');
    chatlist_item.forEach((item) => {
        item.addEventListener("click", function (event) {
            // 如果class中包含Delete
            if (event.target.classList.contains("Delete")) {
                return;
            }
            // 移除所有active类
            chatlist_item.forEach((item) => {
                item.classList.remove("active");
            });
            event.preventDefault();
            // 获取id
            var id = item.getAttribute("id");
            // 关闭侧边栏
            document.querySelector('.btn-close').click();

            // 添加active类
            item.classList.add("active");
            // 赋值chatID
            chatID = id;
            // 清空聊天记录
            const messageDiv = document.querySelector('.message_div');
            window.scrollTo(0, document.body.scrollHeight);
            messageDiv.innerHTML = `
            <div class="load">
                <hr/><hr/><hr/><hr/>
            </div>
            `;
            // 加载聊天记录
            const token = document.cookie.split(';')[0].split('=')[1];
            data = { "token": token, "chatID": chatID };
            fetch('/api/chat/history', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.ok) {
                        messageDiv.innerHTML = '';
                        return response.json();
                    }
                })
                .then((data) => {
                    var data = data.map(function (obj) {
                        var { assistant, user } = obj;
                        return { user: user, assistant: assistant };
                    });
                    data.forEach(function (obj) {
                        // 遍历每个对象
                        for (var key in obj) {
                            if (key === "user") {
                                const messageDiv = document.querySelector('.message_div');
                                const newQuestion = document.createElement('div');
                                newQuestion.classList.add('question');

                                const newParagraph = document.createElement('p');
                                newParagraph.classList.add('question_paragraph');
                                newParagraph.innerHTML = obj[key].replace(/\n/g, '<br>');

                                newQuestion.appendChild(newParagraph);
                                messageDiv.appendChild(newQuestion);
                            }
                            else if (key === "assistant") {
                                const oldReply = document.querySelector('.ai_reply');
                                if (oldReply) {
                                    oldReply.classList.remove('ai_reply');
                                    oldReply.removeAttribute('id');
                                }
                                const assistantMessage = document.querySelector('.message_div');
                                const newReply = document.createElement('div');
                                newReply.classList.add('markdown-body');
                                newReply.classList.add('ai_reply');
                                newReply.classList.add('ai_replyTag');
                                newReply.setAttribute('id', 'content');
                                let result = marked.parse(obj[key], { mangle: false, headerIds: false, headerPrefix: false });
                                newReply.innerHTML = result;
                                assistantMessage.appendChild(newReply);
                            }
                        }
                    });
                });
        });
    });
    historyDelbtns.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.stopPropagation(); // 阻止事件冒泡
        });
    });
};
function historyDel() {
    let historyDelbtns = document.querySelectorAll('.historyDelBtn');
    // 遍历所有元素，添加事件监听器
    historyDelbtns.forEach(function (historyDelbtn) {
        historyDelbtn.addEventListener('click', function () {
            if (historyDelbtn.classList.contains('historyDelBtnLoading')) {
                return;
            }
            // 显示父元素
            console.log(historyDelbtn.parentNode.parentNode);
            historyDelbtn.parentNode.parentNode.classList.add('Delete');

            // 获取父元素id
            let chatid = historyDelbtn.parentNode.parentNode.getAttribute("id");
            historyDelbtn.classList.remove('historyDelBtn');
            historyDelbtn.classList.add('historyDelBtnLoading');
            historyDelbtn.innerHTML = `
            <span class="spinner-border spinner-border-sm"></span>
            `;
            // 如果class中包含active
            if (historyDelbtn.parentNode.parentNode.classList.contains("active")) {
                document.querySelector('.newChat').click();
            }
            // 删除聊天记录
            fetch('/api/chat/delChat', {
                method: 'POST',
                body: JSON.stringify({ "chatID": chatid }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.ok) {
                        // 删除元素
                        historyDelbtn.parentNode.parentNode.remove();
                        return response.json();
                    }
                })
        });
    });
}
try {
    var canScroll = true;
    var lastScrollTime = 0;
} catch (e) { }
function scrollToBottomIfNeeded() {
    const currentTime = Date.now();
    if (!canScroll || currentTime - lastScrollTime < 200) {
        return;
    }
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollHeight - (scrollTop + windowHeight) <= 0.05 * scrollHeight) {
        canScroll = false;
        window.scrollTo(0, scrollHeight);
        lastScrollTime = currentTime;
        setTimeout(() => {
            canScroll = true;
        }, 50);
    }
}
function newChat() {
    const newChatButton = document.querySelector('.newChat');
    newChatButton.addEventListener('click', () => {
        const messageDiv = document.querySelector('.message_div');
        messageDiv.innerHTML = '';
        chatID = '';
        let chatlist_item = document.querySelectorAll(".chatlist-item");
        chatlist_item.forEach((item) => {
            item.classList.remove("active");
        });
        document.querySelector('.btn-close').click();
    })
}
function main() {
    let aiReplyDiv = null;
    let sse = null;
    const sendBar = document.querySelector('.search');
    const searchBar = document.getElementById("searchBar");
    getChatList();
    newChat();
    function ClearSearchBar() {
        sendBar.style.removeProperty("border");
    }
    document.addEventListener("click", function (event) {

        if (event.target !== searchBar && !sendBar.contains(event.target)) {
            ClearSearchBar();
        }
    });

    const typingAnimation = `
      <div style="display: flex; align-items: center;" class="typingAnimation">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `;

    const sendButton = document.querySelector('.send-button');

    searchBar.addEventListener('input', () => {
        if (searchBar.value) {
            sendButton.classList.remove('disabled');
        } else {
            sendButton.classList.add('disabled');
        }
    });
    const inputField = document.querySelector('.input-field');
    // 获取具有相同类名的元素列表
    var introduce = document.getElementsByClassName("introduce-card");
    // 遍历元素列表，为每个元素添加点击事件监听器
    for (var i = 0; i < introduce.length; i++) {
        introduce[i].addEventListener("click", function () {
            // 在点击事件处理程序中获取被点击元素的文本内容
            var text = this.innerText;
            text = text.replace(/"/g, "");
            text = text.replace(/\\n/g, "");
            text = text.replace(/\n/g, "");
            inputField.value = text;
            sendButton.click();
        });
    }

    const handleSend = () => {
        document.activeElement.blur();
        // 检查cookie中是否有token，如果没有则跳转到登录页面
        if (document.cookie.indexOf('token') === -1) {
            savePreviousPage()
            // 检测屏幕尺寸
            var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            // 根据屏幕宽度决定跳转的URL
            var url = screenWidth < 767 ? '/login?wap=true' : '/login';
            window.location.href = url;
            return;
        }
        const sessionId = Math.random().toString(36).slice(-8);
        const inputValue = inputField.value.replace(/\r?\n/g, "\\n");
        let result = "";

        if (inputValue === '') {
            return;
        }

        if (sse) {
            // 关闭旧SSE
            sse.close();
            sse = null;
        }

        const messageDiv = document.querySelector('.message_div');
        const newQuestion = document.createElement('div');
        newQuestion.classList.add('question');

        const newParagraph = document.createElement('p');
        newParagraph.classList.add('question_paragraph');
        newParagraph.innerHTML = inputValue.replace(/\\n/g, '<br>');

        newQuestion.appendChild(newParagraph);
        messageDiv.appendChild(newQuestion);

        const oldReply = document.querySelector('.ai_reply');
        if (oldReply) {
            oldReply.classList.remove('ai_reply');
            oldReply.removeAttribute('id');
        }
        window.scrollTo(0, document.body.scrollHeight);
        const assistantMessage = document.querySelector('.message_div');
        const newReply = document.createElement('div');
        newReply.classList.add('markdown-body');
        newReply.classList.add('ai_reply');
        newReply.classList.add('ai_replyTag');
        newReply.setAttribute('id', 'content');
        assistantMessage.appendChild(newReply);
        newReply.innerHTML = typingAnimation;

        inputField.textContent = '';
        inputField.value = '';
        inputField.innerHTML = '';
        sendButton.classList.add('disabled');
        aiReplyDiv = document.querySelector('.ai_reply');
        scrollToBottomIfNeeded();

        const appendMessage = (message) => {
            aiReplyDiv.innerHTML = message;
            const result = marked.parse(aiReplyDiv.innerHTML + `<span class="blinking-cursor"></span>`, { mangle: false, headerIds: false, headerPrefix: false });
            document.getElementById('content').innerHTML = result;
            scrollToBottomIfNeeded();
        };
        const history = document.querySelector('.history');
        history.addEventListener('click', () => {
            // 如果chatID有值
            if (chatID) {
                try {
                    const newChatItem = document.getElementById(chatID);
                    newChatItem.classList.add('active');
                } catch {
                    // 等待一秒
                    setTimeout(() => {
                        const newChatItem = document.getElementById(chatID);
                        newChatItem.classList.add('active');
                    })
                }
            }
        })

        const startSSE = () => {
            // 开始SSE
            sse = new EventSource('/api/chat/stream');
            const listener = function (event) {
                const message = JSON.parse(event.data).message;
                result += message;
                appendMessage(result);
            };
            sse.addEventListener('ai_message_' + sessionId, listener);
        };

        startSSE();
        function sendChatRequest(inputValue, sessionId, sendButton, sse, typingAnimation) {
            const controller = new AbortController();
            const signal = controller.signal;
            // 获取cookie中的token
            const token = document.cookie.split(';')[0].split('=')[1];
            const data = { ask: inputValue, "sessionId": sessionId, "token": token, "chatID": chatID };
            sendButton.disabled = true;
            document.getElementById('charCount').textContent = 0;
            sendButton.innerHTML = typingAnimation;
            // 绑定取消按钮
            const cancelButton = document.querySelector('.cancel-button');
            cancelButton.classList.remove('hide');

            // 存储fetch请求的响应处理链
            let fetchResponseChain;

            cancelButton.addEventListener('click', () => {
                sse.close();
                sse = null;
                controller.abort();
                document.querySelector('.blinking-cursor').remove();
                cancelButton.classList.add('hide');
                sendButton.disabled = false;
                sendButton.innerHTML = "发送";
                document.querySelector('.ai_reply').classList.add('errorChat');
                document.querySelector('.ai_reply').innerHTML += '<span style="color: red;">载入未完成</span>';
                // 取消fetch响应的处理
                if (fetchResponseChain) {
                    fetchResponseChain = null; // 清空处理链
                }
            });
            // 存储fetch请求的响应处理链
            fetchResponseChain = fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                signal
            })
                .then((response) => {
                    if (response.ok) {
                        document.querySelector('.blinking-cursor').remove();
                        sendButton.disabled = false;
                        sendButton.innerHTML = "发送";
                        cancelButton.classList.add('hide');
                        sse.close();
                        sse = null;
                    }
                    return response.json();
                })
                .then((data) => {
                    // 处理响应数据
                    chatID = data['chatID'];
                    // 将chatID转成字符串
                    chatID = chatID.toString();
                    getChatList();
                    setTimeout(function () {
                        // 获取列表第一个
                        let firstChat = document.querySelector(".chatlist-item");
                        // 获取里面的span
                        let firstChatName = firstChat.querySelector(".chatName").textContent;
                        if (firstChatName == "新对话") {
                            // 等待2秒
                            setTimeout(function () {
                                getChatList();
                            }, 2000);
                        }
                    }, 1000);
                })
                .catch((error) => {
                    // 处理网络请求失败等错误
                    if (error instanceof NetworkError) {
                        document.querySelector('.blinking-cursor').remove();
                        document.querySelector('.ai_reply').classList.add('errorChat');
                        document.querySelector('.ai_reply').innerHTML += `<span style="color: red;">${error.message}</span>`;
                    }
                });
        };
        sendChatRequest(inputValue, sessionId, sendButton, sse, typingAnimation);
    };

    const handleKeyPress = (event) => {
        // 检查按键是否为回车键，如果是则调用handleSend函数
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendButton.click();
        }
    };

    sendButton.addEventListener('click', handleSend);
    inputField.addEventListener('keydown', handleKeyPress);

    const textArea = document.getElementById('searchBar');
    const charCountSpan = document.getElementById('charCount');

    textArea.addEventListener('input', function () {
        const text = textArea.value;
        const charCount = text.length;
        charCountSpan.textContent = charCount;
    });
}

try {
    main();
} catch (e) {
    window.onload = main;
}
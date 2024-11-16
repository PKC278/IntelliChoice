from flask import Flask, request, render_template, jsonify, redirect, make_response
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_sse import sse
from chatgpt import ChatGPT
from jdbc import DB
import random
import string
import time
import json
import os
import requests
import redis
from flask_executor import Executor
from datetime import timedelta
from pywebio.platform.flask import webio_view
from Holland.HollandTest import run

app = Flask(
    __name__,
    template_folder="../client/pages",
    static_folder="../client",
    static_url_path="",
)
executor = Executor(app)
redis_host = os.getenv(
    "REDIS_HOST", "localhost"
)  # 从环境变量中读取Redis地址，默认为localhost
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_host=1)
app.config["REDIS_URL"] = f"redis://{redis_host}"  # 指定Redis的URL
app.register_blueprint(sse, url_prefix="/api/chat/stream")  # 注册SSE蓝图
app.add_url_rule("/hollandTest", "webio_view", webio_view(run), methods=["GET", "POST"])
redis_client = redis.StrictRedis(host=redis_host, db=1)


def generate_random_sequence(length):
    # 从所有大小写字母和数字中生成随机序列
    characters = string.ascii_letters + string.digits
    # 生成指定长度的随机序列
    random_sequence = "".join(random.choice(characters) for _ in range(length))
    return random_sequence


# 获取用户 IP 和归属地
# def get_visitor_location():
#     ip = request.remote_addr  # 获取用户 IP
#     # 尝试从缓存中获取结果
#     cached_location = redis_client.get(ip)
#     if cached_location:
#         return ip, cached_location.decode("utf-8")
#     if ip == "127.0.0.1":
#         UserLocation = "本机"
#         redis_client.setex(ip, 3600, UserLocation)
#         return ip, UserLocation
#     # 如果缓存中没有结果，则请求API
#     getUserLocationURL = f"http://whois.pconline.com.cn/ipJson.jsp?ip={ip}&json=true"
#     try:
#         UserLocation = requests.get(getUserLocationURL).json()
#         pro = UserLocation.get("pro")
#         city = UserLocation.get("city")
#         UserLocation = pro + city
#     except:
#         UserLocation = "未知"
#     # 将结果存入缓存
#     redis_client.setex(ip, 3600, UserLocation)
#     return ip, UserLocation


@app.route("/favicon.ico")
def favicon():
    return app.send_static_file("images/favicon.ico")


@app.route("/index_back")
def index_back():
    return render_template("index_back.html")


@app.route("/")
@app.route("/index")
@app.route("/chat")
@app.route("/school")
@app.route("/major")
@app.route("/cjcx")
@app.route("/holland-test")
def web():
    return render_template("header.html")


@app.route("/login", methods=["GET"])
def login():
    wap = request.args.get("wap", default=None, type=str)
    if wap == "true":
        return render_template("login_wap.html")
    else:
        return render_template("login.html")


@app.route("/school-<id>")
def school(id):
    return render_template("header.html")


@app.route("/detail-<id>")
def detail(id):
    return render_template("header.html")


# 定义404错误处理
@app.route("/404")
def not_found():
    return render_template("404.html"), 404


@app.errorhandler(404)
def page_not_found(error):
    return redirect("/404")


@app.route("/api/chat", methods=["POST"])
def api():
    beijing_time = time.strftime("%Y-%m-%d %H:%M", time.localtime())
    data = request.get_json()
    user_question = data.get("ask")
    sessionId = data.get("sessionId")
    token = data.get("token")
    chatID = data.get("chatID")
    result = DB.get(f"SELECT UserId FROM Users WHERE Token = '{token}'")
    UserId = result[0][0]
    result = ""
    if chatID != "":
        history = DB.get(f'SELECT History FROM History WHERE Id = "{chatID}"')
        history = history[0][0]
    else:
        history = "None"
    for chunk in ChatGPT.run_conversation(user_question, history):
        if chunk.choices[0].finish_reason == "stop":
            break
        response_message = chunk.choices[0].delta.content
        sse.publish({"message": f"{response_message}"}, type=f"ai_message_{sessionId}")
        result += response_message

    newhistory = {}
    newhistory["user"] = user_question
    newhistory["assistant"] = result
    if chatID == "":
        DB.insert(
            f'INSERT INTO History(Time, UserId, History) VALUES("{beijing_time}", "{UserId}", "{newhistory}")'
        )
        chatID = DB.get(
            f'SELECT Id FROM History WHERE UserId = "{UserId}" AND History = "{newhistory}" AND Time = "{beijing_time}"'
        )
        chatID = chatID[0][0]
        response_data = {"chatID": chatID}
        executor.submit(long_running_job, newhistory, chatID)
    else:
        history = str(history) + "," + str(newhistory)
        DB.insert(f'UPDATE History SET History = "{history}" WHERE Id = "{chatID}"')
        response_data = {"chatID": chatID}
    return jsonify(response_data)


def long_running_job(newhistory, chatID):
    title = ChatGPT.generate_title(newhistory)
    DB.insert_query(title, chatID)


@app.route("/api/chat/list", methods=["POST"])
def history():
    data = request.get_json()
    token = data.get("token")
    result = DB.get(f"SELECT UserId FROM Users WHERE Token = '{token}'")
    try:
        UserId = result[0][0]
        result = DB.get(
            f"SELECT Id,historyName FROM History WHERE UserId = '{UserId}' ORDER BY Id DESC"
        )
        # 转换为字典列表
        dict_list = [{"Id": item[0], "historyName": item[1]} for item in result]
    except:
        dict_list = []
    # 转换为 JSON 字符串
    json_data = json.dumps(dict_list)
    json_data = json.loads(json_data)
    return jsonify(json_data)


@app.route("/api/chat/delChat", methods=["POST"])
def delChat():
    data = request.get_json()
    chatID = data.get("chatID")
    DB.insert(f'DELETE FROM History WHERE Id = "{chatID}"')
    return jsonify({"status": "success"})


@app.route("/api/chat/history", methods=["POST"])
def history_detail():
    data = request.get_json()
    chatID = data.get("chatID")
    token = data.get("token")
    result = DB.get(f"SELECT UserId FROM Users WHERE Token = '{token}'")
    UserId = result[0][0]
    result = DB.get(
        f"SELECT History FROM History WHERE Id = '{chatID}' AND UserId = '{UserId}'"
    )
    history = result[0][0]
    # 替换单引号为双引号
    history = history.replace("'", '"')
    # 去除换行符
    history = history.replace("\n", "\\n")
    # 添加外层的方括号，将字符串变为一个有效的 JSON 数组
    history = f"[{history}]"
    # 将字符串转换为 JSON 对象
    history = json.loads(history)
    return jsonify(history)


@app.route("/api/register", methods=["POST"])
def register_post():
    # 接收前端传来的数据
    data = request.get_json()
    register_username = data.get("register_username")
    register_email = data.get("register_email")
    register_password = data.get("register_password")
    # rememberMe = data.get('rememberMe')
    beijing_time = time.strftime("%Y-%m-%d %H:%M", time.localtime())
    try:
        DB.insert(
            f"INSERT INTO Users (UserName, UserEmail, UserPwd,RegTime) VALUES ('{register_username}', '{register_email}', '{register_password}','{beijing_time}')"
        )
        status = "1"
    except:
        status = "注册失败"

        # 构建要返回的数据
    response_data = {"status": status}

    # 返回JSON响应
    return jsonify(response_data)


@app.route("/api/login", methods=["POST"])
def login_post():
    # 接收前端传来的数据
    data = request.get_json()
    login_email = data.get("login_email")
    login_password = data.get("login_password")
    # rememberMe = data.get('rememberMe')
    beijing_time = time.strftime("%Y-%m-%d %H:%M", time.localtime())
    try:
        result = DB.get(
            f"SELECT * FROM Users WHERE UserEmail = '{login_email}' AND UserPwd = '{login_password}'"
        )
        UserName = result[0][1]
        UserEmail = result[0][2]
        status = "1"

        # 生成登录 cookie
        random_sequence = generate_random_sequence(30)
        response = make_response(jsonify({"status": status}))
        response.set_cookie("token", random_sequence, max_age=timedelta(days=30))
        # 更新数据库
        DB.insert(
            f"UPDATE Users SET Token='{random_sequence}', LastLogin = '{beijing_time}' WHERE UserEmail='{UserEmail}' AND UserPwd='{login_password}'"
        )

        return response

    except:
        status = "登录失败"

    # 构建要返回的数据
    response_data = {"status": status}

    # 返回JSON响应
    return jsonify(response_data)


@app.route("/api/user/verify", methods=["POST"])
def verify():
    data = request.get_json()
    token = data.get("token")
    result = DB.get(f"SELECT UserName FROM Users WHERE Token = '{token}'")
    try:
        UserName = result[0][0]
        return jsonify({"status": "1", "userName": UserName})
    except:
        return jsonify({"status": "0"})


@app.route("/api/getSchoolList", methods=["POST"])
def getSchoolList():
    # 获取接收到的数据
    data = request.get_json()
    address = data.get("address")
    type = data.get("type")
    level = data.get("level")
    feature = data.get("feature")
    search = data.get("search")
    page = data.get("page")
    if page <= 1:
        begin = 0
    else:
        begin = (page - 1) * 20
    sql = ""
    if address != "全部":
        sql += f"location = '{address}'"
    if type != "全部":
        if sql != "":
            sql += " AND "
        if type == "教育部":
            sql += f"governing_department = '教育部'"
        elif type == "其他部委":
            sql += f"governing_department != '教育部'"
        elif type == "地方":
            sql += f"governing_department != '教育部' AND governing_department != '中央军委训练管理部'"
        elif type == "军校":
            sql += f"governing_department = '中央军委训练管理部'"
    if level != "全部":
        if sql != "":
            sql += " AND "
        sql += f"education_level = '{level}'"
    if feature != "全部":
        if sql != "":
            sql += " AND "
        if feature == "“双一流”建设高校":
            sql += f"syl = 'True'"
        elif feature == "研究生院":
            sql += f"yjs = 'True'"
    if search != "":
        if sql != "":
            sql += " AND "
        sql += f"schoolName LIKE '%{search}%'"
    if sql != "":
        sql = "WHERE " + sql
    result = DB.get(
        f"SELECT schoolName,schoolBadge,location,manyidu,education_level,governing_department,syl,yjs,schoolID FROM colleges {sql} LIMIT {begin},20"
    )
    return jsonify(result)


@app.route("/api/getSchoolDetail", methods=["POST"])
def getSchoolDetail():
    data = request.get_json()
    schoolID = data.get("schoolID")
    result = DB.get(
        "SELECT schoolBadge,schoolName,followCount,governing_department,syl,yjs,location,txdz,xxwz,zswz,dh,avgRank,sjzh,wxQR,wbQR FROM colleges WHERE schoolID = "
        + schoolID
    )
    return jsonify(result)


@app.route("/api/getSchoolInfos", methods=["POST"])
def getSchoolInfos():
    data = request.get_json()
    schID = data.get("schoolID")
    fldName = data.get("fldName")
    result = DB.get(
        f'SELECT infos FROM fld WHERE schID = "{schID}" AND fldName = "{fldName}"'
    )
    result = json.loads(result[0][0])
    return jsonify(result)


@app.route("/api/getZyjsInfos", methods=["POST"])
def getZyjsInfos():
    data = request.get_json()
    schID = data.get("schoolID")
    result = DB.get(
        f'SELECT yxcc,type,zy,hasInfo,dicCurId,specId,categoryId FROM zyjsinfos WHERE schID = "{schID}"'
    )
    json_data = {}
    for items in result:
        yxcc = items[0]
        type = items[1]
        zy = items[2]
        hasInfo = items[3]
        # 如果yxcc作为键不存在，创建一个新的字典，否则使用现有字典
        if yxcc not in json_data:
            json_data[yxcc] = {}

        # 如果type作为键不存在，创建一个新的列表，否则使用现有列表
        if type not in json_data[yxcc]:
            json_data[yxcc][type] = []

        # 在type对应的列表中添加字典
        json_data[yxcc][type].append({"zy": zy, "hasInfo": hasInfo})

    return jsonify(json_data)


@app.route("/api/getZyjsDetail", methods=["POST"])
def getZyjsDetail():
    data = request.get_json()
    schID = data.get("schoolID")
    zyName = data.get("zyName")
    result = DB.get(
        f'SELECT zyjs FROM zyjsinfos WHERE schID = "{schID}" AND zy = "{zyName}" AND hasInfo = "True"'
    )
    result = result[0][0]

    return jsonify({"data": result})


@app.route("/api/majorList", methods=["POST"])
def majorList():
    data = request.get_json()
    type = data.get("type")
    if type == "search":
        search = data.get("search")
        searchList = ["本科（普通教育）", "本科（职业教育）", "高职（专科教育）"]
        zylist = []
        for item in searchList:
            result = DB.get(
                f'SELECT zymc,zydm,zymyd,specId FROM major WHERE Type="{item}" AND zymc LIKE "%{search}%"'
            )
            Professional = DB.get(
                f'SELECT Professional,zydm,zymyd FROM major WHERE Type="{item}" AND Professional LIKE "%{search}%"'
            )
            zymydTotal = 0.0
            zymydLen = 0
            for item in Professional:
                zymyd_str = item[2]
                if zymyd_str != "" and zymyd_str != "-" and zymyd_str != "0.0":
                    zymydLen += 1
                    zymydTotal += float(zymyd_str)

            # 计算平均值
            if zymydLen > 0:
                average_zymyd = zymydTotal / zymydLen
                average_zymyd = round(average_zymyd, 1)
                average_zymyd = str(average_zymyd)

            # 创建一个集合用于存放已经出现过的名称
            seen_names = set()
            for item in Professional:
                name, code, zymyd = item
                # 如果名称不在已经出现过的名称集合中，则添加到结果列表中，并将名称添加到已经出现过的名称集合中
                if name not in seen_names:
                    code = code[:-2]
                    item = (name, code, average_zymyd, code)
                    result.append(item)
                    seen_names.add(name)
            result = sorted(result, key=lambda x: int(x[1]))
            zylist.append(result)
        return jsonify({"type": "search", "zylist": zylist})

    Category = data.get("Category")
    Professional = data.get("Professional")
    select = "Category"
    where = f'Type = "{type}"'
    if Category:
        select += ",Professional"
        where += f' AND Category = "{Category}"'
    if Professional:
        select += ",zymc,zydm,specId,zymyd"
        where += f' AND Professional = "{Professional}"'
    sql = f"SELECT {select} FROM major WHERE {where}"
    items = DB.get(sql)
    Categorys = []
    Professionals = []
    Zys = []
    for item in items:
        Category = item[0]
        if Category not in Categorys:
            Categorys.append(Category)
        try:
            Professional = item[1]
            if Professional not in Professionals:
                Professionals.append(Professional)
        except:
            pass
        try:
            zymc = item[2]
            zydm = item[3]
            specId = item[4]
            zymyd = item[5]
            if zymyd == "":
                zymyd = "-"
            zyInfo = {"zymc": zymc, "zydm": zydm, "specId": specId, "zymyd": zymyd}
            Zys.append(zyInfo)
        except:
            pass
    Zys = sorted(Zys, key=lambda x: int(x["zydm"]))
    return jsonify({"Categorys": Categorys, "Professionals": Professionals, "Zys": Zys})


@app.route("/api/getMajorDetail", methods=["POST"])
def getMajorDetail():
    data = request.get_json()
    specId = data.get("specId")
    result = DB.get(
        f'SELECT xlcc,zydm,zymc,xk,zyjs,xsgm,boy_girlPercent,zymyd,zytjzsList,simileZyList,kyfx,jyfx,xcspList FROM majorInfo WHERE specId = "{specId}"'
    )
    result = result[0]
    xlcc = result[0]
    zydm = result[1]
    zymc = result[2]
    xk = result[3]
    zyjs = result[4]
    xsgm = result[5]
    boy_girlPercent = result[6]
    zymyd = result[7]
    zytjzsList = result[8]
    simileZyList = result[9]
    kyfx = result[10]
    jyfx = result[11]
    xcspList = result[12]
    return jsonify(
        {
            "xlcc": xlcc,
            "zydm": zydm,
            "zymc": zymc,
            "xk": xk,
            "zyjs": zyjs,
            "xsgm": xsgm,
            "boy_girlPercent": boy_girlPercent,
            "zymyd": json.loads(zymyd),
            "zytjzsList": json.loads(zytjzsList),
            "simileZyList": json.loads(simileZyList),
            "kyfx": json.loads(kyfx),
            "jyfx": json.loads(jyfx),
            "xcspList": json.loads(xcspList),
        }
    )


# @app.route("/api/userLocation", methods=["POST"])
# def getUserLocation():
#     ip, UserLocation = get_visitor_location()
#     return jsonify({"ip": ip, "location": UserLocation})


@app.route("/api/addFavorite", methods=["POST"])
def addFavorite():
    data = request.get_json()
    token = data.get("token")
    schoolID = data.get("schoolID")
    UserId = DB.get(f"SELECT UserId FROM Users WHERE Token = '{token}'")[0][0]
    FavoriteList = DB.get(f'SELECT List FROM Favorites WHERE UserId = "{UserId}"')
    if FavoriteList:
        DB.insert(
            f'UPDATE Favorites SET List = CONCAT(List, ",{schoolID}") WHERE UserId = "{UserId}"'
        )
    else:
        DB.insert(
            f'INSERT INTO Favorites(UserId, List) VALUES("{UserId}", "{schoolID}")'
        )
    return jsonify({"status": "success"})


@app.route("/api/delFavorite", methods=["POST"])
def delFavorite():
    data = request.get_json()
    token = data.get("token")
    schoolID = data.get("schoolID")
    UserId = DB.get(f"SELECT UserId FROM Users WHERE Token = '{token}'")[0][0]
    FavoriteList = DB.get(f'SELECT List FROM Favorites WHERE UserId = "{UserId}"')[0][
        0
    ].split(",")
    FavoriteList.remove(schoolID)
    DB.insert(
        f'UPDATE Favorites SET List = "{",".join(FavoriteList)}" WHERE UserId = "{UserId}"'
    )
    return jsonify({"status": "success"})


@app.route("/api/getFavoriteSchool", methods=["POST"])
def getFavorite():
    data = request.get_json()
    token = data.get("token")
    UserId = DB.get(f"SELECT UserId FROM Users WHERE Token = '{token}'")[0][0]
    FavoriteSchool = DB.get(f'SELECT List FROM Favorites WHERE UserId = "{UserId}"')
    if FavoriteSchool:
        FavoriteSchool = FavoriteSchool[0][0].split(",")
    return jsonify({"FavoriteSchool": FavoriteSchool})


@app.route("/api/getFavoriteSchoolInfo", methods=["POST"])
def getFavoriteSchoolInfo():
    data = request.get_json()
    token = data.get("token")
    UserId = DB.get(f"SELECT UserId FROM Users WHERE Token = '{token}'")[0][0]
    FavoriteSchool = DB.get(f'SELECT List FROM Favorites WHERE UserId = "{UserId}"')
    if FavoriteSchool:
        FavoriteSchool = FavoriteSchool[0][0].split(",")
    FavoriteSchool = [x for x in FavoriteSchool if x]
    # 逆序
    FavoriteSchool.reverse()
    FavoriteSchoolInfo = []
    for schoolID in FavoriteSchool:
        result = DB.get(
            f"SELECT schoolName,schoolBadge,location,manyidu,education_level,governing_department,syl,yjs,schoolID FROM colleges WHERE schoolID = {schoolID}"
        )
        FavoriteSchoolInfo.append(result[0])
    return jsonify({"FavoriteSchoolInfo": FavoriteSchoolInfo})


@app.route("/api/hotSchool", methods=["POST"])
def hotSchool():
    data = request.get_json()
    userLocation = data.get("userLocation")
    hotSchoolType = data.get("hotSchoolType")
    if hotSchoolType == "bk":
        hotSchoolType = "本科"
        sql_snippet = (
            f"location = '{userLocation}' AND education_level LIKE '%{hotSchoolType}%'"
        )
    elif hotSchoolType == "zk":
        hotSchoolType = "高职(专科)"
        sql_snippet = (
            f"location = '{userLocation}' AND education_level='{hotSchoolType}'"
        )
    elif hotSchoolType == "oth_bk":
        hotSchoolType = "本科"
        sql_snippet = (
            f"location != '{userLocation}' AND education_level LIKE '%{hotSchoolType}%'"
        )
    elif hotSchoolType == "oth_zk":
        hotSchoolType = "高职(专科)"
        sql_snippet = (
            f"location != '{userLocation}' AND education_level='{hotSchoolType}'"
        )
    hotSchoolMAXCount = (
        DB.get(f"SELECT COUNT(*) AS result_count FROM colleges WHERE {sql_snippet};")[0][0] - 12)  # fmt: skip
    hotSchoolCount = random.randint(0, hotSchoolMAXCount)
    result = DB.get(
        f"SELECT schoolName,schoolBadge,schoolID, REPLACE(university_type, '院校', '类') AS university_type,education_level FROM colleges WHERE {sql_snippet} ORDER BY followCount DESC LIMIT {hotSchoolCount},12;"
    )
    return jsonify({"hotSchool": result})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5100)

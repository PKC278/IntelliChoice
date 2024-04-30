import requests

# 和风天气API
qweather_key = ""


class getWeather:
    def get_weather(search, adms):
        search = search.split(",")
        adms = adms.split(",")
        weather = ""
        searchLen = len(search)
        admsLen = len(adms)
        # 选取最大的长度
        max_item = max(searchLen, admsLen)
        for item in range(max_item):
            try:
                location = search[item]
            except:
                location = search[item - 1]
            try:
                adm = adms[item]
            except:
                adm = adms[item - 1]
            response = requests.get(
                f"https://geoapi.qweather.com/v2/city/lookup?range=cn&location={location}&adm={adm}&number=1&key={qweather_key}"
            )
            if response.status_code == 200:
                try:
                    response = response.json().get("location")
                    for i in response:
                        name = i.get("name")
                        id = i.get("id")
                        fxLink = i.get("fxLink")
                        adm1 = i.get("adm1")
                        adm2 = i.get("adm2")
                        response = requests.get(
                            f"https://devapi.qweather.com/v7/weather/now?location={id}&key={qweather_key}"
                        )
                        # print(response.json())
                        obsTime = response.json().get("now").get("obsTime")
                        temp = response.json().get("now").get("temp")
                        text = response.json().get("now").get("text")
                        windDir = response.json().get("now").get("windDir")
                        windScale = response.json().get("now").get("windScale")
                        result = f"{adm1}{adm2}{name}:数据观测时间:{obsTime},气温:{temp}摄氏度,天气:{text},风向:{windDir},风力:{windScale}级,详细信息:{fxLink};"
                except:
                    result = f"{adm}{location}:未查询到数据;"
                weather += result
            else:
                print(response.status_code)
        return weather


if __name__ == "__main__":
    search = "朝阳"
    adms = "北京市,浙江省"
    print(getWeather.get_weather(search, adms))

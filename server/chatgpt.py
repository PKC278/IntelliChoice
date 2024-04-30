from openai import OpenAI
import json
from weather import getWeather
import time

client = OpenAI(
    api_key="",
    base_url="",
)

with open("server/plugin.json", "r", encoding="utf-8") as f:
    functions_json = json.load(f)


class ChatGPT:
    def get_current_weather(location, adms):
        result = getWeather.get_weather(location, adms)
        return result

    # def get_gaokao_scoreline(area, year, school, major, score):
    #     result = get_from_db.get_gaokao_scoreline(area, year, school, major, score)
    #     return result

    def run_conversation(user_question, history):
        messages = []
        if history != "None":
            # 替换单引号为双引号
            history = history.replace("'", '"')
            # 去除换行符
            history = history.replace("\n", "\\n")
            # 添加外层的方括号，将字符串变为一个有效的 JSON 数组
            history = f"[{history}]"
            # 将字符串转换为 JSON 对象
            history = json.loads(history)
            # 遍历history json
            for group in history:
                # 提取键值对
                for key, value in group.items():
                    messages.append({"role": key, "content": value})
        messages = messages[-6:]
        # 步骤1：将对话和可用功能发送给GPT
        beijing_time = time.strftime("%Y-%m-%d %H:%M", time.localtime())
        messages.append(
            {
                "role": "system",
                "content": f"现在是北京时间:{beijing_time},你是志愿智能平台的AI,你是一位高考咨询专家，使用markdown语法回复，叙述详细。只能调用一次函数，函数支持同时查询",
            }
        )
        messages.append({"role": "user", "content": user_question})

        attempt_count = 0
        while attempt_count < 3:
            try:
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=messages,
                    functions=functions_json,
                    function_call="auto",  # 默认情况下是自动的，但我们会明确指出
                    stream=True,
                )
                first_chunk = next(response).choices[0].delta
                break
            except Exception as e:
                # attempt_count += 1
                # if attempt_count == 3:
                #     print("请求过于频繁，请等待20秒后重试")
                #     time.sleep(20)
                # print("等待5秒后重试")
                # print(e)
                # time.sleep(5)
                break

        # 步骤2：检查GPT是否想调用一个函数
        if first_chunk.function_call is not None:
            arguments = ""
            function_name = first_chunk.function_call.name
            for chunk in response:
                if chunk.choices[0].finish_reason == "function_call":
                    break
                arguments = arguments + chunk.choices[0].delta.function_call.arguments
            messages.append(
                {
                    "role": "assistant",
                    "content": "null",
                    "function_call": {
                        "name": f"{function_name}",
                        "arguments": f"{arguments}",
                    },
                }
            )
            # 第三步：调用函数
            # 注意：JSON响应可能不总是有效的；请确保处理错误
            available_functions = {
                "get_current_weather": ChatGPT.get_current_weather,
                # "get_gaokao_scoreline": ChatGPT.get_gaokao_scoreline,
            }  # 在这个例子中只有一个函数，但你可以有多个函数
            fuction_to_call = available_functions[function_name]
            function_args = json.loads(arguments)
            # print(function_args)
            if function_name == "get_current_weather":
                function_response = fuction_to_call(
                    location=function_args.get("location"),
                    adms=function_args.get("adms"),
                )
            # elif function_name == "get_gaokao_scoreline":
            #     function_response = fuction_to_call(
            #         area=function_args.get("area"),
            #         year=function_args.get("year"),
            #         school=function_args.get("school"),
            #         major=function_args.get("major"),
            #         score=function_args.get("score"),
            #     )

            # 第四步：将函数调用和函数响应的信息发送给GPT
            # 扩展对话与GPT的回复
            messages.append(
                {
                    "role": "function",
                    "name": function_name,
                    "content": function_response,
                }
            )  # 扩展对话与函数的响应
            attempt_count = 0
            while attempt_count < 3:
                try:
                    second_response = client.chat.completions.create(
                        model="gpt-3.5-turbo", messages=messages, stream=True
                    )  # 从GPT中获取一个新的响应
                    break
                except Exception as e:
                    attempt_count += 1
                    if attempt_count == 3:
                        print("请求过于频繁，请等待20秒后重试")
                        time.sleep(20)
                    print("等待5秒后重试")
                    print(e)
                    time.sleep(5)
            return second_response
        else:
            return response

    def generate_title(history):
        # print(history)
        # 替换单引号为双引号
        history = str(history)
        history = history.replace("'", '"')
        # 去除换行符
        history = history.replace("\n", "\\n")
        # 添加外层的方括号，将字符串变为一个有效的 JSON 数组
        history = f"[{history}]"
        # 将字符串转换为 JSON 对象
        history = json.loads(history)
        # 遍历history json
        messages = []
        for group in history:
            # 提取键值对
            for key, value in group.items():
                messages.append({"role": key, "content": value})
        messages.append(
            {
                "role": "user",
                "content": "根据对话内容生成一个会话标题,不要带任何标点符号,直接输出一个短标题",
            }
        )
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo", messages=messages
        )
        # print(completion)
        title = completion.choices[0].message.content
        return title


if __name__ == "__main__":
    user_question = "写一个表格对比一下今天济南市和北京市的气温"
    # history = "{'user': '济南的天气', 'assistant': '据我获取的数据，当前济南的天气情况如下：\n\n- 观测时间：2023-07-05 11:24\n- 气温：33摄氏度\n- 天气：晴\n- 风向：西南风\n- 风力：2级\n\n请注意，天气情况可能会随时变化，请及时查看天气预报以获取最新信息。如需了解更多详细信息，请访问[济南天气网站](https://www.qweather.com/weather/jinan-101120101.html)。'}"
    history = ""
    print(ChatGPT.run_conversation(user_question, history))

from jdbc import DB


class get_from_db:
    def get_gaokao_scoreline(area, year, school, major, score):
        # 转换为字符串
        area = str(area)
        year = str(year)
        school = str(school)
        major = str(major)
        score = str(score)

        print(area, year, school, major, score)
        try:
            area = area.split(",")
            year = year.split(",")
            school = school.split(",")
            major = major.split(",")
            score = score.split(",")
            area_item = len(area)
            year_item = len(year)
            school_item = len(school)
            major_item = len(major)
            score_item = len(score)
            max_item = max(area_item, year_item, school_item, major_item, score_item)
        except:
            max_item = 1
        # 取出最大的
        sql = f"SELECT year, location, schoolName, average, maximum, majorName FROM MajorAdmissionScore WHERE "
        for i in range(max_item):
            area_i = i
            year_i = i
            school_i = i
            major_i = i
            score_i = i
            find = []
            if area:
                while True:
                    try:
                        if area[area_i] != "None":
                            find.append(f"location = '{area[area_i]}'")
                        break
                    except:
                        area_i -= 1
            if year:
                while True:
                    try:
                        if year[year_i] != "None":
                            find.append(f"year = '{year[year_i]}'")
                        break
                    except:
                        year_i -= 1
            if school:
                while True:
                    try:
                        if school[school_i] != "None":
                            find.append(f"schoolName LIKE '%{school[school_i]}%'")
                        break
                    except:
                        school_i -= 1
            if major:
                while True:
                    try:
                        if major[major_i] != "None":
                            find.append(f"majorName LIKE '%{major[major_i]}%'")
                        break
                    except:
                        major_i -= 1
            if score:
                while True:
                    try:
                        if score[score_i] != "None":
                            find.append(f"average >= {score[score_i]}")
                        break
                    except:
                        score_i -= 1
            where = ""
            # 将sql和find拼接，列表中的元素用AND拼接
            if len(find) > 0:
                where = where + " AND ".join(find)
                where = f"({where}) ORDER BY average LIMIT 10"
            if i == 0:
                sql = sql + where
            else:
                sql = sql + " OR " + where

        print(sql)
        result = DB.get(sql)
        result = result[0]
        result = {
            "年份": result[0],
            "考生地区": result[1],
            "学校": result[2],
            "平均分": result[3],
            "最高分": result[4],
            "专业": result[5],
        }
        return str(result)


if __name__ == "__main__":
    print(get_from_db.get_gaokao_scoreline("None", "2022", "None", "None", "680"))

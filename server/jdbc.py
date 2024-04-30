import mysql.connector
import os

host = os.getenv("DB_HOST", "localhost")  # 从环境变量中读取数据库地址，默认为localhost
port = 3306  # 数据库端口
user = "root"  # 数据库用户名
password = "root"  # 数据库密码
database = "school"  # 数据库名


# 建立数据库连接
def connect_to_database():
    mydb = mysql.connector.connect(
        host=host, port=port, user=user, password=password, database=database
    )
    return mydb


class DB:
    def get(sql):
        mydb = connect_to_database()
        # 创建游标对象
        mycursor = mydb.cursor()
        # 执行查询语句
        mycursor.execute(sql)
        # 获取查询结果
        myresult = mycursor.fetchall()
        # 关闭数据库连接
        mycursor.close()
        mydb.close()
        return myresult

    def insert(sql):
        mydb = connect_to_database()
        mycursor = mydb.cursor()
        mycursor.execute(sql)
        mydb.commit()
        # 关闭数据库连接
        mycursor.close()
        mydb.close()

    def insert_query(title, chatID):
        mydb = connect_to_database()
        mycursor = mydb.cursor()
        sql = "UPDATE History SET historyName = %s WHERE Id = %s"
        data = (title, chatID)
        mycursor.execute(sql, data)
        mydb.commit()
        mycursor.close()
        mydb.close()

## 前言

相信程序员使用shell命令的概率是很大的。本文列出小编常用的几个命令。

## 命令

1. 查看mongo进程

```
ps -ef | grep mongo
```

2. 关闭mongo进程

```
kill -2 PID 发送SIGINT信号
kill -15 PID 发送SIGTERM信号
kill -9 PID 建议不要使用
```

3. 启动mongodb服务

```
mongod --dbpath=/data/db/ --logpath=/data/log/mongodb.log --logappend --port=27017 --auth
```

4. 连接mongodb数据库

```
mongo -u admin -p 123456 –authenticationDatabase course-cms
```

谢谢阅读！

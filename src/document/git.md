## 本地项目首次与 github 项目关联

```
git remote add origin https----
```

## 拉取远程代码

```
git pull origin main
```

## 提交远程代码

```
git push origin main

```

## 提交代码 报错 OpenSSL SSL_read: Connection was reset, errno 10054

### 本地打开代理
![图 1](../../images/b96d16bbea5eddba63b48e0b1300e38213f9813bb404e226432f2a23a0b05185.png)  

### 执行以下命令再重新提交
```

git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890

```

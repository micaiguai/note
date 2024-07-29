# 基础使用

## 步骤

### 登录账号
```sh
docker login
```
### 拉取镜像
[镜像网址](https://hub.docker.com/)
```sh
docker pull mysql:5.7.9
```
### 创建网络
```sh
docker network create hadoop-network
```
### 根据docker-compose.yaml启动项目
```sh
# f: file; -d: daemon;
docker-compose -f docker-compose.yaml up -d
```

### 访问docker
```sh
# i: interactive; t: tty;
docker exec -it mysql bash
```

## 其他
### 登录mysql
```sh
# password: 123456;
mysql -u root -p
```

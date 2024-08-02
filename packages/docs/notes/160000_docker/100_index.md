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
# docker-compose.yml
version: '3'
services:
  mysql:
    image: mysql:5.7.44
    container_name: mysql
    restart: always
    volumes:
      - /home/m/zhangshiyu/docker/mysql/logs:/var/log/mysql
      - /home/m/zhangshiyu/docker/mysql/data:/var/lib/mysql
      - /home/m/zhangshiyu/docker/mysql/conf:/etc/mysql
    environment:
      TZ: Asia/Shanghai
      LANG: en_US.UTF-8
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: demo
    ports:
      - 3306:3306
```
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

# 基础使用

## 参考链接
[official-install-doc](https://docs.docker.com/engine/install/ubuntu/)

## 前置步骤
### 设置root用户密码
```sh
sudo passwd root
```

### 切换root用户
```sh
su
```
### 打开root用户的ssh
```sh
vim /etc/ssh/sshd_config
```
设置`PermitRootLogin`为`yes`
```plain
PermitRootLogin yes
```
```sh
systemctl restart sshd.service
```

### 设置hostname
修改`hostname`
```sh
vim /etc/hostname
```
修改`hostname`
```sh
vim /etc/hosts
```
```sh
reboot
```

## 安装
### 1. 删除冲突包
```sh
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

### 2. 下载
1. 设置`apt`的代理
```sh
sudo vi /etc/apt/apt.conf
```
写入
```sh
Acquire::http::proxy "http://192.168.231.1:7890/";
Acquire::ftp::proxy "ftp://192.168.231.1:7890/";
Acquire::https::proxy "https://192.168.231.1:7890/";
```
2. 设置`timezone`
```sh
# 查看当前timezone
timedatectl
# 展示timezone列表
timedatectl list-timezones
# 设置timezone
sudo timedatectl set-timezone Asia/Shanghai
```
3. 设置`docker`的`apt`仓库
```sh
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
# sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
# 上面的代码会超时，利用-E继承当前环境变量的代理下载
sudo -E curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
1. 安装`docker`
```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
1. 测试`docker`是否安装成功
```sh
sudo docker run hello-world
```

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

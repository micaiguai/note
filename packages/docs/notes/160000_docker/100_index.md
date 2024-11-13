# 基础使用

## 参考链接
[install-docker](https://docs.docker.com/engine/install/ubuntu/)
[images](https://hub.docker.com/)

## 安装docker和docker-compose
### 1. 删除冲突包
```sh
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

### 2. 设置`apt`的代理
```sh
sudo vim /etc/apt/apt.conf
```
写入
```sh
Acquire::http::proxy "http://192.168.231.1:7890/";
Acquire::ftp::proxy "ftp://192.168.231.1:7890/";
Acquire::https::proxy "http://192.168.231.1:7890/";
```
### 3. 设置`timezone`
```sh
# 查看当前timezone
timedatectl
# 展示timezone列表
timedatectl list-timezones
# 设置timezone
sudo timedatectl set-timezone Asia/Shanghai
```
### 4. 设置`docker`的`apt`仓库
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
### 5. 安装`docker`
```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
### 6. 配置`docker`的`proxy`
```sh
sudo mkdir /etc/systemd/system/docker.service.d
sudo vim /etc/systemd/system/docker.service.d/http-proxy.conf
```
写入
```plain
[Service]
Environment="HTTP_PROXY=http://192.168.231.1:7890/"
Environment="HTTPS_PROXY=http://192.168.231.1:7890/"
```
flush changes
```sh
sudo systemctl daemon-reload
```
verify change load
```sh
sudo systemctl show --property Environment docker
```
restart docker
```sh
sudo systemctl restart docker
```
### 7. 测试`docker`是否安装成功
```sh
sudo docker pull hello-world
sudo docker run hello-world
```

### 8. 配置`docker`无需`sudo`
```sh
# create docker group
sudo groupadd docker
# append(-a) user to group(-G)
sudo usermod -aG docker $USER
# switch to docker group terminal context
newgrp docker
# test
docker run hello-world
```

## 登录账号
```sh
docker login
```

## 进入容器操作
进入`nginx`容器执行`bash`
```sh
docker exec -it nginx /bin/bash
```

## 启用docker
如果`docker`服务中断了，通过命令启动
```sh
systemctl start docker
```

## 安装mysql

### 拉取镜像
```sh
sudo docker pull mysql:5.7
```

### 创建`docker-compose.yml`
```yml
version: '3.3'
services:
  db:
    image: mysql:5.7
    restart: always
    environment:
      TZ: Asia/Shanghai
      LANG: en_US.UTF-8
      MYSQL_DATABASE: db
      # So you don't have to use root, but you can if you like
      MYSQL_USER: user
      # You can use whatever password you like
      MYSQL_PASSWORD: password
      # Password for root access
      MYSQL_ROOT_PASSWORD: password
    ports:
      # <Port exposed> : <MySQL Port running inside container>
      - '3306:3306'
    expose:
      # Opens port 3306 on the container
      - '3306'
      # Where our data will be persisted
    volumes:
      - ./logs:/var/log/mysql
      - ./data:/var/lib/mysql
      - ./conf:/etc/mysql/conf.d
```
### 根据`docker-compose.yml`启动项目
```sh
# f: file; -d: daemon;
docker-compose -f docker-compose.yml up -d
```

### 访问docker
```sh
# i: interactive; t: tty;
docker exec -it *containerId* bash
```

### 登录mysql
```sh
mysql -u root -p
```

## 安装redis
```sh
docker pull redis:5.0.13
```
```yml
version: '3.3'
services:
  redis:
    image: redis:5.0.13
    restart: always
    environment:
      TZ: Asia/Shanghai
      LANG: en_US.UTF-8
      REDIS_PASSWORD: password
      REDIS_PORT: 6379
      REDIS_DATABASES: 16
    ports:
      - '6379:6379'
    expose:
      - '6379'
    volumes:
      - ./dаta:/root/redis
      - ./conf:/usr/local/etc/redis/redis.conf
```
```sh
docker-compose -f docker-compose.yml up -d
```
## 安装`nginx`
### 创建目录
```sh
mkdir -p /opt/nginx/html /opt/nginx/conf.d
```
### 拷贝nginx配置文件
```sh
docker run --rm -it nginx:latest cat /etc/nginx/conf.d/default.conf > /opt/nginx/conf.d/default.conf
docker run --rm -it nginx:latest cat /etc/nginx/nginx.conf > /opt/nginx/nginx.conf
docker run --rm -it nginx:latest cat /usr/share/nginx/html/index.html > /opt/nginx/html/index.html
```
### 创建`docker-compose.yaml`
在`/opt/nginx`下创建
```yaml [docker-compose.yaml]
version: '3.8'
services:
  nginx:
    image: nginx:latest
    container_name: nginx
    restart: always
    environment:
      - TZ=Asia/Shanghai
    ports:
      - '8083:8083'
    volumes:
      - /opt/nginx/html:/etc/nginx/html
      - /opt/nginx/conf.d:/etc/nginx/conf.d
      - /opt/nginx/nginx.conf:/etc/nginx/nginx.conf
```

### 启动服务
在`/opt/nginx`下执行
```sh
docker compose up -d
```

# linux

## 让配置的`shell`初始化脚本立即生效
```sh
source .zshrc.sh
```

## 终止进程
- 查询端口占用
```sh
sudo lsof -i tcp:8080
```
- 杀掉进程
```sh
sudo kill -9 PID
```

## 创建目录
创建`/opt/nginx/html`目录
```sh
mkdir -p /opt/nginx/html
```

## 解压缩文件
将`szr`目录压缩为`szr.tar.gz`
```sh
tar -czvf szr.tar.gz szr
```
将`szr.tar.gz`压缩包解压
```sh
tar -xzvf szr.tar.gz
```

## 授予脚本执行权限
```sh
chmod +x restart.sh
```

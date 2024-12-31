# 配置`nginx`

## 下载
https://nginx.org/en/download.html

选择`Stable version`下载

## 命令
```sh
# 启动
nginx.exe
# 重启
nginx.exe -s reload

```

## `HTTPS`
## 基础配置
``` nginx
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    # include /etc/nginx/conf.d/*.conf;
    server {
        listen       80;
        server_name  localhost;

        location /gemr/ {
            proxy_pass       http://host.docker.internal:91/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    server {
        listen       8083;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }
        # 前端业务配置
        location /config/ {
            alias   html/config/;
            index  index.html index.htm;
        }
        # 全程健康-index
        location /health-management/ {
            alias   html/health-management/;
            index  index.html index.htm;
        }
        # 全程健康后台-php
        location /health-management-api/ {
            proxy_pass       http://10.166.81.240:8112/health-management-api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 全程健康后台-java
        location /health-management-api-java/ {
            proxy_pass       http://10.166.81.240:9080/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 器官孪生-深睿
        location /aiviewer/ {
            proxy_pass       http://10.166.81.240/aiviewer/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 器官孪生-深睿
        location /reportCenter/ {
            proxy_pass       http://10.166.81.240/reportCenter/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 器官孪生-深睿
        location /pacs/ {
            proxy_pass       http://10.166.81.240/pacs/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 器官孪生-深睿
        location /ris/ {
            proxy_pass       http://10.166.81.240/ris/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 器官孪生-深睿
        location /data1/ {
            proxy_pass       http://10.166.81.240/data1/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 患者画像
        location /szr/ {
            alias   html/szr/;
            index  index.html index.htm;
        }

        location /medtext/ {
            proxy_pass       http://10.166.81.240:8002/pms/kgplat/medtext;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

       location /static/ {
            proxy_pass       http://10.166.81.240:8002/static;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
       location /pms/ {
            proxy_pass       http://10.166.81.240:8002/pms/kgplat/medrecord;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    # gemr
    server {
        listen 8084;
        server_name localhost;

        location / {
            alias  html/gemr/;
            index  index.html index.htm;
        }
        location /prod-api/ {
            proxy_pass       http://172.10.0.244:58086/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    server {
        listen       8087;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location /static/ {
            proxy_pass http://10.166.81.240:8086/static/;
            expires    1y;
            add_header Cache-Control "public, max-age=31536000, immutable";
        }

        location / {
            if ($request_uri = /index.html) {
                add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate";
                expires -1;
            }

            proxy_pass       http://10.166.81.240:8086/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    server {
        listen       8088 ssl;
        server_name  localhost;

        ssl_certificate      self-sign.cer;
        ssl_certificate_key  private.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location / {
            root   html;
            index  index.html index.htm;
        }

        # 前端业务配置
        location /config/ {
            alias   html/config/;
            index  index.html index.htm;
        }
        # 全程健康-index
        location /health-management/ {
            alias   html/health-management/;
            index  index.html index.htm;
        }
        # 全程健康后台-php
        location /health-management-api/ {
            proxy_pass       http://10.166.81.240:8112/health-management-api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 全程健康后台-java
        location /health-management-api-java/ {
            proxy_pass       http://10.166.81.240:9080/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 器官孪生-深睿
        location /aiviewer/ {
            proxy_pass       http://10.166.81.240/aiviewer/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 器官孪生-深睿
        location /reportCenter/ {
            proxy_pass       http://10.166.81.240/reportCenter/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 器官孪生-深睿
        location /pacs/ {
            proxy_pass       http://10.166.81.240/pacs/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 器官孪生-深睿
        location /ris/ {
            proxy_pass       http://10.166.81.240/ris/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 器官孪生-深睿
        location /data1/ {
            proxy_pass       http://10.166.81.240/data1/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 患者画像
        location /szr/ {
            alias   html/szr/;
            index  index.html index.htm;
        }
        # 元诊室
        location /xt_three-body-meeting/ {
            alias  html/xt_three-body-meeting/;
            index  index.html index.htm;
        }

        # 元诊室
        location /xt_three-body-meeting/multiVideo/ {
            alias  html/xt_three-body-meeting/multiVideo/;
            index  index.html index.htm;
        }
        # dify
        location /logo/ {
            alias  html/xt_three-body-meeting/logo/;
            index  index.html index.htm;
        }
        # dify
        location /_next/ {
            proxy_pass http://10.166.81.240:9081/_next/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # dify
        location /dify/ {
            proxy_pass http://10.166.81.240:9081/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # dify
        location /api/ {
            proxy_pass http://10.166.81.240:9081/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # dify
        location /console/api/ {
            proxy_pass http://10.166.81.240:9081/console/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}

```

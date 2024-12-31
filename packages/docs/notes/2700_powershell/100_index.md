# PowerShell

## 编辑终端初始化文件
```sh
code $PROFILE
```

## 设置别名
- 方法一：但是会报错
```sh
Set-Alias cdw 'cd folder/path'
```
- 方法二
```sh
function cdw {
  Set-Location folder/path
}
```

## 删除文件夹
```sh
Remove-Item -Recurse -Force folder/path
```

## 终止进程
- 查找3000端口占用的进程
```sh
netstat -ano | findstr "PID :3000"
```
- 复制3000进程的PID（例如15332），终止该进程
```sh
taskkill /PID 15332 /F
```

# PowerShell

## $PROFILE
```sh
# 编辑终端初始化文件
notepad $PROFILE
```

## 设置别名
```sh
# 方法一：但是会报错
Set-Alias cdw 'cd folder/path'
# 方法二
function cdw {
  Set-Location folder/path
}
```

## 删除文件夹
```sh
Remove-Item -Recurse -Force folder/path
```

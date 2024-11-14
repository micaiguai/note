# 基础使用

### Commands
- init info
```sh
git config --global user.name ${name}
git config --global user.email ${email}
```
- set crlf (only in windows)
```sh
git config --global core.autocrlf true
```
- set proxy
```sh
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```
- set remote
```sh
git remote set-url origin ${url}
```
- push new branch to remote
```sh
git push -u origin ${branch}
```

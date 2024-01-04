# 微前端

## 什么是微前端
微前端就是通过主应用加载多个不同业务模块的子应用。

## 为什么用微前端
微前端可以解决以下问题
1. 技术栈不同
2. 代码合并部署麻烦
3. 老项目的使用

## 微前端历史
1. `single-spa`实现了路由劫持和应用加载，缺点是`css`和`js`不隔离，不能动态加载`js`
2. `qiankun`基于`single-spa`，解决了`css`和`js`隔离，提供了开箱即用的`API`（`single-spa`，`sandbox`，`import-html-entry`），子应用只需导出`bootstrap`，`mount`，`unmount`方法即可。

## iframe
为什么不使用`iframe`，因为`iframe`中子应用的路由在页面刷新后，会回到初始状态，用户体验不好。

## 通信
1. 基于`url`通信
2. 基于`CustomEvent`通信
3. 基于`props`通信
4. 基于`全局变量`，`Redux`通信

## 公共依赖
1. `CDN`和`externals`
2. `webpack`联邦模块

## css隔离机制
1. ?_`shadowDOM`
2. `BEM`(Block Element Modifier)约定项目前缀
3. `CSS-Modules`打包时生成不冲突的选择器名称
4. `css-in-js`

## js隔离机制
1. ?_利用`window`隔离
2. ?_利用`proxy`隔离

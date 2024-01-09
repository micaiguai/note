# router
## SPA
> 一些应用在前端需要具有丰富的交互性、较深的会话和复杂的状态逻辑。构建这类应用的最佳方法是使用这样一种架构：Vue 不仅控制整个页面，还负责处理抓取新数据，并在无需重新加载的前提下处理页面切换。这种类型的应用通常称为单页应用 (Single-Page application，缩写为 SPA)。
## hash和history的比较
### 共同点
- 改变`url`时，都可以在无需重新加载的前提下处理页面切换
### 不同点
- `hash`模式下的`url`有`#`，`history`模式下则没有
- 刷新页面时，`hash`模式下请求不含`hash`值的`url`的静态资源，`history`模式下请求完整的`url`的静态资源（如果没有配置这个`url`的资源会导致`404`）
- `hash`的原理是监听`hashchange`事件，`history`的原理是监听`popstate`事件和调用`window.history.pushState`和`window.history.replaceState`方法
## hash和history的原理

### hash原理
核心原理是利用了`hashchange`事件
```js
window.addEventListener('hashchange', e => {
  // 当手动改变地址栏地址时
  // http://127.0.0.1:5500/playground/#old -> http://127.0.0.1:5500/playground/#new
  // output: http://127.0.0.1:5500/playground/#old
  console.log(e.oldURL)
  // output: http://127.0.0.1:5500/playground/#new
  console.log(e.newURL)
})
```
### history原理


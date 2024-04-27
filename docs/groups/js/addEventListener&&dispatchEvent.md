# addEventListener&&dispatchEvent
`addEventListener`给`EventTarget`注册事件，`dispatchEvent`给`EventTarget`触发事件。

## 使用示例
```html
<html lang="en">
<body>
  <button onclick="onClick()">click me</button>
  <script>
    const eventTarget = document.createElement('div')
    const CUSTOM_EVENT_TYPE = 'foo'
    function onClick() {
      eventTarget.dispatchEvent(new CustomEvent(CUSTOM_EVENT_TYPE, {
        detail: {
          name: 'foo'
        }
      }))
    }
    eventTarget.addEventListener(CUSTOM_EVENT_TYPE, e => {
      // output: my name is foo
      console.log(`my name is ${e.detail.name}`)
    })
  </script>
</body>
</html>
```

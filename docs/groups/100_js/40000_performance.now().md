# performance.now
表示从导航开始时到调用时，所经过的时间

## 细节
为了防止浏览器指纹攻击，设定了误差

## 示例代码
```html
<html lang="en">
<body>
  <script>
    // output: 1705275644433 1705275644434
    console.log(Date.now(), performance.timeOrigin + performance.now())
  </script>
</body>
</html>
```
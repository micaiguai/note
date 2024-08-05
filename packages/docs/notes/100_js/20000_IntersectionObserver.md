# IntersectionObserver
> `IntersectionObserver`接口提供了一种异步观察目标元素与其祖先元素或顶级文档视口（`viewport`）交叉状态的方法。

## viewport
`viewport`代表的是浏览器中网站可见内容的部分。视口外的内容在被滚动进来前都是不可见的。

## 作用
- 在页面滚动时“懒加载”图像或其他内容。
- 实现“无限滚动”网站，在滚动过程中加载和显示越来越多的内容，这样用户就不必翻页了。
- 报告广告的可见度，以便计算广告收入。
- 根据用户是否能看到结果来决定是否执行任务或动画进程。

## 参数含义
```ts
const io = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    // 回调逻辑
  },
  {
    // 配置
  } as IntersectionObserverInit
)

interface IntersectionObserverInit {
  // 指定的祖先元素
  root?: Element | Document | null
  // 根元素的margin，如果延伸出的margin接触到observe的元素，则触发回调
  rootMargin?: string
  // 触发的阈值比，在阈值的边缘来回会触发两次
  // eg: 0，只要略微看到，则触发回调
  // eg: 0.5，大概显示50%，则触发回调
  // eg: 1，只要完全看到，则触发回调
  // eg：[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]，根据不同的阈值比，触发回调
  threshold?: number | number[]
}

interface IntersectionObserverEntry {
  // 父元素的DOMRectReadOnly
  readonly boundingClientRect: DOMRectReadOnly
  // 瞬时显示的比例
  readonly intersectionRatio: number
  // 相交区域的的DOMRectReadOnly
  readonly intersectionRect: DOMRectReadOnly
  // 是否相交，可理解成是否显示在根元素中
  readonly isIntersecting: boolean
  // 根元素的DOMRectReadOnly
  readonly rootBounds: DOMRectReadOnly | null
  // 目标元素
  readonly target: Element
  // 从new IntersectionObserver()开始，到目标元素被观察到的所花费的时间，单位为ms
  readonly time: DOMHighResTimeStamp
}
```

## 测试代码
```html
<html lang="en">
<style>
  * {
    box-sizing: border-box;
  }
  html {
    overflow: hidden;
  }
  body {
    overflow: auto;
    height: 100vh;
    background-color: pink;
    .item {
      height: 100px;
      margin-bottom: 10px;
      background-color: orange;
      outline: 100px solid gray;
    }
    .pad {
      height: 1000px;
    }
  }
</style>
<body>
  <div class="pad"></div>
  <div class="item"></div>
  <div class="pad"></div>
  <script>
    const item = document.querySelector('.item')
    const io = new IntersectionObserver(
      entries => {
        console.log('entries[0] :', entries[0])
      },
      {
        // rootMargin: '100px 0px 100px 0px',
        // threshold: 0.5,
        // threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        // root: document.body
      }
    )
    // setTimeout(() => {
      io.observe(item)
    // }, 3000)
  </script>
</body>
</html>
```

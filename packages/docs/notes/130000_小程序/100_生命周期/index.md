# 生命周期
小程序分为三个生命周期，`应用生命周期`、`页面生命周期`、`组件生命周期`。

## 应用生命周期
| 生命周期   | 说明                     |
| ---------- | ------------------------ |
| `onLaunch` | 小程序初始化完毕时执行   |
| `onShow`   | 页面出现在前台时执行     |
| `onHide`   | 页面从前台变为后台时执行 |

## 页面生命周期
| 生命周期   | 说明                     |
| ---------- | ------------------------ |
| `onLoad`   | 页面创建时执行           |
| `onShow`   | 页面出现在前台时执行     |
| `onReady`  | 页面首次渲染完毕时执行   |
| `onHide`   | 页面从前台变为后台时执行 |
| `onUnload` | 页面销毁时执行           |

![生命周期](/notes/130000_小程序/100_生命周期/assets/image.png)

## 组件生命周期

| 生命周期   | 说明                                     |
| ---------- | ---------------------------------------- |
| `created`  | 在组件实例刚刚被创建时执行               |
| `attached` | 在组件实例进入页面节点树时执行           |
| `ready`    | 在组件在视图层布局完成后执行             |
| `moved`    | 在组件实例被移动到节点树另一个位置时执行 |
| `detached` | 在组件实例被从页面节点树移除时执行       |

## 参考文章
- [掘金文章_微信小程序应用生命周期、页面生命周期、组件生命周期](https://juejin.cn/post/7209589093113118779)
- [微信文档_应用生命周期](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)
- [微信文档_页面生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html)
- [微信文档_页面生命周期图例](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html)
- [微信文档_组件生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html)

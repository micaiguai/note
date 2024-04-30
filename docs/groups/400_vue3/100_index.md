# vue3
## 和vue2的区别
- 采用`monorepo`方式管理
- 采用`typescript`
- 支持`tree-shaking`
- vue2后期引入`rfc`(request for comment)
- 采用`proxy`劫持对象
- 模版编译优化，对动态节点收集，减少比较；用`patchFlag`标记节点
- 支持`composition-api`
- 新增`Fragment`、`Teleport`、`Suspense`组件

## monorepo
`monorepo`是一种代码管理的方式，指在一个项目中管理多个模块/包
### 优点
- 方便管理多个模块
- 方便版本、依赖管理，模块之间的引用、调用
### 缺点
- 项目体积会变大

## vue3项目结构
- reactivity: 响应式
- runtime-core: 运行时核心（与平台无关，可以创建针对任意平台的渲染器）
- runtime-dom: 针对浏览器的运行时。包括`DOM`、属性、事件等
- runtime-test: 测试
- server-render: 服务端渲染
- compiler-core: 编译器核心（与平台无关）
- compiler-dom: 针对浏览器的编译器
- compiler-ssr: 针对服务器渲染的编译器
- compiler-sfc: 针对单文件解析
- size-check: 测试代码体积
- template-explorer: 调试编译器输出的开发工具
- shared: 模块之间共享的内容
- vue: 完整包，包含运行时和编译器
### 依赖图
![依赖图](../assets/400_100_vue3依赖.svg)

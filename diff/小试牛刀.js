// 导入snabbdom
import { h, init, thunk } from 'snabbdom'

// init()返回一个patch函数，用来比较两个虚拟DOM的差异，然后更新到真实的DOM里
// 如果第一个参数是真实DOM，则会将它转化为Virtual DOM
// 这边暂时传一个空数组[]
const patch = init([])

// h方法有很多传参方式，这边使用这一种
// @param sel 选择器
// @param data 数据
// @param children String | Virtual Dom | Virtual Dom数组
// @returns VNode
const vNode = h('div#box', {}, [
  h('ul.list', {}, [
    h('li', {}, '嘿嘿'),
    h('li', {}, '哈哈'),
    h('li', {}, '嚯嚯')
  ])
])

console.log('vNode', vNode)

const app = document.querySelector('#app')


setTimeout(() => {
  patch(app, vNode)
}, 1000)

setTimeout(() => {
  const newVNode = h('div#box', {}, [
    h('ul.list', {}, [
      h('li', {}, '嘿嘿'),
      h('li', {}, '哈哈，真开心'),
      h('li', {}, '嚯嚯')
    ])
  ])
  patch(vNode, newVNode)
}, 2000)


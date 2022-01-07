/* main.js */

/* 全流程测试 */

import h from './js/h'
import patch from './js/patch'

const node = document.querySelector('#app')

const vnode = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E'),
])

const vnode2 = h('ul', {}, [
  h('li', { key: 'E' }, 'E'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'A' }, 'A'),
])

const vnode3 = h('ul', {}, [
  h('li', { key: 'E' }, 'E'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'K' }, 'K'),
])

const vnode4 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
])

const vnode5 = h('ul', {}, [
  h('li', { key: 'E' }, 'E'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'V' }, 'V'),
])

const vnode6 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h(
    'li',
    { key: 'E' },
    h('ul', {}, [
      h('li', { key: 'A' }, 'A'),
      h('li', { key: 'B' }, 'B'),
      h('li', { key: 'C' }, 'C'),
      h('li', { key: 'D' }, 'D'),
      h('li', { key: 'E' }, h('div', { key: 'R' }, 'R')),
    ])
  ),
])

let oldVnode
oldVnode = patch(node, vnode)

const vnodeList = [vnode2, vnode3, vnode4, vnode5, vnode6]
const btn = document.querySelectorAll('.btn')
for (let i = 0; i < btn.length; i++) {
  btn[i].onclick = () => {
    oldVnode = patch(oldVnode, vnodeList[i])
  }
}

/* 测试patchVnode函数 */

// import h from './js/h'
// import patch from './js/patch'

// const node = document.querySelector('#app')

// const vnode = h('ul', { key: 'ul1' }, [
//   h('li', { key: 'li1' }, '嘿嘿'),
//   h('li', { key: 'li2' }, '哈哈'),
//   h('li', { key: 'li3' }, '嘻嘻')
// ])

// // 测试text
// const vnode2 = h('ul', { key: 'ul1' }, '666')

// // 测试children
// const vnode3 = h('ul', { key: 'ul1' }, [
//   h('li', { key: 'li1' }, '嘿嘿'),
// ])

// patch(node, vnode)

// setTimeout(() => {
//   patch(vnode, vnode2)
// }, 1000)

// setTimeout(() => {
//   patch(vnode2, vnode3)
// }, 2000)

/* 测试patch函数 */

// import h from './js/h'
// import patch from './js/patch'

// const node = document.querySelector('#app')

// const vnode = h('ul', { key: 'ul1' }, [
//   h('li', { key: 'li1' }, '嘿嘿'),
//   h('li', { key: 'li2' }, '哈哈'),
//   h('li', { key: 'li3' }, '嘻嘻')
// ])

// patch(node, vnode)

/* 测试h函数 */

// import h from './js/h'

// const vnode = h('ul', { key: 'ul1' }, [
//   h('li', { key: 'li1' }, '嘿嘿'),
//   h('li', { key: 'li2' }, '哈哈'),
//   h('li', { key: 'li3' }, '嘻嘻')
// ])

// console.log('vnode', vnode)
// // {
// //   "sel": "ul",
// //   "data": {
// //       "key": "ul1"
// //   },
// //   "children": [
// //       {
// //           "sel": "li",
// //           "data": {
// //               "key": "li1"
// //           },
// //           "text": "嘿嘿",
// //           "elm": {},
// //           "key": "li1"
// //       },
// //       // ...
// //   ],
// //   "elm": {},
// //   "key": "ul1"
// // }


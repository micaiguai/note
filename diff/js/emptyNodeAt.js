/* emptyNodeAt.js */ 

import vnode from './vnode'

export default function (node) {
  return vnode(node.tagName, undefined, undefined, undefined, node)
}

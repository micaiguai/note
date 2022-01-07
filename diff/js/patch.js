/* patch.js */

import emptyNodeAt from './emptyNodeAt'
import isSameVnode from './isSameVnode'
import createElm from './createElm'
import patchVnode from './patchVnode'

export default function (oldVnode, newVnode) {
  if (!oldVnode.sel) {
    oldVnode = emptyNodeAt(oldVnode)
  }
  if (isSameVnode(oldVnode, newVnode)) {
    patchVnode(oldVnode, newVnode)
  }
  else {
    const newNode = createElm(newVnode)
    oldVnode.elm.parentNode.insertBefore(newNode, oldVnode.elm)
  }
  return newVnode
}

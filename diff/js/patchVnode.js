/* patchVnode.js */

import createElm from './createElm'
import updateChildren from './updateChildren'

export default function (oldVnode, newVnode) {
  newVnode.elm = oldVnode.elm
  if (oldVnode === newVnode) return 
  if (newVnode.text) {
    if (oldVnode.text !== newVnode.text) {
      oldVnode.elm.innerText = newVnode.text
    }
  }
  else {
    if (oldVnode.children) {
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    }
    else {
      oldVnode.elm.innerHTML = ''
      for (const child of newVnode.children) {
        const childNode = createElm(child)
        oldVnode.elm.append(childNode)
      }
    }
  }
}

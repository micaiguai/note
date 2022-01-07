/* createElm.js */

export default function createElm(vnode) {
  const node = vnode.elm = document.createElement(vnode.sel)
  if (vnode.text) {
    node.innerText = vnode.text
  }
  else if (vnode.children) {
    for (const child of vnode.children) {
      const childNode = createElm(child)
      node.append(childNode)
    }
  }
  return node
}

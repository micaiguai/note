import vnode from './vnode'

export default function (a, b, c) {
  let children
  let text
  if (typeof c === 'string' || typeof c === 'number') {
    text = c.toString()
  }
  if (c && c.sel) {
    children = [c]
  }
  else if (Array.isArray(c)) {
    children = c
  }
  return vnode(a, b, children, text, undefined)
}

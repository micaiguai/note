/* isSameVnode.js */

export default function (oldVnode, newVnode) {
  return oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel
}

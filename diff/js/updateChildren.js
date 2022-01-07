/* updateChildren.js */

import createElm from "./createElm"
import isSameVnode from "./isSameVnode"
import patchVnode from "./patchVnode"

export default function (parentElm, oldCh, newCh) {
  let os = 0
  let oe = oldCh.length - 1
  let ns = 0
  let ne = newCh.length - 1

  while (os <= oe && ns <= ne) {
    if (!oldCh[os]) {
      os++
    }
    else if (!oldCh[oe]) {
      oe--
    }
    else if (!newCh[ns]) {
      ns++
    }
    else if (!newCh[ne]) {
      ne--
    }
    else if (isSameVnode(oldCh[os], newCh[ns])) {
      patchVnode(oldCh[os], newCh[ns])
      os++
      ns++
    }
    else if (isSameVnode(oldCh[oe], newCh[ne])) {
      patchVnode(oldCh[oe], newCh[ne])
      oe--
      ne--
    }
    else if (isSameVnode(oldCh[os], newCh[ne])) {
      parentElm.insertBefore(oldCh[os].elm, oldCh[oe].elm.nextSibling)
      patchVnode(oldCh[os], newCh[ne])
      os++
      ne--
    }
    else if (isSameVnode(oldCh[oe], newCh[ns])) {
      parentElm.insertBefore(oldCh[oe].elm, oldCh[os].elm)
      patchVnode(oldCh[oe], newCh[ns])
      oe--
      ns++
    }
    else {
      const oldKeys = {} 
      oldCh.forEach((ch, i) => {
        if (ch) {
          oldKeys[ch.key] = i 
        }
      })
      const i = oldKeys[newCh[ns].key]
      if (i === undefined) {
        parentElm.insertBefore(createElm(newCh[ns]), oldCh[os].elm)
      }
      else {
        if (oldCh[i].sel === newCh[ns].sel) {
          patchVnode(oldCh[i], newCh[ns])
          parentElm.insertBefore(oldCh[i].elm, oldCh[os].elm)
          oldCh[i] = undefined
        }
        else {
          parentElm.insertBefore(createElm(newCh[ns]), oldCh[os].elm)
        }
      }
      ns++
    }
  }

  if (ns <= ne) {
    const before = newCh[ne + 1] ? newCh[ne + 1].elm : null
    for (; ns <= ne; ns++) {
      parentElm.insertBefore(createElm(newCh[ns]), before)
    }
  }
  if (os <= oe) {
    for (; os <= oe; os++) {
      if (oldCh[os]) {
        parentElm.removeChild(oldCh[os].elm)
      }
    }
  }
}

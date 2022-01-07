import { Module } from "./modules/module";
import { vnode, VNode } from "./vnode";
import * as is from "./is";
import { htmlDomApi, DOMAPI } from "./htmldomapi";

type NonUndefined<T> = T extends undefined ? never : T;

function isUndef(s: any): boolean {
  return s === undefined;
}
function isDef<A>(s: A): s is NonUndefined<A> {
  return s !== undefined;
}

type VNodeQueue = VNode[];

const emptyNode = vnode("", {}, [], undefined, undefined);

/**
 * 通过sel和key来判断是否是相似的vnode
 * @param  {VNode} vnode1
 * @param  {VNode} vnode2
 * @returns boolean
 */
function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
  const isSameKey = vnode1.key === vnode2.key;
  const isSameSel = vnode1.sel === vnode2.sel;

  return isSameSel && isSameKey;
}

/**
 * @todo Remove this function when the document fragment is considered stable.
 */
function documentFragmentIsNotSupported(): never {
  throw new Error("The document fragment is not supported on this platform.");
}

function isElement(
  api: DOMAPI,
  vnode: Element | DocumentFragment | VNode
): vnode is Element {
  return api.isElement(vnode as any);
}

function isDocumentFragment(
  api: DOMAPI,
  vnode: DocumentFragment | VNode
): vnode is DocumentFragment {
  return api.isDocumentFragment!(vnode as any);
}

type KeyToIndexMap = { [key: string]: number };

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>;
};

type ModuleHooks = ArraysOf<Required<Module>>;

// 让我们看看整个函数又做了些什么
function createKeyToOldIdx(
  children: VNode[],
  beginIdx: number,
  endIdx: number
): KeyToIndexMap {
  // 创建map
  const map: KeyToIndexMap = {};
  for (let i = beginIdx; i <= endIdx; ++i) {
    const key = children[i]?.key;
    if (key !== undefined) {
      // 将key的值作为key，索引作为value
      map[key as string] = i;
    }
  }
  // 返回这个map
  return map;
}

const hooks: Array<keyof Module> = [
  "create",
  "update",
  "remove",
  "destroy",
  "pre",
  "post",
];

// TODO Should `domApi` be put into this in the next major version bump?
type Options = {
  experimental?: {
    fragments?: boolean;
  };
};

export function init(
  modules: Array<Partial<Module>>,
  domApi?: DOMAPI,
  options?: Options
) {
  const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: [],
  };

  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi;

  for (const hook of hooks) {
    for (const module of modules) {
      const currentHook = module[hook];
      if (currentHook !== undefined) {
        (cbs[hook] as any[]).push(currentHook);
      }
    }
  }
/**
  * 将node转为vnode
  * @param  {Element} elm  node
  * @returns VNode         vnode
  */
function emptyNodeAt(elm: Element) {
  return vnode(
    api.tagName(elm).toLowerCase(),
    {},
    [],
    undefined,
    elm
  );
}

  function emptyDocumentFragmentAt(frag: DocumentFragment) {
    return vnode(undefined, {}, [], undefined, frag);
  }

  function createRmCb(childElm: Node, listeners: number) {
    return function rmCb() {
      if (--listeners === 0) {
        const parent = api.parentNode(childElm) as Node;
        api.removeChild(parent, childElm);
      }
    };
  }
/**
  * @param  {VNode} vnode
  * @returns Node
  */
function createElm(vnode: VNode): Node {
  // 创建node
  const elm = vnode.elm = api.createElement(vnode.sel);
  // 如果有children，递归append到node
  if (is.array(vnode.children)) {
    for (let i = 0; i < vnode.children.length; ++i) {
      const ch = vnode.children[i];
      if (ch != null) {
        api.appendChild(elm, createElm(ch as VNode));
      }
    }
  } 
  // 如果有text，创建textNode后append到node
  else if (is.primitive(vnode.text)) {
    api.appendChild(elm, api.createTextNode(vnode.text));
  }
  return vnode.elm;
}

  function addVnodes(
    parentElm: Node,
    before: Node | null,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number
  ) { 
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx];
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch), before);
      }
    }
  }

  function invokeDestroyHook(vnode: VNode) {
    const data = vnode.data;
    if (data !== undefined) {
      data?.hook?.destroy?.(vnode);
      for (let i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      if (vnode.children !== undefined) {
        for (let j = 0; j < vnode.children.length; ++j) {
          const child = vnode.children[j];
          if (child != null && typeof child !== "string") {
            invokeDestroyHook(child);
          }
        }
      }
    }
  }

  function removeVnodes(
    parentElm: Node,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number
  ): void {
    for (; startIdx <= endIdx; ++startIdx) {
      let listeners: number;
      let rm: () => void;
      const ch = vnodes[startIdx];
      if (ch != null) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm!, listeners);
          for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
          const removeHook = ch?.data?.hook?.remove;
          if (isDef(removeHook)) {
            removeHook(ch, rm);
          } else {
            rm();
          }
        } else {
          // Text node
          api.removeChild(parentElm, ch.elm!);
        }
      }
    }
  }
/**
  * @param  {Node} parentElm
  * @param  {VNode[]} oldCh
  * @param  {VNode[]} newCh
  */
function updateChildren(
  parentElm: Node,
  oldCh: VNode[],
  newCh: VNode[]
) {
  // oldStartIdx  旧开始索引，下面简称os
  // oldEndIdx    旧结束索引，下面简称oe
  // newStartIdx  新开始索引，下面简称ns
  // newEndIdx    新结束索引，下面简称ne
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let before: any;

  // 当指针交错时停止
  // 我们发现整个while作用域都是if、else if和else，说明当进入某个if、else if和else作用域，执行里面的代码后，直接进入下次循环。
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // vnode为空，移动指针，进入下次循环
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    }
    // 开始比较
    // 1. os ns 命中后patchVnode，os++，ns++
    else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } 
    // 2. oe ne 命中后patchVnode，oe--，ne--
    else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } 
    // 3. os ne 命中后patchVnode，然后将真实DOM后移，os++，ne--
    else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode);
      // insertBefore是Node.insertBefore的二次封装函数
      // 这里将os对应的节点移到了oe节点的后面
      api.insertBefore(
        parentElm,
        oldStartVnode.elm!,
        // nextSibling是Node.nextSibling的二次封装
        api.nextSibling(oldEndVnode.elm!)
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } 
    // 4. oe ns 命中后patchVnode，然后将真实DOM前移，oe--，ns++
    else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode);
      // 这里将oe对应的节点移到了os节点的前面
      api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    }
    // 5. 真不巧，上述4种情况都没命中，看看下面怎么处理的。
    else {
      // oldKeyToIdx  存放oldVnode.children所有的key
      // idxInOld     找到的key
      // elmToMove    
      // before
      let oldKeyToIdx: KeyToIndexMap | undefined;
      let idxInOld: number;
      let elmToMove: VNode;
      // 这里将oldKey都存储到oldKeyToIdx里
      // oldKeyToIdx里的元素结构是{ [key: string]: number }
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      // ns的key是否能在oldKeyToIdx找到
      idxInOld = oldKeyToIdx[newStartVnode.key as string];
      // 找不到，直接新增
      if (isUndef(idxInOld)) {
        // New element
        api.insertBefore(
          parentElm,
          createElm(newStartVnode),
          oldStartVnode.elm!
        );
      } 
      // 找到了
      else {
        // 获取到对应DOM
        elmToMove = oldCh[idxInOld];
        // 如果标签不一致，那对不起，不是同一个节点，直接新增
        if (elmToMove.sel !== newStartVnode.sel) {
          api.insertBefore(
            parentElm,
            createElm(newStartVnode),
            oldStartVnode.elm!
          );
        } 
        // 标签一致，恭喜，执行patchVnode，然后将oldCh[idxInOld]置为undefined，DOM插入到os的DOM的前面
        else {
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined as any;
          api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!);
        }
      }
      // 最后将ns++
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 终于跳出循环了，感觉轻松了不少。
  // 怎么下面还有代码？晕。。。
  // 没事继续看看还有啥。

  // 假设os > oe这时跳出循环，但是ns和ne之间的vnode还没加入到parentElm里。所以：
  // 如果ns小于ne，也就是ns和ne之间还有待加入的vnode
  if (newStartIdx <= newEndIdx) {
    before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
    // 循环插入
    addVnodes(
      parentElm,
      before,
      newCh,
      newStartIdx,
      newEndIdx
    );
  }
  // 同上这边也要删除
  // 如果os小于oe，也就是ns和ne之间还有待删除的vnode
  if (oldStartIdx <= oldEndIdx) {
    // 循环删除
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}
/**
  * @param  {VNode} oldVnode
  * @param  {VNode} vnode
  */
function patchVnode(
  oldVnode: VNode,
  vnode: VNode,
) {
  // 将oldVnode.elm赋值到vnode.elm
  const elm = (vnode.elm = oldVnode.elm)!;
  const oldCh = oldVnode.children as VNode[];
  const ch = vnode.children as VNode[];
  // 如果是同一个对象，就不用比啦
  if (oldVnode === vnode) return;
  // 以下分为4种情况（源码考虑到text和children不存在的情况，有6种，我们只考虑存在4种）
  // 1. newvnode没有text，即有children
  if (isUndef(vnode.text)) {
    // 1.1. 都有children，情况最复杂，之后讨论
    if (isDef(oldCh)) {
      if (oldCh !== ch) updateChildren(elm, oldCh, ch);
    } 
    // 1.2. oldVnode没有children，直接新增
    else {
      if (isDef(oldVnode.text)) api.setTextContent(elm, "");
      // 新增vnodes
      addVnodes(elm, null, ch, 0, ch.length - 1);
    } 
  } 
  // 2.   newVnode有text
  // 2.1. text不一样，或者oldVonde的text为空，直接替换
  // 2.2. text一样，不操作
  if (oldVnode.text !== vnode.text) {
    // 置空oldVnode的children
    if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    }
    api.setTextContent(elm, vnode.text!);
  }
}
/**
  * @param  {VNode|Element} oldVnode  旧vnode
  * @param  {VNode} vnode             新vnode
  * @returns VNode                    返回vnode
  */
return function patch(
  oldVnode: VNode | Element,
  vnode: VNode
): VNode {
  // 如果oldVnode是DOM
  if (isElement(api, oldVnode)) {
    // 创建vnode，并赋值给oldVnode
    oldVnode = emptyNodeAt(oldVnode);
  } 
  // 是同一个vnode
  if (sameVnode(oldVnode, vnode)) {
    // 深入比较
    patchVnode(oldVnode, vnode);
  } 
  // 不是同一个vnode
  // 直接替换
  else {
    const elm = oldVnode.elm!;
    // 获取node的parentNode
    const parent = api.parentNode(elm) as Node;
    // 创建node，这边内部会递归调用，生成完整的node
    createElm(vnode);
    // 插入到parentNode
    api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
    // 删除oldVnode.elm，相当于parent.removeChild(oldVnode.elm)
    removeVnodes(parent, [oldVnode], 0, 0);
  }
  return vnode;
};
}

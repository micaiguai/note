import { vnode, VNode, VNodeData } from "./vnode";
import * as is from "./is";

export type VNodes = VNode[];
export type VNodeChildElement =
  | VNode
  | string
  | number
  | String
  | Number
  | undefined
  | null;
export type ArrayOrElement<T> = T | T[];
export type VNodeChildren = ArrayOrElement<VNodeChildElement>;

function addNS(
  data: any,
  children: VNodes | undefined,
  sel: string | undefined
): void {
  data.ns = "http://www.w3.org/2000/svg";
  if (sel !== "foreignObject" && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const childData = children[i].data;
      if (childData !== undefined) {
        addNS(childData, children[i].children as VNodes, children[i].sel);
      }
    }
  }
}

/**
 * @param  {string} sel                           选择器
 * @param  {VNodeData|null} data                  数据
 * @param  {VNodeChildren|string|Vnode} children  Vnode数组|text|Vnode
 * @returns VNode                                 返回Vnode
 */
// 这边使用了方法重载，为了方便观察，这边直接只看这个这一种情况
export function h(sel: any, b?: any, c?: any): VNode {
  let data: VNodeData = {};
  let children: any;
  let text: any;
  data = b;
  // 如果是数组
  if (is.array(c)) {
    children = c;
  } 
  // 如果是text
  else if (is.primitive(c)) {
    text = c.toString();
  } 
  // 如果是Vnode，直接处理成数组
  // 通过有没有sel属性进行判断c是不是Vnode
  else if (c && c.sel) {
    children = [c];
  }
  return vnode(sel, data, children, text, undefined);
}

/**
 * @experimental
 */
export function fragment(children: VNodeChildren): VNode {
  let c: any;
  let text: any;

  if (is.array(children)) {
    c = children;
  } else if (is.primitive(c)) {
    text = children;
  } else if (c && c.sel) {
    c = [children];
  }

  if (c !== undefined) {
    for (let i = 0; i < c.length; ++i) {
      if (is.primitive(c[i]))
        c[i] = vnode(undefined, undefined, undefined, c[i], undefined);
    }
  }

  return vnode(undefined, {}, c, text, undefined);
}

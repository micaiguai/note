import { Hooks } from "./hooks";
import { AttachData } from "./helpers/attachto";
import { VNodeStyle } from "./modules/style";
import { On } from "./modules/eventlisteners";
import { Attrs } from "./modules/attributes";
import { Classes } from "./modules/class";
import { Props } from "./modules/props";
import { Dataset } from "./modules/dataset";

export type Key = string | number | symbol;

export interface VNode {
  sel: string | undefined;
  data: VNodeData | undefined;
  children: Array<VNode | string> | undefined;
  elm: Node | undefined;
  text: string | undefined;
  key: Key | undefined;
}

export interface VNodeData {
  props?: Props;
  attrs?: Attrs;
  class?: Classes;
  style?: VNodeStyle;
  dataset?: Dataset;
  on?: On;
  attachData?: AttachData;
  hook?: Hooks;
  key?: Key;
  ns?: string; // for SVGs
  fn?: () => VNode; // for thunks
  args?: any[]; // for thunks
  is?: string; // for custom elements v1
  [key: string]: any; // for any other 3rd party module
}
/**
 * @param  {string|undefined} sel                         选择器
 * @param  {any|undefined} data                           数据
 * @param  {Array<VNode|string>|undefined} children       包含Vnode或者文本的children数组
 * @param  {string|undefined} text                        文本  
 * @param  {Element|DocumentFragment|Text|undefined} elm  真实DOM
 * @returns data                                          返回一个对象
 */
export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | DocumentFragment | Text | undefined
): VNode {
  // 这边将key从data中提取，直接赋值到返回的对象上。
  const key = data === undefined ? undefined : data.key;
  return { sel, data, children, text, elm, key };
}

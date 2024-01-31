import { isObject } from "@vue/shared"
import { mutateHandler, readonlyHandler, shallowMutateHandler, shallowReadonlyHandler } from "./baseHandlers"

/** 记录代理对象 */
const reactiveMap = new WeakMap()
/** 记录readonly代理对象 */
const readonlyMap = new WeakMap()

/**
 *  创建基础的代理对象 
 */
function createReactive(target, isReadonly: boolean, baseHandlers) {
  // 如果不是对象，直接返回target
  if (!isObject(target)) {
    return target
  }
  const proxyMap = isReadonly ? readonlyMap : reactiveMap
  const exist = proxyMap.get(target)
  if (exist) {
    return exist
  }
  const proxy = new Proxy(target, baseHandlers)
  proxyMap.set(target, proxy)
  return proxy
}
/**
 * 创建代理对象
 */
export function reactive(target) {
  return createReactive(target, false, mutateHandler)
}
/**
 * 创建浅代理对象
 */
export function shallowReactive(target) {
  return createReactive(target, false, shallowMutateHandler)
}
/**
 * 创建只读代理对象
 */
export function readonly(target) {
  return createReactive(target, true, readonlyHandler)
}
/**
 * 创建浅的只读代理对象
 */
export function shallowReadonly(target) {
  return createReactive(target, true, shallowReadonlyHandler)
}

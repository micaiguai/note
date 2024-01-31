/** 当前的effect */
let activeEffect
const effectStack = []
let uid = 0
const targetMap = new WeakMap()

/**
 * 创建响应式
 */
export function effect(fn, options: any = {}) {
  const _effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    _effect()
  }
  return _effect
}

function createReactiveEffect(fn, options) {
  const _effect = function () {
    effectStack.push(_effect)
    activeEffect = _effect
    try {
      fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  _effect.id = uid++
  _effect._isEffect = true
  _effect.raw = fn
  _effect.options = options
  return _effect
}

export function track(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap
  }
}


import { observe } from "./observer/index"
import { proxy } from "./utils/index"

export function initState(vm) {
  const opts = vm.$options
  if (opts.props) {
    initProps(vm)
  }
  if (opts.method) {
    initMethod(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initProps() {

}
function initMethod() {

}
function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  // 代理 vm.name 可以访问到 vm._data.name
  for (const key in data) {
    proxy(vm, '_data', key)
  }
  observe(data)
}
function initComputed() {

}
function initWatch() {

}

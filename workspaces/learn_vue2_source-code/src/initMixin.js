import { compileToFunction } from "./complier/index"
import { initState } from "./initState"

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    initState(vm)
    // 如果申明了el, 挂载
    if (vm.$options.el) {
      vm.$mounted()
    }
  }
  /**
   * 挂载
   * 渲染步骤:
   * 1. 先找render
   * 2. 如果没有, 再找template
   * 3. 如果没有, 最后找el
   */
  Vue.prototype.$mounted = function () {
    const vm = this
    const options = vm.$options
    if (options.render) {
      // 暂不实现
    } else if (options.template) {
      // 暂不实现
    } else if (options.el) {
      const template = document.querySelector(options.el).outerHTML
      vm.render = compileToFunction(template)
    }
  }
}

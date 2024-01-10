import { reroute } from "./reroute";

const routingEventsListeningTo = ['hashchange', 'popstate']

// 重新执行reroute
function urlReroute() {
  reroute()
}
// 劫持hashchange、popstate事件
const originAddEventListener = window.addEventListener
const originRemoveEventListener = window.removeEventListener

// 被劫持的hashchange、popstate事件
const capturedEventListeners = {
  hashchange: [],
  popstate: []
}

originAddEventListener('hashchange', urlReroute)
originAddEventListener('popstate', urlReroute)

window.addEventListener = function(eventName, fn) {
  // 是否eventName是hashchange、popstate
  //   ? 进一步处理
  //   : 调用originAddEventListener
  if (routingEventsListeningTo.includes(eventName)) {
    // 是否已经被劫持
    //   ? 返回
    //   : 保存至capturedEventListeners[eventName]
    if (capturedEventListeners[eventName].includes[fn]) {
      return
    } else {
      capturedEventListeners[eventName].push(fn)
      return
    }
  }
  return originAddEventListener.apply(this, arguments)
}
window.removeEventListener = function(eventName, fn) {
  if (routingEventsListeningTo.includes(eventName)) {
    if (capturedEventListeners[eventName].includes[fn]) {
      return
    } else {
      capturedEventListeners[eventName] = capturedEventListeners[eventName].filter(item => item !== fn)
      return
    }
  }
  return originRemoveEventListener.apply(this, arguments)
}

// 劫持pushState、replaceState方法
function patchedUpdateState(fn) {
  return function() {
    const preUrl = window.location.href
    fn.apply(this, arguments)
    const curUrl = window.location.href
    // 如果url不一致，重新执行urlReroute
    if (preUrl !== curUrl) {
      urlReroute()
    }
  }
}

window.history.pushState = patchedUpdateState(window.history.pushState)
window.history.replaceState = patchedUpdateState(window.history.replaceState)

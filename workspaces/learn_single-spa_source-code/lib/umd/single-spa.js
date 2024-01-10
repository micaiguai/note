(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.singleSpa = {}));
})(this, (function (exports) { 'use strict';

  let startedFlag = false;

  function start() {
    startedFlag = true;
    reroute();
  }

  const LIFECYCLE_ENUM = {
    NOT_LOADED: 'NOT_LOADED',
    LOADING_SOURCE_CODE: 'LOADING_SOURCE_CODE',
    NOT_BOOTSTRAPPED: 'NOT_BOOTSTRAPPED',
    BOOTSTRAPPING: 'BOOTSTRAPPING',
    NOT_MOUNTED: 'NOT_MOUNTED',
    MOUNTING: 'MOUNTING',
    MOUNTED: 'MOUNTED',
    UPDATING: 'UPDATING',
    UNMOUNTING: 'UNMOUNTING',
    UNLOADING: 'UNLOADING',
    LOAD_ERR: 'LOAD_ERR',
    SKIP_BECAUSE_BROKEN: 'SKIP_BECAUSE_BROKEN'
  };

  function shouldBeActive(app) {
    return app.activeWhen(window.location)
  }

  function flatFnArray(fns) {
    fns = Array.isArray(fns) ? fns : [fns];
    return (props) => {
      return fns.reduce(async (promise, fn) => {
        return promise.then(() => fn(props))
      }, Promise.resolve())
    }
  }

  async function toLoadPromise(app) {
    if (app.loadPromise) {
      return app.loadPromise
    }
    return (app.loadPromise = Promise.resolve().then(async () => {
      app.status = LIFECYCLE_ENUM.LOADING_SOURCE_CODE;
      const {
        bootstrap,
        mount,
        unmount
      } = await app.loadApp(app.customProps);
      app.bootstrap = flatFnArray(bootstrap);
      app.mount = flatFnArray(mount);
      app.unmount = flatFnArray(unmount);
      app.status = LIFECYCLE_ENUM.NOT_BOOTSTRAPPED;
      return app
    }))
  }

  async function toMountPromise(app) {
    if (app.status !== LIFECYCLE_ENUM.NOT_MOUNTED) {
      return app
    }
    app.status = LIFECYCLE_ENUM.MOUNTING;
    await app.mount(app.customProps);
    app.status = LIFECYCLE_ENUM.MOUNTED;
    return app
  }

  async function toUnmountPromise(app) {
    if (app.status !== LIFECYCLE_ENUM.MOUNTED) {
      return app
    }
    app.status = LIFECYCLE_ENUM.UNMOUNTING;
    await app.unmount(app.customProps);
    app.status = LIFECYCLE_ENUM.NOT_MOUNTED;
    return app
  }

  async function toBootstrapPromise(app) {
    if (app.status !== LIFECYCLE_ENUM.NOT_BOOTSTRAPPED) {
      return app
    }
    app.status = LIFECYCLE_ENUM.BOOTSTRAPPING;
    await app.bootstrap(app.customProps);
    app.status = LIFECYCLE_ENUM.NOT_MOUNTED;
    return app
  }

  const routingEventsListeningTo = ['hashchange', 'popstate'];

  // 重新执行reroute
  function urlReroute() {
    reroute();
  }
  // 劫持hashchange、popstate事件
  const originAddEventListener = window.addEventListener;
  const originRemoveEventListener = window.removeEventListener;

  // 被劫持的hashchange、popstate事件
  const capturedEventListeners = {
    hashchange: [],
    popstate: []
  };

  originAddEventListener('hashchange', urlReroute);
  originAddEventListener('popstate', urlReroute);

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
        capturedEventListeners[eventName].push(fn);
        return
      }
    }
    return originAddEventListener.apply(this, arguments)
  };
  window.removeEventListener = function(eventName, fn) {
    if (routingEventsListeningTo.includes(eventName)) {
      if (capturedEventListeners[eventName].includes[fn]) {
        return
      } else {
        capturedEventListeners[eventName] = capturedEventListeners[eventName].filter(item => item !== fn);
        return
      }
    }
    return originRemoveEventListener.apply(this, arguments)
  };

  // 劫持pushState、replaceState方法
  function patchedUpdateState(fn) {
    return function() {
      const preUrl = window.location.href;
      fn.apply(this, arguments);
      const curUrl = window.location.href;
      // 如果url不一致，重新执行urlReroute
      if (preUrl !== curUrl) {
        urlReroute();
      }
    }
  }

  window.history.pushState = patchedUpdateState(window.history.pushState);
  window.history.replaceState = patchedUpdateState(window.history.replaceState);

  function reroute() {
    const {
      appsToLoad,
      appsToMount,
      appsToUnmount
    } = getAppChanges();
    if (startedFlag) {
      return performanceChanges()
    } else {
      return loadApps()
    }
    async function performanceChanges() {
      await appsToUnmount.map(toUnmountPromise);
      appsToLoad.map(async app => {
        await toLoadPromise(app);
        await toBootstrapPromise(app);
        await toMountPromise(app);
      });
      appsToMount.map(async app => {
        await toMountPromise(app);
      });
    }
    async function loadApps() {
      const apps = await Promise.all(appsToLoad.map(toLoadPromise));
      return apps
    }
  }

  const apps = [];

  function registerApplication(appName, loadApp, activeWhen, customProps) {
    apps.push({
      appName,
      loadApp,
      activeWhen,
      customProps,
      status: LIFECYCLE_ENUM.NOT_LOADED
    });
    reroute();
  }

  function getAppChanges() {
    const appsToUnmount = [];
    const appsToMount = [];
    const appsToLoad = [];

    apps.forEach(app => {
      const shouldBeActiveFlag = shouldBeActive(app);
      switch (app.status) {
        case LIFECYCLE_ENUM.NOT_LOADED:
        case LIFECYCLE_ENUM.LOADING_SOURCE_CODE:
          if (shouldBeActiveFlag) {
            appsToLoad.push(app);
          }
          break
        case LIFECYCLE_ENUM.NOT_BOOTSTRAPPED:
        case LIFECYCLE_ENUM.BOOTSTRAPPING:
        case LIFECYCLE_ENUM.NOT_MOUNTED:
          if (shouldBeActiveFlag) {
            appsToMount.push(app);
          }
          break
        case LIFECYCLE_ENUM.MOUNTED:
          if (!shouldBeActiveFlag) {
            appsToUnmount.push(app);
          }
      }
    });

    return {
      appsToLoad,
      appsToMount,
      appsToUnmount
    }
  }

  exports.registerApplication = registerApplication;
  exports.start = start;

}));
//# sourceMappingURL=single-spa.js.map

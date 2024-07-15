# 配置rollup
## 下载依赖
```shell
# 打包工具
pnpm i -D rollup
# 开启web服务
pnpm i -D rollup-plugin-serve
# 注册环境变量
pnpm i -D cross-env
```
## 相关网址
- [rollup](https://rollupjs.org/)
- [rollup-plugin-serve](https://github.com/thgh/rollup-plugin-serve)
- [cross-env](https://www.npmjs.com/package/cross-env)
## rollup.config.mjs配置
```js
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import serve from 'rollup-plugin-serve'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 环境枚举
const NODE_ENV_ENUM = {
  // 开发
  DEVELOPMENT: 'development',
  // 生产
  PRODUCTION: 'production',
}

/**
 * 生成rollup-plugin-serve配置的方法
 * @returns {object} rollup-plugin-serve配置
 */
function pluginServe() {
  return serve({
    // 启动服务时, 是否打开网页
    open: true,
    // 打开网页时，导航到的网址
    openPage: '',
    // 需要serve的目录地址
    contentBase: resolve(__dirname, './public'),
    // 端口
    port: 3000,
  })
}

/**
 * 生成plugins
 * 区分开发环境和生产环境
 * @returns {object[]} plugins
 */
function generatePlugins() {
  let plugins
  if (process.env.NODE_ENV === NODE_ENV_ENUM.DEVELOPMENT) {
    plugins = [
      pluginServe()
    ]
  }
  if (process.env.NODE_ENV === NODE_ENV_ENUM.PRODUCTION)
    plugins = []

  return plugins
}

export default {
  // 主文件入口
  input: 'src/main.js',
  output: {
    // 导出文件地址
    file: './dist/umd/vue.js',
    // 导出文件格式
    format: 'umd',
    // 导出的全局变量名称
    name: 'Vue',
    // 是否开启sourcemap
    sourcemap: true
  },
  plugins: generatePlugins
}
```

import serve from 'rollup-plugin-serve'

export default {
  // 主文件入口
	input: 'src/main.js',
	output: {
    // 导出文件地址
		file: './lib/umd/single-spa.js',
    // 导出文件格式
		format: 'umd',
    // 导出的全局变量名称
    name: 'singleSpa',
    // 是否开启sourcemap
    sourcemap: true
	},
  plugins: [
    serve({
      // 启动服务时, 是否打开网页
      open: true,
      // 打开网页时，导航到的网址
      openPage: '/public/index.html',
      // 需要serve的目录地址
      contentBase: '',
      // 端口
      port: 3000,
    })
  ]
}

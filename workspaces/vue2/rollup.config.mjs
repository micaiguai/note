import serve from 'rollup-plugin-serve'

const NODE_ENV_ENUM = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
}

const pluginServe = () => {
  return serve({
    open: true,
    contentBase: '',
    openPage: '/public/index.html',
    port: 3000,
  })
}

export default {
	input: 'src/main.js',
	output: {
		file: './dist/umd/vue.js',
		format: 'umd',
    name: 'Vue',
    sourcemap: true
	},
  plugins: process.env.NODE_ENV === NODE_ENV_ENUM.DEVELOPMENT
    ? [
      pluginServe()
    ]
    : []
}

const { spawn } = require('node:child_process')
const path = require('node:path')
const chokidar = require('chokidar')

// Start VitePress dev server
let vitepressProcess = bootstrapVitepress()

chokidar.watch(
  path.resolve(__dirname, '../notes/**/*.*'),
  {
    ignoreInitial: true,
  },
)
  .on('all', (event) => {
    if (event === 'add' || event === 'unlink') {
      // Restart VitePress dev server
      vitepressProcess.kill('SIGINT')
      vitepressProcess = bootstrapVitepress()
    }
  })

function bootstrapVitepress() {
  return spawn('npx', ['vitepress', 'dev'], {
    stdio: 'inherit',
    shell: true, // Required on Windows for proper command execution
  })
}

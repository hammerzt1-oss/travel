// Compatibility entry point for existing Render services that still run
// `node server.js`. New deployments use the compiled TypeScript output.
const fs = require('node:fs')
const path = require('node:path')

const compiledServer = path.join(__dirname, 'dist', 'backend', 'server.js')
if (fs.existsSync(compiledServer)) {
  require(compiledServer)
} else {
  require('tsx/cjs')
  require('./server.ts')
}

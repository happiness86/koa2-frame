const net = require('net')

const checkPortUsed = (port) => new Promise((resolve, reject) => {
  let server = net.createServer().listen(port)
  server.on('listening', () => {
    server.close()
    resolve(port)
  })
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      reject(err)
    }
  })
})

const tryPort = async (port, cb) => {
  try {
    const isInUsed = await checkPortUsed(port)
    cb(isInUsed)
  } catch (e) {
    port++
    tryPort(port, cb)
  }
}
module.exports = {
  tryPort
}

var server = require('arcade-controls')({
  remoteHost: process.env.ARCADE_REMOTE_HOST || 'http://localhost:4444'
})

server.listen(3729, function () {
  console.log(process.env.ARCADE_MACHINE_ID, 'is running on 3729')
})

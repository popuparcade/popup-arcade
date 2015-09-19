var server = require('arcade-controls')

server.listen(3729, function () {
  console.log(process.env.ARCADE_MACHINE_ID, 'is running on 3729')
})

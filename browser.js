var createPlayer = require('./player')
var gameloop = require('gameloop')

var server = require('arcade-server')({
  host: 'http://10.0.0.4:4444'
})

var canvas = document.createElement('canvas')
canvas.id = 'game'
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

var game = gameloop({
  renderer: canvas.getContext('2d')
})

var player1 = createPlayer({
  remote: false,
  color: '#3ed24e'
})

var player2 = createPlayer({
  remote: true,
  color: '#fa3f4a'
})

var controls = require('arcade-controls')({
  keyboard: true
})

server.on('move', function (player, position) {
  player2.setPosition(position)
})

game.on('update', function (dt) {
  player1.move(controls.keys)
  player1.update(dt)
  var changedX = player1.lastX !== player1.x
  var changedY = player1.lastY !== player1.y
  if (!(!changedX && !changedY)) {
    server.emit('move', server.id, { x: player1.x, y: player1.y })
  }
})

game.on('draw', function (context) {
  context.fillStyle = '#d3ea2e'
  context.fillRect(0, 0, canvas.width, canvas.height)
  player1.draw(context)
  player2.draw(context)
})

game.start()

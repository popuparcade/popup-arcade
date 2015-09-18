var gameloop = require('gameloop')
var scenes = require('crtrdg-scene')
var createPlayer = require('./player')

/*
* CREATE SERVER OBJECT FOR COMMUNICATING BETWEEN LOCAL & REMOTE MACHINE
*/
var server = require('arcade-server')({
  host: 'http://10.0.0.4:4444'
})

/*
* CREATE THE CANVAS ELEMENT
*/
var canvas = document.createElement('canvas')
canvas.id = 'game'
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

/*
* CREATE THE GAME OBJECT
*/
var game = gameloop({
  renderer: canvas.getContext('2d')
})

/*
* PLAYER 1: THE LOCAL PLAYER
*/
var player1 = createPlayer({
  remote: false,
  color: '#3ed24e'
})

/*
* PLAYER 2: THE REMOTE PLATER
*/
var player2 = createPlayer({
  remote: true,
  color: '#fa3f4a'
})

/*
* GET STATUS OF ARCADE CONTROLS THROUGH `controls.keys`
*/
var controls = require('arcade-controls')({
  keyboard: true
})

/*
* LISTEN FOR THE OTHER PLAYER'S MOVEMENTS
*/
server.on('move', function (player, position) {
  player2.setPosition(position)
})

/*
* GAME UPDATE LOOP
*/
game.on('update', function (dt) {
  scenes.update(dt)
  player1.move(controls.keys)
  player1.update(dt)
  var changedX = player1.lastX !== player1.x
  var changedY = player1.lastY !== player1.y
  if (!(!changedX && !changedY)) {
    server.emit('move', server.id, { x: player1.x, y: player1.y })
  }
})

/*
* GAME DRAW LOOP
*/
game.on('draw', function (context) {
  context.fillStyle = '#d3ea2e'
  context.fillRect(0, 0, canvas.width, canvas.height)
  scenes.draw(context)
  player1.draw(context)
  player2.draw(context)
})

/*
* LEVEL 1
*/
var level1 = scenes({
  name: 'level1'
})

level1.on('update', function (dt) {

})

level1.on('draw', function (canvas) {

})

/*
* LEVEL 2
*/
var level2 = scenes({
  name: 'level2'
})

level2.on('update', function (dt) {

})

level2.on('draw', function (canvas) {

})

/*
* LEVEL 3
*/
var level3 = scenes({
  name: 'level3'
})

level3.on('update', function (dt) {

})

level3.on('draw', function (canvas) {

})

/*
* START THE GAME!!!
*/
game.start()

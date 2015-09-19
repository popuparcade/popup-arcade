var Matter = require('matter-js')
var scenes = require('crtrdg-scene')()
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
var canvas = document.getElementById('game')
canvas.width = (0.7 * window.innerWidth)
canvas.height = window.innerHeight

/*
* CREATE THE GIF ELEMENT
*/
var gif = document.getElementById('gif')
gif.width = (window.innerWidth - canvas.width)
gif.height = window.innerHeight
gif.src = controls.gifURL
/*
* PHYSICS OBJECTS
*/

var Engine = Matter.Engine
var World = Matter.World
var Bodies = Matter.Bodies
var Events = Matter.Events

var engine = Engine.create(document.body, {
  world: { gravity: { x: 0, y: 0 } },
  render: {
    canvas: canvas,
    options: {
      background: '#d3ea2e',
      wireframes: false
    }
  }
})

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

function start () {
  scenes.set('level1')
  Engine.run(engine)
}

Events.on(engine, 'collisionActive', function (e) {
  console.log(e.pairs[0], e.pairs[1])
})

Events.on(engine, 'tick', function (e) {
  var move = player1.move(controls.keys)
  if (move) server.emit('move', server.id, move)
  scenes.update()
  scenes.draw(canvas.getContext('2d'))
})

/*
* PLAYER 1: THE LOCAL PLAYER
*/
var player1 = createPlayer({
  remote: false,
  color: '#3ed24e',
  body: Bodies.rectangle(400, 200, 20, 20) // if we add { isStatic: true } as final argument then it goes through everything
})
console.log(player1)
/*
* PLAYER 2: THE REMOTE PLATER
*/
var player2 = createPlayer({
  remote: true,
  color: '#fa3f4a',
  body: Bodies.rectangle(400, 250, 20, 20)
})

// add all of the bodies to the world
World.add(engine.world, [player1.body, player2.body, ground])

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
  player2.translate(position)
})

/*
* LEVEL 1
*/
var level1 = scenes.create({
  name: 'level1'
})

level1.on('start', function (dt) {
  console.log('weeee')
  var box = Bodies.rectangle(10, 10, 1000, 20, { isStatic: true })
  World.add(engine.world, [box])
})

level1.on('update', function (dt) {

})

level1.on('draw', function (canvas) {

})

level1.on('end', function (dt) {

})

/*
* LEVEL 2
*/
var level2 = scenes.create({
  name: 'level2'
})

level2.on('start', function (dt) {

})

level2.on('update', function (dt) {

})

level2.on('draw', function (canvas) {

})

level2.on('end', function (dt) {

})

/*
* LEVEL 3
*/
var level3 = scenes.create({
  name: 'level3'
})

level3.on('start', function (dt) {

})

level3.on('update', function (dt) {

})

level3.on('draw', function (canvas) {

})

level3.on('end', function (dt) {

})

/*
* START THE GAME!!!!
*/
start()

var Matter = require('matter-js')
var scenes = require('crtrdg-scene')()
var createPlayer = require('./player')

/*
* CREATE SERVER OBJECT FOR COMMUNICATING BETWEEN LOCAL & REMOTE MACHINE
*/
var server = require('arcade-server')({
  host: process.env.ARCADE_REMOTE_HOST || 'http://localhost:4444'
})

server.on('connect', function () {
  server.emit('hello', process.env.ARCADE_MACHINE_ID)
})

/*
* GET STATUS OF ARCADE CONTROLS THROUGH `controls.keys`
*/
var controls = require('arcade-controls')({
  keyboard: true
})

/*
* CREATE THE CANVAS ELEMENT
*/
var canvas = document.getElementById('game')
canvas.width = (0.7 * window.innerWidth)
canvas.height = window.innerHeight

/*
* CREATE THE PLAYER 1 GIF ELEMENT
*/
var gif1 = document.getElementById('player1-gif')
gif1.width = (window.innerWidth - canvas.width)
gif1.height = window.innerHeight / 2
gif1.src = controls.gifURL

/*
* CREATE THE PLAYER 2 GIF ELEMENT
*/
var gif2 = document.getElementById('player2-gif')
gif2.width = (window.innerWidth - canvas.width)
gif2.height = window.innerHeight / 2

server.on('new-gif', function (url) {
  console.log('new gif', url)
  gif2.src = url
})

/*
* AHAHAHAHAHAHA
*/
setTimeout(function () {
  var name = process.env.ARCADE_MACHINE_ID === 'bobo' ? 'bobo' : 'pizzareadyeat'
  var gif2 = document.getElementById('player1-gif')
  gif2.src = '' + process.env.ARCADE_REMOTE_HOST + '/static/' + name + '-latest.git' + '?rand=' + Math.random()
}, 1000)

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

function start () {
  scenes.set('level1')
  Engine.run(engine)
}

Events.on(engine, 'collisionActive', function (e) {
  console.log('bodyA', e.pairs[0].bodyA.label)
  console.log('bodyB', e.pairs[0].bodyB.label)

  var collision = e.pairs[0].bodyA.label
  if (e.pairs[0].bodyB.label === 'remote') {
    if (collision === 'trap') {
      console.log('it is a trap OH NOOOO')
      // TODO: the actual code
    } else if (collision === 'goal') {
      console.log('hey you did it WOOO HOOOO')
      // TODO: the actual code
    }
  }
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
  body: Bodies.rectangle(20, 20, 20, 20) // if we add { isStatic: true } as final argument then it goes through everything
})

/*
* PLAYER 2: THE REMOTE PLAYER
*/
var player2 = createPlayer({
  remote: true,
  color: '#fa3f4a',
  body: Bodies.rectangle(50, 20, 20, 20)
})

/*
* ADD THE PLAYERS TO THE WORLD
*/
World.add(engine.world, [player1.body, player2.body])

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
  var wall1 = Bodies.rectangle(100, 100, 800, 20, {
    label: 'wall',
    isStatic: true
  })
  var wall2 = Bodies.rectangle(800, 520, 1000, 50, {
    label: 'wall2',
    isStatic: true
  })
  var wall3 = Bodies.rectangle(200, 400, 50, 500, {
    label: 'wall3',
    isStatic: true
  })
  var wall4 = Bodies.rectangle(800, 100, 50, 500, {
    label: 'wall3',
    isStatic: true
  })
  var wall5 = Bodies.rectangle(400, 700, 100, 250, {
    label: 'wall3',
    isStatic: true
  })
  World.add(engine.world, [wall1, wall2, wall3, wall4, wall5])
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

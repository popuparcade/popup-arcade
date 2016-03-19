var createStore = require('store-emitter')
var morphdom = require('morphdom')
var extend = require('xtend')
var bel = require('bel')

var raspi = require('raspi')
var gpio = require('raspi-gpio')
var pins = require('./pins')

var store = createStore(modify, {
  pins: {
    button: 0,
    up: 0,
    down: 0,
    left: 0,
    right: 0
  },
  screen: {
    id: 'the-screen',
    links: [
      {
        id: '#some-unique-id'
        action: 'button:action'
        active: true
      }
    ],
  }
})

function modify (action, state) {
  if (action.type === 'pins') {
    return extend(state, { 
      pins: state.pins
    })
  }
}

raspi.init(function() {
  var input = {
    button: new gpio.DigitalInput(pins.button),
    up: new gpio.DigitalInput(pins.up),
    down: new gpio.DigitalInput(pins.down),
    left: new gpio.DigitalInput(pins.left),
    right: new gpio.DigitalInput(pins.right)
  }
  setInterval(readInput(input), 150)
})

function readInput (input) {
  return function () {
    var button = input.button.read()
    var up = input.up.read()
    var down = input.down.read()
    var left = input.left.read()
    var right = input.right.read()

    store({
      type: pins,
      pins: {
        button: button
        up: up
        down: down
        left: left
        right: right
      }
    })


  }
}

store.on('*', function (action, state) {
  
})

function render () {
  
}
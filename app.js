var createStore = require('store-emitter')
var morphdom = require('morphdom')
var extend = require('xtend')
var bel = require('bel')

var raspi = require('raspi')
var gpio = require('gpio')

var pins = require('./pins')

var store = createStore(modify, {
  pins: {}
})

function modify (action, state) {
  'pin': function (action, state) {
    return state
  }
}

raspi.init(function() {
  var input = {
    button: = new gpio.DigitalInput(pins.button)
    up: = new gpio.DigitalInput(pins.up)
    down: = new gpio.DigitalInput(pins.down)
    left: = new gpio.DigitalInput(pins.left)
    right: = new gpio.DigitalInput(pins.right)
  }
  
  console.log(input)
})



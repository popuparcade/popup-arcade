var raspi = require('raspi')
var gpio = require('raspi-gpio')
var pins = require('./pins')

console.log(process.versions)

raspi.init(function() {
  var input = {
    button1: new gpio.DigitalInput(pins.button1),
    button2: new gpio.DigitalInput(pins.button2),
    up: new gpio.DigitalInput(pins.up),
    down: new gpio.DigitalInput(pins.down),
    left: new gpio.DigitalInput(pins.left),
    right: new gpio.DigitalInput(pins.right)
  }
  setInterval(readInput(input), 15)
})

function readInput (input) {
  return function () {
    var button1 = input.button1.read()
    var button2 = input.button2.read()
    var up = input.up.read()
    var down = input.down.read()
    var left = input.left.read()
    var right = input.right.read()
    if (button1) console.log('button1', button1)
    if (button2) console.log('button2', button2)
    if (up) console.log('up', up)
    if (down) console.log('down', down)
    if (left) console.log('left', left)
    if (right) console.log('right', right)
  }
}

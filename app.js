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


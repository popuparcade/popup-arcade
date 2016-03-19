var createStore = require('store-emitter')
var morphdom = require('morphdom')
var extend = require('xtend')
var hyperx = require('hyperx')
var bel = require('bel')

var createElement = bel.createElement
var hx = hyperx(createElement)

var store = createStore(modify, {
  pins: {}
})

function modify (action, state) {
  'pin': function (action, state) {
    return state
  }
}

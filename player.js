var Matter = require('matter-js')
module.exports = Player

function Player (options) {
  if (!(this instanceof Player)) return new Player(options)
  this.id = options.id
  this.color = options.color || '#d34a2e'
  this.remote = options.remote || false
  this.body = options.body
  this.body.render.fillStyle = options.color
  this.body.render.strokeStyle = options.color
  this.body.render.lineWidth = 1
  if (this.remote) {
    this.body.label = 'remote'
  } else {
    this.body.label = 'local'
  }
}

Player.prototype.translate = function (vector) {
  Matter.Body.translate(this.body, vector)
}

Player.prototype.move = function (keys) {
  var vector
  if (keys.up) vector = { x: 0, y: -5 }
  else if (keys.down) vector = { x: 0, y: 5 }
  else if (keys.left) vector = { x: -5, y: 0 }
  else if (keys.right) vector = { x: 5, y: 0 }
  if (vector) {
    this.translate(vector)
    return vector
  }
}

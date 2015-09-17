module.exports = Player

function Player (options) {
  if (!(this instanceof Player)) return new Player(options)
  this.id = options.id
  this.color = options.color || '#d34a2e'
  this.x = options.x || 0
  this.y = options.y || 0
  this.width = options.width || 20
  this.height = options.height || 20
  this.speed = options.speed || 8
  this.friction = options.friction || 0.9
  this.velocity = options.velocity || { x: 0, y: 0 }
  this.remote = options.remote || false
}

Player.prototype.setPosition = function (position) {
  this.x = position.x
  this.y = position.y
}

Player.prototype.move = function player_move (keys) {
  if (keys.up) this.velocity.y = -this.speed
  if (keys.down) this.velocity.y = this.speed
  if (keys.right) this.velocity.x = this.speed
  if (keys.left) this.velocity.x = -this.speed
}

Player.prototype.update = function (dt) {
  this.x += this.velocity.x || 0
  this.y += this.velocity.y || 0
  this.velocity.x *= this.friction
  this.velocity.y *= this.friction
}

Player.prototype.draw = function (context) {
  context.fillStyle = this.color
  context.fillRect(this.x, this.y, this.width, this.height)
}

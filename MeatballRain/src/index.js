game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')
  
game.state.add('levelState', MeatballRain.levelState)
  
game.state.start('levelState')

console.log('connected')

var mainState = {
  preload: function() {
    game.load.image('bird', 'assets/bird.png')
  },

  create: function (){

  },

  update: function() {

  }

};

var game = new Phaser.Game(400,490);

game.state.add('main', mainState);

game.state.start('main')

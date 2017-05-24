console.log('connected')

var mainState = {
  preload: function() {
    game.load.image('dog', 'assets/dog.png')
    game.load.image('background', 'assets/background.jpg')
    game.load.image('bone', 'assets/bone.png')
  },

  create: function (){

    game.add.sprite(0,0,'background').scale.setTo(2,2);

    var dog = game.add.sprite(100, 400, 'dog').scale.setTo(0.1,0.1);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable(dog);

    // this.dog.body.gravity.y = 1000;

    var spaceKey = game.input.keyboard.addKey(
      Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.add(this.jump, this);
    },

  update: function() {
    if (this.dog.y < 0 || this.dog.y > 560)
        this.restartGame();
    },
      jump: function() {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },

    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
  };



var game = new Phaser.Game(800,560);

game.state.add('main', mainState);

game.state.start('main')

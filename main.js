var game = new Phaser.Game(800, 560);
console.log('connected')
var mainState = {
  preload: function() {
    game.load.image('dog', 'assets/dog.png')
    game.load.image('background', 'assets/background.jpg')
    game.load.image('bone', 'assets/bone.png')
  },

  create: function() {

    game.add.sprite(0, 0, 'background').scale.setTo(2, 2);
    game.stage.backgroundColor = '#71c5cf';

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.dog = game.add.sprite(100, 400, 'dog')
    this.dog.scale.setTo(0.1, 0.1);

    game.physics.arcade.enable(this.dog);
    console.log(this.dog)
    this.dog.body.gravity.y = 1000;

    var spaceKey = game.input.keyboard.addKey(
      Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);


    this.bones = game.add.group();
    this.timer = game.time.events.loop(1000, this.addRowOfBones, this);

    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0",
    { font: "30px Arial", fill: "#ffffff" });

  },

  update: function() {
    if (this.dog.y < 0 || this.dog.y > 560)
      this.restartGame();
      // game.physics.arcade.overlap(
      //   this.dog, this.bones, this.restartGame, null, this);
  },
  jump: function() {
    // Add a vertical velocity to the bird
    this.dog.body.velocity.y = -350;
  },

  restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
  },
  addOneBone: function(x, y) {
    // Create a bone at the position x and y
    var bone = game.add.sprite(x, y, 'bone');

    bone.scale.setTo(0.2, 0.2)
    // Add the bone to our previously created group
    this.bones.add(bone);
    // Enable physics on the bone
    game.physics.arcade.enable(bone);

    // Add velocity to the bone to make it move left
    bone.body.velocity.x = -200;

    // Automatically kill the bone when it's no longer visible
    bone.checkWorldBounds = true;
    bone.outOfBoundsKill = true;
  },
  addRowOfBones: function() {

    const random = () => {
      return (Math.floor(Math.random() * 5) + 1) * 100;
    }
    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'


        this.addOneBone(800, random());
        this.score += 1;
       this.labelScore.text = this.score;
  }
};




game.state.add('main', mainState);

game.state.start('main')

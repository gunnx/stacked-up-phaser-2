import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

class Preload extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);

    // load your assets
    this.load.image('bluebar', 'assets/images/raster-blue.png');
    this.load.image('banana', 'assets/images/banana.png');
    this.load.image('cake', 'assets/images/cake.png');
    this.load.image('candycane', 'assets/images/candycane.png');
    this.load.image('carrot', 'assets/images/carrot.png');
    this.load.image('cherry', 'assets/images/cherry.png');
    this.load.image('lemon', 'assets/images/lemon.png');
    this.load.image('orange', 'assets/images/orange.png');
    this.load.image('pear', 'assets/images/pear.png');
    this.load.image('volume-up', 'assets/images/volume-up.png');
    this.load.image('volume-mute', 'assets/images/volume-mute.png');

    // load bg music
    this.load.audio('chordian', ['assets/music/chordian.mp3', 'assets/music/chordian.ogg']);
  }

  create () {
    this.state.start('Title');
  }
}

export default Preload;

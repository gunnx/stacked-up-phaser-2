import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import TitleState from './states/Title';

class Game extends Phaser.Game {

  constructor () {
    super(700, 600, Phaser.AUTO, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Preload', PreloadState, false);
    this.state.add('Title', TitleState, false);

    this.state.start('Boot');
  }
}

window.game = new Game();

import Phaser from 'phaser';
import WebFont from 'webfontloader';

class Boot extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload () {
    WebFont.load({
      custom: {
        families: ['Crackman'],
        urls: ['/assets/font/fonts.css']
      },
      active: this.fontsLoaded
    });

    let text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      '...loading...',
      { font: '32px Arial', fill: '#ffffff', align: 'center' }
    );
    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Preload');
    }
  }

  fontsLoaded () {
    this.fontsReady = true;
  }
}

export default Boot;

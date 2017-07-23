/* globals __DEV__ */
import Phaser from 'phaser';
import Fruit from '../sprites/Fruit';

class Title extends Phaser.State {
  init () {
    this.rasterData = null;
    this.rasterPositions = [];
    this.rasterGroup = null;
    this.fruits = ['banana', 'lemon', 'cake', 'candycane', 'cherry', 'pear', 'carrot', 'orange'];
    this.isMuted = false;
    this.bgMusic = null;
    this.volume = null;
  }

  preload () {}

  generateRasters() {
    //  Generate our motion data
    this.rasterData = this.game.make.tween({ y: 0 }).to( { y: 310 }, 1000, Phaser.Easing.Sinusoidal.In).yoyo(true).generateData(60);

    //  A group of rasters
    this.rasterGroup = this.game.add.group();

    //  The total number + spacing between each one
    const total = 8;
    const offset = 4;

    for (let i = 0; i < total; i++)
    {
      const raster = this.rasterGroup.create(0, 0, 'bluebar');
      raster.width = 800;
      raster.alpha = (i + 1) * (1 / total);
      this.rasterPositions.push(i * offset);
    }
  }

  addDeveloperText() {
    const text = this.add.text(this.game.world.centerX, 150, 'SEASALT DIGITAL GAMES\nPRESENTS');
    text.font = 'Crackman';
    text.fontSize = 48;
    text.fill = '#ffffff';
    text.anchor.setTo(0.5);
    text.align = 'center';
  }

  addTitle() {
    const banner = this.add.text(this.game.world.centerX, 300, 'STACKED-UP');
    banner.font = 'Crackman';
    banner.fontSize = 72;
    banner.fill = '#940000';
    banner.anchor.setTo(0.5);
    banner.addColor('#B5B500',1);
    banner.addColor('#2163B5',2);
    banner.addColor('#940000',3);
    banner.addColor('#B5B500',4);
    banner.addColor('#2163B5',5);
    banner.addColor('#940000',6);
    banner.addColor('#B5B500',8);
    banner.addColor('#2163B5',9);
  }

  addMusic() {
    this.bgMusic = this.game.add.audio('chordian', 1, true);
    this.bgMusic.play();

    // add sprite to mute volume
    this.volume = this.game.add.sprite(this.game.width - 30, 0, 'volume-up');
    this.volume.inputEnabled = true;
    this.volume.events.onInputDown.add(this.handleVolume, this);

  }

  handleVolume() {
    if (!this.isMuted) {
      this.bgMusic.pause();
      this.isMuted = true;
      this.volume.loadTexture('volume-mute');
    } else {
      this.bgMusic.resume();
      this.isMuted = false;
      this.volume.loadTexture('volume-up');
    }
  }

  addFruits() {
    let delay = 1000;
    this.fruits.forEach((name) => {
      const fruit = new Fruit({
        game: this.game,
        x: this.game.world.width + 100,
        y: this.game.world.height - 50,
        asset: name
      });
      fruit.inputEnabled = true;
      fruit.anchor.setTo(0.5);
      fruit.events.onInputDown.add(() => {
        fruit.scale.x = fruit.scale.x * -1;
      }, this);
      const sprite = this.game.add.existing(fruit);
      const tween = this.game.add.tween(sprite);
      delay += 500;
      tween.to({ x: -100}, 5000, 'Linear', true, delay, -1, true);
    });
  }

  create () {
    // cool bg effect
    this.generateRasters();

    this.addDeveloperText();

    this.addTitle();

    this.addMusic();

    this.addFruits();
  }

  render () {
    if (process.env.NODE_ENV === 'development') {
      //this.game.debug.spriteInfo(this.mushroom, 16, 16);
    }
  }

  update() {
    this.rasterGroup.resetCursor();

    for (let i = 0; i < this.rasterGroup.total; i++)
    {
      this.rasterPositions[i]++;

      if (this.rasterPositions[i] === this.rasterData.length)
      {
        this.rasterPositions[i] = 0;
      }

      this.rasterGroup.cursor.y = 100 + this.rasterData[this.rasterPositions[i]].y;
      this.rasterGroup.next();
    }
  }
}

export default Title;

export class MenuScene extends Phaser.Scene {
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];
  private _image1: Phaser.GameObjects.Image;
  private _image2: Phaser.GameObjects.Image;
  private _tapCount: number;
  constructor() {
    super({
      key: "MenuScene"
    });
  }

  init(): void {
    this.initRegistry();
    let _this = this;
    this.input.on('pointerup', function () {
      _this.changeScene();
    });
  }

  create(): void {
    this._tapCount = 0;
    let image = this.textures.get("menu").getSourceImage();
    this._image2 = this.add.image(image.width / 2, image.height / 2, "instruction");
    this._image1 = this.add.image(image.width / 2, image.height / 2, "menu");
    // let fontSize = (window.constants.HD_FLAG)? 22 : 10;
    // this.bitmapTexts.push(
    //   this.add.bitmapText(
    //     this.sys.canvas.width / 2 ,
    //     this.sys.canvas.height / 2,
    //     "font1",
    //     "TAP To PLAY",
    //     fontSize
    //   )
    // );

    // this.bitmapTexts.push(
    //   this.add.bitmapText(
    //     this.sys.canvas.width / 2 - 60,
    //     this.sys.canvas.height / 2 - 40,
    //     "font1",
    //     "THE OFFICE",
    //     fontSize
    //   )
    // );
    // this.scene.add.image()
  }

  update(): void {

  }
  
  private changeScene()
  {
    this._tapCount++;
    if(this._tapCount > 1) {
      this.scene.start("GameScene");
    }
    else {
      this._image1.setAlpha(0);
    }
    // this.scene.start("HUDScene");
    // this.scene.bringToTop("HUDScene");
  }

  /**
   * Build-in global game data manager to exchange data between scenes.
   * Here we initialize our variables with a key.
   */
  private initRegistry(): void {
    this.registry.set("money", 0);
    this.registry.set("mood", 10);
    this.registry.set("level", 1);
  }
}

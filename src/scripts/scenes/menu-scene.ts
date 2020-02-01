export class MenuScene extends Phaser.Scene {
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

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
    let fontSize = (window.constants.HD_FLAG)? 22 : 10;
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 ,
        this.sys.canvas.height / 2,
        "font1",
        "TAP To PLAY",
        fontSize
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 60,
        this.sys.canvas.height / 2 - 40,
        "font1",
        "THE OFFICE",
        fontSize
      )
    );
  }

  update(): void {

  }
  
  private changeScene()
  {
    this.scene.start("HUDScene");
    this.scene.start("GameScene");
    this.scene.bringToTop("HUDScene");
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

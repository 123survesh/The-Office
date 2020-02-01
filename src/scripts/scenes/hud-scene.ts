export class HUDScene extends Phaser.Scene {
  private bitmapTexts: Phaser.GameObjects.BitmapText[];

  constructor() {
    super({
      key: "HUDScene"
    });
  }

  init(): void {
    this.bitmapTexts = [];
  }

  create(): void {
    let fontSize = (window.constants.HD_FLAG)? 22 : 10;
    // create bitmap texts
    this.bitmapTexts.push(
      this.add.bitmapText(
        10,
        window.constants.BASE_HEIGHT - 20,
        "font1",
        `Mood: ${this.registry.get("mood")}`,
        fontSize
      )
    );
    this.bitmapTexts.push(
      this.add.bitmapText(
        10,
        10,
        "font1",
        `Money: ${this.registry.get("money")}`,
        fontSize
      )
    );

    // create events
    const level = this.scene.get("GameScene");
    level.events.on("pointsChanged", this.updatePoints, this);
    level.events.on("healthChanged", this.updateLives, this);
  }

  private updatePoints() {
    this.bitmapTexts[1].setText(`Points: ${this.registry.get("money")}`);
  }

  private updateLives() {
    this.bitmapTexts[0].setText(`Health: ${this.registry.get("mood")}`);
  }
}

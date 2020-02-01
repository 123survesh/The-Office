export class GameScene extends Phaser.Scene {
  // private enemies: Phaser.GameObjects.Group;
  private _containers: { [key: string]: Phaser.GameObjects.Container } = {};

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this._containers["office"] = this.add.container(0, 0);
    this._containers["worker"] = this.add.container(0, 0);
  }

  create(): void {
    // create game objects

  }

  update(time, dt: number): void {
    if (this._player.active) {
      this._player.update(time, dt);
      this._spawnManager.update(time, dt);
      // this._checkCollisions();
    }
    if (this.registry.get("health") <= 0) {
      this.scene.start("MenuScene");
      this.scene.stop("HUDScene");
    }
  }

}

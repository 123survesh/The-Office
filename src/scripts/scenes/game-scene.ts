import RoomManager from "../managers/RoomManager";
import RepairMenManager from "../managers/RepairMenManager";
import RepairMan from "../objects/repair_man";
import Room from "../objects/room";
export class GameScene extends Phaser.Scene {
  // private enemies: Phaser.GameObjects.Group;
  private _containers: { [key: string]: Phaser.GameObjects.Container } = {};
  private _roomManager: RoomManager;
  private _repairMenManager: RepairMenManager;


  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    let width = window.constants.width
    this._containers["hud_bar"] = this.add.container(0, 0);
    this._containers["hud_bar"].setSize(window.constants.DATA.dimensions.hud_bar.width, window.constants.DATA.dimensions.hud_bar.height);
    this._containers["hud_bar"].setPosition(0, 0);

    this._containers["office_space"] = this.add.container(0, 0);
    this._containers["office_space"].setSize(window.constants.DATA.dimensions.office_space.width, window.constants.DATA.dimensions.office_space.height);
    this._containers["office_space"].setPosition(0, window.constants.DATA.dimensions.hud_bar.height);

    this._containers["repair_men_bar"] = this.add.container(0, 0);
    this._containers["repair_men_bar"].setSize(window.constants.DATA.dimensions.repair_men_bar.width, window.constants.DATA.dimensions.repair_men_bar.height);
    this._containers["repair_men_bar"].setPosition(0, window.constants.DATA.dimensions.hud_bar.height + window.constants.DATA.dimensions.office_space.height);
  }

  create(): void {
    // create game objects
    this._roomManager = new RoomManager(this, this._containers["office_space"]);
    this._repairMenManager = new RepairMenManager(this, this._containers["repair_men_bar"]);

  }

  update(time, dt: number): void {
    this._roomManager.update(time, dt);
    this._repairMenManager.update(time, dt);
    // if (this._player.active) {
    //   this._player.update(time, dt);
    //   this._spawnManager.update(time, dt);
    //   // this._checkCollisions();
    // }
    // if (this.registry.get("health") <= 0) {
    //   this.scene.start("MenuScene");
    //   this.scene.stop("HUDScene");
    // }

  }

}

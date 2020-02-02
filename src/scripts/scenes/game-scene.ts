import RoomManager from "../managers/RoomManager";
import RepairMenManager from "../managers/RepairMenManager";
import RepairMan from "../objects/repair_man";
import Room from "../objects/room";
import { repairManLimit } from "../../assets/data/game_data";
import Boss from "../objects/boss";
export class GameScene extends Phaser.Scene {
  // private enemies: Phaser.GameObjects.Group;
  private _containers: { [key: string]: Phaser.GameObjects.Container } = {};
  private _roomManager: RoomManager;
  private _repairMenManager: RepairMenManager;
  private _boss : Boss;
  private _floor:Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "GameScene"
    });

  }

  init(): void {
    let dimensions = window.constants.DATA.dimensions;
    // let width = 1080, height = 1920;
    let width = window.screen.width, height = window.screen.height;
    
    this._containers["boss_bar"] = this.add.container(0, 0);
    this._containers["boss_bar"].setSize(dimensions["boss_bar"].width * width, dimensions["boss_bar"].height * height);
    this._containers["boss_bar"].setPosition(0, 0);

    this._containers["office_space"] = this.add.container(0, 0);
    this._containers["office_space"].setSize(dimensions.office_space.width * width, dimensions.office_space.height * height);
    this._containers["office_space"].setPosition(0, this._containers["boss_bar"].height);

    this._containers["repair_men_bar"] = this.add.container(0, 0);
    this._containers["repair_men_bar"].setSize(dimensions.repair_men_bar.width * width, dimensions.repair_men_bar.height * height);
    this._containers["repair_men_bar"].setPosition(0, this._containers["boss_bar"].height + this._containers["office_space"].height);

  }
  
  create(): void {
    this._floor = this.add.image(0,0,"floor").setOrigin(0,0).setDepth(-10);
    this._boss = new Boss(this, 0, 0, "boss", this._containers["boss_bar"], this._containers["office_space"]);
    this._repairMenManager = new RepairMenManager(this, this._containers["repair_men_bar"], this._pointerUpCallback.bind(this), this._containers["boss_bar"]);
    this._addInputEvents();
  }

  update(time, dt: number): void {
    this._boss.update(time, dt);
    this._repairMenManager.update(time, dt);
  }

  private _pointerUpCallback(repairMan) {
    let rooms = this._boss.getRooms();
    let keys = Object.keys(this._repairMenManager.repairMen);
    for(let i=0, length = keys.length; i < length; i++) {
      this.physics.overlap(
        repairMan,
        rooms,
        this._repairManHitRoom,
        null,
        this
      );
    }
  }

  private _addInputEvents() {
    this.input.on('dragstart', function (pointer, gameObject) {
      if(!gameObject.onRoom) {
        this.children.bringToTop(gameObject);
      }

    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      if(!gameObject.onRoom) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }

    });
  }

  private _repairManHitRoom(repairMan : RepairMan, room: Room) {
    // console.log("Collision baby!!!");
    repairMan.onRoom = true;
    repairMan.repair(room);
  }

}

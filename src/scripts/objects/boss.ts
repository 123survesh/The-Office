import RoomManager from "../managers/RoomManager";

export default class Boss extends Phaser.GameObjects.Image {
    public mood: number;
    private _roomManager: RoomManager;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, container_boss, container_rooms) {
        super(scene, x, y, key);
        container_boss.add(this);
        this._roomManager = new RoomManager(scene, container_rooms);
    }
    
    update(time, dt) {
        this._roomManager.update(time, dt);
    }

    public getRooms() {
        return this._roomManager.rooms;
    }
}
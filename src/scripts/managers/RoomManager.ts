import Room from '../objects/room';
export default class RoomManager {
	public rooms: Array<Room> = [];
	private _scene: Phaser.Scene;
	private _container: Phaser.GameObjects.Container;
	constructor(scene, container) {
		this._scene = scene;
		this._container = container;
		this._createRooms();
	}

	private _createRooms() {
		let room_image = this._scene.textures.get('room').getSourceImage();
		let height = this._container.height / 4;
		let width = this._container.width / 3;
		this.rooms[0] = new Room(this._scene, (room_image.width/2), 0, 'room');
		this._container.add(this.rooms[0]);
	}

	update(time, dt) {
		
	}
}
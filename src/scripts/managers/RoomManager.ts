import Room from '../objects/room';
export default class RoomManager {
	public rooms: Array<Room> = [];
	private _scene: Phaser.Scene;
	private _container: Phaser.GameObjects.Container;
	private _position: Array <any> = [];
	private _rows: number = 3;
	private _columns: number = 2;
	private _height: number = 0;
	private _width: number = 0;
	constructor(scene, container) {
		this._scene = scene;
		this._container = container;
		this._splitContainer();
		this._createRooms();
	}

	private _splitContainer()
	{
		let rows = this._rows, columns = this._columns, x = this._container.x, y = this._container.y;
		this._width = this._container.width / columns;
		this._height = this._container.height / rows;
		for(let i=0; i< rows;i++ ) {
			for(let j=0;j<columns;j++) {
				this._position[(i*(columns))+ j] = {
					x: ((this._width * j) + (this._width / 2)),
					y: ((this._height * i) + (this._height / 2))
				};
			}
		}
	}

	private _createRooms() {
		let room_image = this._scene.textures.get('room').getSourceImage();
		for(let i=0,length = this._position.length;i<length;i++) {
			this.rooms[i] = new Room(this._scene, this._position[i].x, this._position[i].y, 'room');
			this._container.add(this.rooms[i]);
		}
	}

	update(time, dt) {
		
	}
}
import Room from '../objects/room';
import {skillType, wave} from '../../assets/data/game_data';
export default class RoomManager {
	public rooms: Phaser.GameObjects.Group;
	private _scene: Phaser.Scene;
	private _container: Phaser.GameObjects.Container;
	private _position: Array <any> = [];
	public damageState: Array <number> = [];
	private _rows: number = 3;
	private _columns: number = 2;
	private _height: number = 0;
	private _width: number = 0;
	private _skills: Array<string>;

	public waveIndex: number = 0;

	private _timeElapsed: number = 0;
	private _payForJob: Function;
	
	constructor(scene, container, payForJob) {
		this._scene = scene;
		this._container = container;
		this.damageState = [];
		this._skills = Object.keys(skillType);
		this._payForJob = payForJob;
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
					x:((this._width * j) + (this._width / 2)),
					y:((this._height * i) + (this._height / 2))
				};
			}
		}
	}

	private _createRoomCallback(room: Room) {
		let index = this.rooms.getLength() -1;
		room.setProperties(this._position[index].x, this._position[index].y, this._container, this._setDamage.bind(this), index, this._payForJob);
		this.damageState[index] = 1;
	}

	private _setDamage(damage: number, index: number) {
		this.damageState[index] = damage;
	}

	private _createRooms() {
		this.rooms = this._scene.add.group({
			classType: Room,
			maxSize: 6,
			runChildUpdate: true,
			createCallback: this._createRoomCallback.bind(this),
			defaultKey: "room"
		});
		this.rooms.createMultiple({
			classType: Room,
			key: "room",
			quantity: 6,
			visible: true,
			active: true,
			setXY: {
				x: 0,
				y: 0
			}
		})
	}

	update(time, dt) {
		this._timeElapsed += (dt * 0.001);
		if(this._timeElapsed >= 5) {
			this._timeElapsed = 0;
			let random1 = Math.floor(5 * Math.random()), random2 = Math.floor(3 * Math.random());
			this.rooms.getFirstNth(random1, true).startDamage(this._skills[random2]);
		}
	}

	public spawn(n, type) {
		this.rooms.getFirstNth(n, true).startDamage(type);
	}

	public getRoom(n: number) {
		return this.rooms.getFirstNth(n, true);
	}
}
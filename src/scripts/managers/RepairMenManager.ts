import RepairMan from "../objects/repair_man";

export default class WorkerManager {
	public repairMen: Array<RepairMan> = [];
	private _scene: Phaser.Scene;
	private _container: Phaser.GameObjects.Container;
	private _columns: number = 3;
	private _height: number = 0;
	private _width: number = 0;
	private _position: Array <any> = [];
	constructor(scene, container) {
		this._scene = scene;
		this._container = container;
		this._splitContainer();
		this._createRepairMen();
	}

	private _splitContainer()
	{
		let columns = this._columns, x = this._container.x, y = this._container.y;
		this._width = this._container.width / columns;
		this._height = this._container.height;
		for(let j=0;j<columns;j++) {
			this._position[j] = {
				x: ((this._width * j) + (this._width / 2)),
				y: ((this._height / 2))
			};
		}
	}

	private _createRepairMen() {
		let width = this._width * 0.8, height = this._height * 0.8;
		for(let i=0;i<this._columns;i++)
		{
			this.repairMen[i] = new RepairMan(this._scene, this._position[i].x, this._position[i].y	, 'player'); 
			this._container.add(this.repairMen[i]);
		}
	}

	update(time, dt) {
		
	}
}
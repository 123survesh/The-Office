import RepairMan from "../objects/repair_man";
import {skillType, priceList, repairManLimit} from "../../assets/data/game_data";
export default class RepairMenManager {
	public repairMen: {
		[key: string] : RepairMan[]
	};
	public money: number = 0;

	private _scene: Phaser.Scene;
	private _container: Phaser.GameObjects.Container;
	private _columns: number = 3;
	private _height: number = 0;
	private _width: number = 0;
	private _position: {};

	private _types = ["electric"]

	constructor(scene, container) {
		this._scene = scene;
		this._container = container;

		this._splitContainer();
		this._createRepairMen();
	}

	private _splitContainer()
	{
		let keys = Object.keys(skillType);
		this._columns = keys.length;
		let columns = this._columns, x = this._container.x, y = this._container.y;
		this._width = this._container.width / columns;
		this._height = this._container.height;
		for(let j=0;j<columns;j++) {
			this._position[keys[j]] = {
				x: ((this._width * j) + (this._width / 2)),
				y: ((this._height / 2))
			};
		}
	}

	private _createRepairMen() {
		let width = this._width * 0.8, height = this._height * 0.8;
		let keys = Object.keys(skillType);
		this._columns = keys.length;
		for(let i=0, length = keys.length;i<length;i++) {
			let key = keys[i];
			this.repairMen[key] = [new RepairMan(this._scene, this._position[i].x, this._position[i].y, 'player', key)];
			this._container.add(this.repairMen[key][0]);
		}
	}

	public buy(key) {
		if(priceList[key]) {
			if(priceList[key] <= this.money) {
				let length = this.repairMen[key].length;
				if(length < 3)
				{
					this.repairMen[key].push(new RepairMan(this._scene, this._position[key].x, this._position[key].y, 'player', key));
					this._container.add(this.repairMen[key][length]);
				}
			}
		}
	}

	update(time, dt) {
		
	}
}
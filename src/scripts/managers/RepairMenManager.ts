import RepairMan from "../objects/repair_man";

export default class WorkerManager {
	public repairMen: Array<RepairMan> = [];
	private _scene: Phaser.Scene;
	private _container: Phaser.GameObjects.Container;
	constructor(scene, container) {
		this._scene = scene;
		this._container = container;
		this._createRepairMen();
	}

	private _createRepairMen() {
		this.repairMen[0] = new RepairMan(this._scene, 0, 0, 'player');
		this._container.add(this.repairMen[0]);
	}

	update(time, dt) {
		
	}
}
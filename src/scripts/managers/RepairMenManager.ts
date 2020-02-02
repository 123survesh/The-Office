import RepairMan from "../objects/repair_man";
import InfoBar from "../objects/inforbar";
import {skillType, priceList, repairManLimit} from "../../assets/data/game_data";
export default class RepairMenManager {
	public repairMen: {
		[key: string] : { 
			men?: Phaser.GameObjects.Group, 
			tapsRemaining?: number, 
			totalTaps?: number, 
			tapRechargeTime?: number, 
			remainingRechargeTime?: number, 
			recharging?: boolean,
			countText?: Phaser.GameObjects.Text,
			rechargeText?: Phaser.GameObjects.Text
			energyBar ?: InfoBar;
			
		 }
	};
	public money: number = 0;

	private _scene: Phaser.Scene;
	private _container: Phaser.GameObjects.Container;
	private _columns: number = 3;
	private _height: number = 0;
	private _width: number = 0;
	private _position: {};
	private _pointerUpCallback: Function;
	

	private _types: Array<string>;

	private _moneyText: Phaser.GameObjects.Text;

	constructor(scene, container, pointerUpCallback, hudContainer) {
		this._scene = scene;
		this._container = container;
		this._pointerUpCallback = pointerUpCallback;
		this._types = Object.keys(skillType);
		this._splitContainer();
		this._createRepairMen();
		this._moneyText = this._scene.add.text(hudContainer.width - 100, hudContainer.height / 2, "Coins: 0", {fontSize: 30, fontFamily: "sans"});
		this._moneyText.setOrigin(0.5, 0.5);
		hudContainer.add(this._moneyText);

	}

	private _splitContainer()
	{
		this._position = {};
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

	private _createRepairManCallback(repairMan) {
		repairMan.setProperties(this._container, this._pointerUpCallback, this.getTap.bind(this), this.getMoney.bind(this));
	}

	private _createRepairMen() {
		this.repairMen = {};
		let width = this._width * 0.8, height = this._height * 0.8;
		let keys = Object.keys(skillType);
		this._columns = keys.length;
		for(let i=0, length = keys.length;i<length;i++) {
			let key = keys[i];
			this.repairMen[key] = {};
			this.repairMen[key].men = this._scene.add.group({
				classType: RepairMan,
				maxSize: 3,
				runChildUpdate: true,
				createCallback: this._createRepairManCallback.bind(this),
				defaultKey: "player"
			});

			let repairMan = new RepairMan(this._scene, this._position[key].x, this._position[key].y,key, key);
			repairMan.setProperties(this._container, this._pointerUpCallback, this.getTap.bind(this), this.getMoney.bind(this));

			this.repairMen[key].men.add(repairMan);
			this.repairMen[key].totalTaps = 5;
			this.repairMen[key].tapsRemaining = this.repairMen[key].totalTaps;
			this.repairMen[key].tapRechargeTime = 5; 
			this.repairMen[key].remainingRechargeTime = this.repairMen[key].tapRechargeTime = 5;
			this.repairMen[key].recharging = false;
			this.repairMen[key].rechargeText = this._scene.add.text(this._position[key].x, this._position[key].y - 80, "", {fontSize: 30, fontFamily: "sans"});
			this.repairMen[key].rechargeText.setOrigin(0.5, 0.5);
			this.repairMen[key].energyBar = new InfoBar(this._scene,this.repairMen[key].rechargeText,this.repairMen[key].totalTaps);
			this.repairMen[key].energyBar.start();
			this.repairMen[key].countText = this._scene.add.text(this._position[key].x, this._position[key].y - 80, "", {fontSize: 30, fontFamily: "sans"});
			this.repairMen[key].countText.setOrigin(0.5, 0.5);
            this._container.add(this.repairMen[key].energyBar.rectangle);
			this._container.add(this.repairMen[key].rechargeText);
			this._container.add(this.repairMen[key].countText);
		}

	}

	public getMoney(money: number) {
		this.money += (money || 0);
	}

	public buy(key) {
		if(priceList[key]) {
			if(priceList[key] <= this.money) {
				let length = this.repairMen[key].men.getTotalFree;
				if(length)
				{
					let repairMan = new RepairMan(this._scene, this._position[key].x, this._position[key].y, "player", key);
					repairMan.setProperties(this._container, this._pointerUpCallback, this.getTap.bind(this), this.getMoney.bind(this));
					this.repairMen[key].men.add(repairMan);
					this.repairMen[key].men.add(repairMan);
					this.repairMen[key].totalTaps += 10;
					this.repairMen[key].tapsRemaining = this.repairMen[key].totalTaps;
					this.repairMen[key].tapRechargeTime += 10; 
					this.repairMen[key].remainingRechargeTime = this.repairMen[key].tapRechargeTime;
					this.repairMen[key].recharging = false;
					this.repairMen[key].countText.setText(this.repairMen[key].tapsRemaining + "");
				}
			}
		}
	}

	public getTap(key)
	{
		if(!this.repairMen[key].recharging) {
			this.repairMen[key].tapsRemaining--;
			this.repairMen[key].energyBar.setValue(this.repairMen[key].tapsRemaining);
			if(!this.repairMen[key].tapsRemaining) {
				this.repairMen[key].recharging = true;
				return -1;
			}
			return 1;
		}
		 
	}

	update(time, dt) {
		for(let i=0, length = this._types.length; i < length; i++) {
			let repairMan = this.repairMen[this._types[i]];
			if(repairMan.recharging) {				
				repairMan.remainingRechargeTime -= (dt * 0.001);
				repairMan.energyBar.setValue(repairMan.tapRechargeTime -repairMan.remainingRechargeTime);	
				repairMan.rechargeText.setText("");
				repairMan.countText.setText("");
				if(repairMan.remainingRechargeTime <= 0) {
					repairMan.recharging = false;
					repairMan.remainingRechargeTime = repairMan.tapRechargeTime;
					repairMan.tapsRemaining = repairMan.totalTaps;
					repairMan.energyBar.setValue( repairMan.totalTaps);					
				}
			} else {
				repairMan.rechargeText.setText("");
				repairMan.countText.setText(repairMan.tapsRemaining+ "");
			}
		}
		this._moneyText.setText("Coins: "+ this.money.toFixed(2));
	}
}
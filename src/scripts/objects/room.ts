import {damageTime} from '../../assets/data/game_data';
import RepairMan from './repair_man';
export default class Room extends Phaser.GameObjects.Image {

    public timeTillDeath: number;

    private _timerText: Phaser.GameObjects.Text;
    private _damageText: Phaser.GameObjects.Text;

    private _repairMan: RepairMan;

    public _container: Phaser.GameObjects.Container;

    private _position: {
        x: number, 
        y: number
    };

    private _index: number;

    private _updateDamageStatus: Function;

    // private _damages = {
    //     "electrician" : {
    //         "time" : 10
    //     }, 
    //     "carpenter" : {
    //         "time": 10
    //     }, 
    //     "computer_repair" : {
    //         "time": 10
    //     } 

    // }

    public open: boolean = true;
    public activeDamage: string = null;
    private _timeToInactive: number;

    public fault: {
        name: string,
        time: number,
        toFix: number
        fixed: number
    }

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);
        
        this.setOrigin(0.5, 0.5);
        this._timerText = this.scene.add.text(this.x, this.y, "", {fontSize: 30, fontFamily: "sans"});
        this._damageText = this.scene.add.text(this.x, this.y, "", {fontSize: 30, fontFamily: "sans"});
        this._initPhysics();
        this._addInputEvents();
    }

    update(time, dt) {
      //  this.setPosition(this._position.x, this._position.y);
        if(this.open && this.activeDamage) {
            this._timeToInactive -= (dt * 0.001);
            this._timerText.setText(Math.floor(this._timeToInactive)+"");
            if(this._timeToInactive <= 0) {
                this._kill();
            }
        }
        this._timerText.setPosition(this._position.x, this._position.y);
        this._damageText.setPosition(this._position.x, this._position.y + 20);
    }
    
    private _initPhysics(): void {
        this.scene.physics.world.enable(this);
    }

    private _addInputEvents() {
        this.setInteractive().on('pointerup', this._onPointerUp.bind(this));
    }

    private _onPointerUp(pointer, localX, localY, event) {
        if(this._repairMan) {
            this._repairMan.tap();
        }
    }

    private _kill() {
        this.open = false;
        this.tint = 0x000000;
    }

    public startDamage(key: string) {
        if(this.open && !this.activeDamage) {
            if(damageTime[key]) {
                this.activeDamage = key;
                this._damageText.setText(key);
                this._timeToInactive = damageTime[key];
                this._updateDamageStatus(0, this._index);
            }
        }
    }

    public fix(repairman: RepairMan) {
        if(this.open) {
            if(repairman.type == this.activeDamage) {
                // do something
                this._updateDamageStatus(0.5, this._index);
                this._repairMan = repairman;
                this.activeDamage = null;
                this._timerText.setText("");
                this._damageText.setText("");
                return true;
            } 
        }
        return false;
    }

    public fixComplete() {
        this._repairMan = null;
        this._updateDamageStatus(1, this._index);
    }

    public setProperties(x, y, container, damageUpdateCallBack, index) {
        this._position = {
            x: x, y: y
        }

        // this.scene.tweens.add({
        //     targets: [this],
        //     x: x,
        //     y: y,
        //     ease: 'Linear',
        //     duration: 5000,
        //     yoyo: false,
        //     repeat: 0,
        //     callbackScope: this
        // });

      

        this._container = container;
        this._container.add(this);


            (function(self){
                setTimeout(() => { 
                     self.scene.tweens.add({
                        targets: [self],
                        x: x,
                        y: y,
                        ease: 'Linear',
                        duration: 750,
                        yoyo: false,
                        repeat: 0,
                        callbackScope: self
                    });
            
                }, 15)
            })(this)


        this._updateDamageStatus = damageUpdateCallBack;
        this._index = index;

    }
}
import {damageTime} from '../../assets/data/game_data';
import RepairMan from './repair_man';
export default class Room extends Phaser.GameObjects.Image {

    public timeTillDeath: number;

    private _timerText: Phaser.GameObjects.Text;
    // private _damageText: Phaser.GameObjects.Text;

    private _repairMan: RepairMan;
    
    private _repairIcon : Phaser.GameObjects.Image;

    public _container: Phaser.GameObjects.Container;

    private _position: {
        x: number, 
        y: number
    };

    private _index: number;

    private _updateDamageStatus: Function;
    private _payForJob: Function;

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
        this._timerText = this.scene.add.text(this.x, this.y - this.height /2, "", {fontSize: 50, fontFamily: "sans", color: "#ff0000", strokeThickness: 5, stroke: "#ff0000"});
        // this._damageText = this.scene.add.text(this.x, this.y, "", {fontSize: 30, fontFamily: "sans"});
        this._repairIcon = this.scene.add.image(this.x,this.y,null);
        this._repairIcon.setAlpha(0);
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
                this._timerText.setText("");
            }
        }
        this._timerText.setPosition(this._position.x + this.width * 0.2, this._position.y - this.height * 0.7);
        // this._damageText.setPosition(this._position.x, this._position.y + 20);
        this._repairIcon.setPosition(this._position.x, this._position.y);
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
        this._repairIcon.setTexture(null);
        this._repairIcon.setAlpha(0);
    }

    public startDamage(key: string) {
        let damageType = this.getDamageType();
        if(this.open && !damageType) {
            if(damageTime[key]) {
                this.activeDamage = key;
                // this._damageText.setText(key);
                this._timeToInactive = damageTime[key];
                this._updateDamageStatus(0, this._index);
                this.setTexture("room_" + key)
                this._repairIcon.setTexture("icon_" + key);
                this._repairIcon.setAlpha(1);
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
                // this._damageText.setText("");
             this.scene.tweens.add({
            targets: [this._repairIcon],
           alpha : 0.5,
            ease: 'Linear',
            duration: 1000,
            yoyo: true,
            repeat: 5,
            callbackScope: this
        });
                return true;
            } 
        }
        return false;
    }

    public fixComplete() {
        let money = this._payForJob(this._repairMan.type);
        this._repairMan.getMoney(money);
        this._repairMan = null;
        this._updateDamageStatus(1, this._index);
        this.setTexture("room");
        this._repairIcon.setTexture(null);
        this._repairIcon.setAlpha(0);

        this.scene.tweens.killTweensOf(this._repairIcon);
      
    }

    public setProperties(x, y, container, damageUpdateCallBack, index, payForJob) {
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
        this._container.add(this._timerText);



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
        this._payForJob = payForJob;
    }

    public getDamageType() {
        if(this.activeDamage) {
            return this.activeDamage;
        }
        else if(this._repairMan){
            return this._repairMan.type;
        }
        return null;
    }
}
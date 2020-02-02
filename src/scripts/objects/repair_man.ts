import { skillType, workTime } from '../../assets/data/game_data';
import Room from './room';
export default class RepairMan extends Phaser.GameObjects.Image {

    public skill: string;
    public time: number;
    private image: any;
    public type: string;
    private _totalTime: number;
    private _timeRemaining: number;
    public working: boolean = false;
    private _homePosition: {
        x: number, y: number
    }
    private _timerText: Phaser.GameObjects.Text;
    // private _typeText: Phaser.GameObjects.Text;
    // private _typeIcon : Phaser.GameObjects.Image;
    public onRoom: boolean = false;
    private _room: Room = null;
    private _pointerUpCallback: Function;
    private _getTap: Function;
    public getMoney: Function;
    private _container: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, type: string) {

        super(scene, x, y, key);
        this.texture.getSourceImage();
        this.setOrigin(0.5, 0.5);
        this.type = type;
        this._totalTime = workTime[type];
        this._homePosition = {
            x: x, y: y
        };
        this._timerText = this.scene.add.text(this.x, this.y + 200, "", { fontSize: 50, fontFamily: "sans", color: "#00ff00" });
        this._timerText.setOrigin(0.5, 0.5);
        // this._typeText = this.scene.add.text(this.x + 100, this.y + 100, type, { fontSize: 30, fontFamily: "sans" });
        // this._typeText.setOrigin(0.5, 0.5);
        // this._typeIcon = this.scene.add.image(this.x -(this.width * 0.5) , this.y - (this.height * 0.5),"icon_"+key);
        // this._typeIcon.setOrigin(0.5,0.5);
        // this._typeIcon.setScale(0.75, 0.75);
        this._initPhysics();
        this._addInputEvents();
        
    }
    
    private _addInputEvents() {
        this.setInteractive();
        this.scene.input.setDraggable(this);
        this.addListener("pointerup", this._onPointerUp.bind(this));
        this.addListener("pointerdown", this._onPointerDown.bind(this));
    }
    
    private _onPointerDown(pointer, currentlyOver) {


        this.scene.tweens.add({
            targets: [this],
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Linear',
            duration: 100,
            yoyo: false,
            repeat: 0,
            callbackScope: this
        });
    }
    
    private _onPointerUp(pointer, currentlyOver) {
        // this.onRoom will be set in the callback if there is a collision
        this._pointerUpCallback(this);
        if (!this.onRoom) {
            this._packUp();
        }
    }

    private _droppedOnRoom(self, room) {
        this.onRoom = true;
    }

    update(time, dt) {
        if (this.working) {
            this._timeRemaining -= (dt * 0.001);
            this._timerText.setText(Math.floor((this._totalTime - this._timeRemaining)) + "");
            if (this._timeRemaining <= 0) {
                this._timerText.setText("");
                this._packUp();
            }
        }
        this._timerText.setPosition(this.x + 100, this.y);
        // this._typeText.setPosition(this.x, this.y - (this.height * 0.7));
        // this._typeIcon.setPosition(this.x -(this.width * 0.7) , this.y - (this.height * 0.5) );
    }

    private _initPhysics(): void {
        this.scene.physics.world.enable(this);
    }

    private _packUp() {

        if(this._room) {
            // this._room.activeDamage = null;
            this._room.fixComplete();
            this._room._container.remove(this);
            // this._room._container.remove(this._typeText);
            this._room._container.remove(this._timerText);
            // this._room._container.remove(this._typeIcon);

            this._container.add(this);
            // this._container.add(this._typeText);
            this._container.add(this._timerText);
            // this._container.add(this._typeIcon);
        }
        this._room = null;
        this.working = false;
        this.onRoom = false;

        this.scene.tweens.add({
            targets: [this],
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 100,
            yoyo: false,
            repeat: 0,
            callbackScope: this
        });

        this.scene.tweens.add({
            targets: [this],
            x: this._homePosition.x,
            y: this._homePosition.y,
            ease: 'Linear',
            duration: 350,
            yoyo: false,
            repeat: 0,
            callbackScope: this
        });


        //  this.setPosition(this._homePosition.x, this._homePosition.y);
    }

    public repair(room) {
        if (!this.working) {
            let roomOpen = room.fix(this);
            if (roomOpen) {
                this._container.remove(this);
                // this._container.remove(this._typeText);
                this._container.remove(this._timerText);
                // this._container.remove(this._typeIcon);
                room._container.add(this);
                // room._container.add(this._typeText);
                room._container.add(this._timerText);
                // room._container.add(this._typeIcon);

                this.setPosition(room.x, room.y);
                this.working = true;
                this._timeRemaining = this._totalTime;
                this._room = room;
            }
            else {
                this._packUp();
            }
        }
    }

    public setProperties(container, callback, getTap, getMoney) {
        this._container = container;
        this._container.add(this);
        // this._container.add(this._typeText);
        this._container.add(this._timerText);
        // this._container.add(this._typeIcon);
        this._pointerUpCallback = callback;
        this._getTap = getTap;
        this.getMoney = getMoney;
    }

    public tap() {
        if(this._room) {
            let tap = this._getTap(this.type);
            if(tap) {
                this._timeRemaining -= tap;
            }
        }
    }

}
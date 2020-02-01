import { skillType, workTime } from '../../assets/data/game_data';
export default class RepairMan extends Phaser.GameObjects.Image {

    public skill: string;
    public time: number;
    private image : any;
    public type: string;
    private _totalTime: number;
    private _timeRemaining: number;
    public working: boolean = false;
    private _homePosition: {
        x: number, y: number
    }
    private _timerText: Phaser.GameObjects.Text;
    private _typeText: Phaser.GameObjects.Text;
    public checkOnRoom: boolean = false;
    public onRoom: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, type: string) {

        super(scene, x, y, key);
        this.texture.getSourceImage();
        this.setOrigin(0.5, 0.5);
        this.type = type;
        this.setInteractive();
        this.scene.input.setDraggable(this);
        this._totalTime = workTime[type];
        this._homePosition = {
            x: x, y: y
        };
        this._timerText = this.scene.add.text(this.x, this.y, "", {fontSize: 30, fontFamily: "sans"});
        this._timerText.setOrigin(0.5, 0.5);
        this._typeText = this.scene.add.text(this.x + 100, this.y + 100, type, {fontSize: 30, fontFamily: "sans"});
        this._typeText.setOrigin(0.5, 0.5);
        this._initPhysics();
        this._addInputEvents();
        
    }
    
    private _addInputEvents() {
        this.addListener("pointerup", this._onPointerUp.bind(this));
        this.addListener("pointerdown", this._onPointerDown.bind(this));
    }

    private _onPointerDown(pointer, currentlyOver) {

    }

    private _onPointerUp(pointer, currentlyOver){
        // this.checkcheckOnRoom = true;
        this.checkOnRoom = true;
        if(!this.onRoom) {
            this._packUp();
        }
    }

    update(time, dt) {
        if(this.working) {
            this._timeRemaining -= (dt * 0.001);
            this._timerText.setText(this._timeRemaining+"");
            if(this._timeRemaining <= 0) {
                this._timerText.setText("");
                this._packUp();
            }
        }
        this._timerText.setPosition(this.x, this.y);
        this._typeText.setPosition(this.x, this.y+50);
    }
    
    private _initPhysics(): void {
        this.scene.physics.world.enable(this);
    }

    private _packUp() {
        this.working = false;
        this.checkOnRoom = false;
        this.onRoom = false;
        this.setPosition(this._homePosition.x, this._homePosition.y);
    }

    public repair(room) {
        if(!this.working) {
            let roomOpen = room.fix(this.type);
            if(roomOpen) {
                this.setPosition(room.x, room.y);
                this.working = true;
                this._timeRemaining = this._totalTime;
            }
            else {
                this._packUp();
            }
        }
    }

    public addToContainer(container) {
        container.add(this);
        container.add(this._typeText);
        container.add(this._timerText);
    }
    
}
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
     
    }

    update(time, dt) {
        if(this.working) {
            this._timeRemaining -= (dt * 0.001);
            if(!this._timeRemaining) {
                this._packUp();
            }
        }
    }

    private _packUp()
    {
        this.working = false;
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
        }
    }
    
}
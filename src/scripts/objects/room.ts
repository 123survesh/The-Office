export default class Room extends Phaser.GameObjects.Image {

    public timeTillDeath: number;

    private _damages = {
        "electric" : {
            "time" : 10
        }, 
        "computer" : {
            "time": 10
        }, 
        "wood" : {
            "time": 10
        } 

    }

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
    }

    update(time, dt) {
        if(this.activeDamage) {
            this._timeToInactive -= (dt * 0.001);
            if(!this._timeToInactive) {
                this._kill();
            }
        }
    }

    private _kill() {
        this.open = false;
    }

    public startDamage(key: string) {
        if(this.open && !this.activeDamage) {
            if(this._damages[key]) {
                this.activeDamage = key;
                this._timeToInactive = this._damages[key].time;
            }
        }
    }

    public fix(key: string) {
        if(key == this.activeDamage) {
            // do something
            this.activeDamage = null;
            return true;
        } else {
            return false;
        }
    }
}
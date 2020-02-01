export default class Room extends Phaser.GameObjects.Image {

    public timeTillDeath: number;

    private _timerText: Phaser.GameObjects.Text;
    private _damageText: Phaser.GameObjects.Text;

    private _position: {
        x: number, 
        y: number
    };

    private _damages = {
        "electrician" : {
            "time" : 10
        }, 
        "carpenter" : {
            "time": 10
        }, 
        "computer_repair" : {
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
        this._timerText = this.scene.add.text(this.x, this.y, "", {fontSize: 30, fontFamily: "sans"});
        this._damageText = this.scene.add.text(this.x, this.y, "", {fontSize: 30, fontFamily: "sans"});
        this._initPhysics();
    }

    update(time, dt) {
        this.setPosition(this._position.x, this._position.y);
        if(this.activeDamage) {
            this._timeToInactive -= (dt * 0.001);
            this._timerText.setText(this._timeToInactive+"");
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


    private _kill() {
        this.open = false;
        this.tint = 0x000000;
    }

    public startDamage(key: string) {
        if(this.open && !this.activeDamage) {
            if(this._damages[key]) {
                this.activeDamage = key;
                this._damageText.setText(key);
                this._timeToInactive = this._damages[key].time;
            }
        }
    }

    public fix(key: string) {
        if(this.open) {
            if(key == this.activeDamage) {
                // do something
                this.activeDamage = null;
                this._timerText.setText("");
                this._damageText.setText("");
                return true;
            } 
        }
        return false;
    }

    public setProperties(x, y, container) {
        this._position = {
            x: x, y: y
        }
        this.setPosition(x, y);
        container.add(this);
    }
}
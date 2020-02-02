import RoomManager from "../managers/RoomManager";
import InfoBar from "./inforbar";
export default class Boss extends Phaser.GameObjects.Image {
    public mood: number = 100;
    private _roomManager: RoomManager;
    private _moodText: Phaser.GameObjects.Text;
    private _moodBar : InfoBar;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, container_boss, container_rooms) {
        super(scene, x, y, key);
        this.setScale(container_boss.height / this.height);
        this.setOrigin(0.5, 0.5);
        container_boss.add(this);
        let x_ = ((this.width * this.scaleX) / 2) + this.x, y_ =  ((this.height * this.scaleY) /2 )+ this.y;
        this.setPosition(x_, y_);
        this._roomManager = new RoomManager(scene, container_rooms);
        this.mood = 100;
        this._moodText = this.scene.add.text(2.5* x_, y_ + 25, "MOOD: "+this.mood, {fontSize: 30, fontFamily: "sans"} );
        this._moodBar = new InfoBar(this.scene,this,this._roomManager.damageState.length);
        container_boss.add( this._moodBar.rectangle);
        this._moodBar.start();
    }
    
    update(time, dt) {
        this._roomManager.update(time, dt);
        this._calculateMood();
        this._moodText.setText("MOOD: "+Math.floor(this.mood));
    }

    public getRooms() {
        return this._roomManager.rooms;
    }

    private _calculateMood() {
        let mood = 0, length = this._roomManager.damageState.length;
        for(let i=0;i<length;i++) {
            mood += this._roomManager.damageState[i];
        }
        this.mood = (100 / length) * mood;
        this._moodBar.setValue(mood);
    }
}
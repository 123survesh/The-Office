import RoomManager from "../managers/RoomManager";
import {priceList, wave, skillType} from "../../assets/data/game_data";
import InfoBar from "./inforbar";

export default class Boss extends Phaser.GameObjects.Image {
    public mood: number = 100;
    private _roomManager: RoomManager;
    private _moodText: Phaser.GameObjects.Text;
    private _moodBar: InfoBar;

    private _spawnTimeLapsed: number = 0;
    private _waveTimeLapsed: number = 0;
    private _currentWaveIndex: number = 0;
    private _skills: Array<string>;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, container_boss, container_rooms) {
        super(scene, x, y, key);
        this.setScale(container_boss.height / this.height);
        this.setOrigin(0.5, 0.5);
        container_boss.add(this);
        let x_ = ((this.width * this.scaleX) / 2) + this.x, y_ = ((this.height * this.scaleY) / 2) + this.y;
        this.setPosition(x_, y_);
        this._roomManager = new RoomManager(scene, container_rooms, this.pay.bind(this));
        this.mood = 100;

        this._moodText = this.scene.add.text(2.5 * x_, y_ + 25, "MOOD: " + this.mood, { fontSize: 30, fontFamily: "sans" });
        this._moodBar = new InfoBar(this.scene, this, this._roomManager.damageState.length);
        container_boss.add(this._moodBar.rectangle);
        this._moodBar.start();
        this._skills = Object.keys(skillType);
    }

    update(time, dt) {
        let dt_ = dt * 0.001;
        this._spawnTimeLapsed += dt_;
        this._waveTimeLapsed += dt_;

        if(this._waveTimeLapsed >= wave[this._currentWaveIndex].limit) {
            if(this._currentWaveIndex + 1 < wave.length){
                this._currentWaveIndex ++;
            }
            this._waveTimeLapsed = 0;
        }
        if(this._spawnTimeLapsed >= wave[this._currentWaveIndex].spawn) {
            this._spawnTimeLapsed = 0;
            // spawn
            this._spawn();
        }


        this._roomManager.update(time, dt);
        this._calculateMood();
        this._moodText.setText("MOOD: " + Math.floor(this.mood));
    }

    private _spawn() {
        let freeRooms = this._getFreeRooms();
        let damage = this._damages(this._getOccupiedRooms());
        let n = Math.floor(Math.random() * freeRooms.length);
        this._roomManager.spawn(n, damage);
    }

    private _getFreeRooms() {
        let rooms = [];
        for(let i=0, length = this._roomManager.damageState.length; i < length; i++)
        {
            if(this._roomManager.damageState[i] == 1) {
                rooms.push(i);
            }
        }
        return rooms;
    }

    private _getOccupiedRooms() {
        let rooms = [];
        for(let i=0, length = this._roomManager.damageState.length; i < length; i++)
        {
            if(this._roomManager.damageState[i] < 1) {
                rooms.push(i);
            }
        }
        return rooms;
    }

    private _damages(rooms){
        let damages = {};
        for(let i=0, length = rooms.length; i < length; i++)
        {
            let room = this._roomManager.getRoom(rooms[i]);
            let damage = room.getDamageType();
            if(!damages[damage]) {
                damages[damage] = 0;
            }
            damages[damage]++;
        }
        let count = {};
        let keys = Object.keys(damages);
        if(keys.length < this._skills.length){
            let freeKeys = [];
            for(let i=0, length = this._skills.length;i<length;i++) {
                if(keys.indexOf(this._skills[i]) < 0) {
                    freeKeys.push(this._skills[i]);
                }
            }
            if(freeKeys.length){
                return freeKeys[Math.floor(Math.random() * freeKeys.length)];
            } else {
                return this._skills[Math.floor(Math.random() * this._skills.length)]
            }
        }
        else {
            let minIndex = damages[keys[0]], minVal = damages[keys[0]];

            for(let i=0, length = keys.length;i < length;i++) {
                let key = keys [i];
                if(!count[damages[key]]) {
                    count[damages[key]] = [];
                }
                count[damages[key]].push(key);
                if(damages[key] < minVal) {
                    minVal = damages[key];
                    minIndex = i;
                }
            }
            if(count[minIndex].length){
                return count[minIndex][Math.floor(Math.random() * count[minIndex].length)];
            } else {
                return this._skills[Math.floor(Math.random() * this._skills.length)];
            }
        }
    }

    public getRooms() {
        return this._roomManager.rooms;
    }

    private _calculateMood() {
        let mood = 0, length = this._roomManager.damageState.length;
        for (let i = 0; i < length; i++) {
            mood += this._roomManager.damageState[i];
        }
        this.mood = (100 / length) * mood;
        this._moodBar.setValue(mood);
    }

    public pay(type: string) {
        return priceList[type] * (this.mood * .01);
    }
}
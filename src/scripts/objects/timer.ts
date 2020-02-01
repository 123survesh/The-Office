export default class Timer extends Phaser.GameObjects.Image {
    public MAX_LIMIT: number;
    private _currentTime: number;
    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);
        this.setOrigin(0.5, 0.5);
    }

    update(time, dt) {

    }
}
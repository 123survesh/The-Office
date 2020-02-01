export default class Room extends Phaser.GameObjects.Image {

    public timeTillDeath: number;
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

    }
}
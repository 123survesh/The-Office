import { skillType } from '../../assets/data/game_data';
export default class RepairMan extends Phaser.GameObjects.Image {

    public skill: string;
    public time: number;
    private image : any;


    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {

        super(scene, x, y, key);
        this.texture.getSourceImage();
        this.setOrigin(0.5, 0.5);
     
    }

    update(time, dt) {

    }

 

    
}
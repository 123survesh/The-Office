export default class InfoBar {
    private _parent: any;
    public rectangle: Phaser.GameObjects.Rectangle;
    public static MAX_WIDTH: number;
    private _maxValue: number;
    private _offsetX: number = 0;

    constructor(scene, parent, maxVal) {
        let width = 150, height = 20;
        this._parent = parent;
        this._maxValue = maxVal;
        InfoBar.MAX_WIDTH = width;
        this.rectangle = scene.add.rectangle(0, 0, width, height, 0x00ff00, 1.0);
        this._offsetX = parent.width * parent.scaleX * 1.15;
     
        this._setPosition(this._parent.x, this._parent.y);
    }

    update(time, dt) {
        this._setPosition(this._parent.x + this._offsetX, this._parent.y)
    }

    public setValue(value) {
        this.rectangle.width = Math.max(Math.min(Math.round((value / this._maxValue) * InfoBar.MAX_WIDTH), InfoBar.MAX_WIDTH), 0);
    }

    public start()
    {
        this._setPosition(this._parent.x, this._parent.y);
        this.rectangle.width = InfoBar.MAX_WIDTH;
        this.rectangle.setActive(true);
        this.rectangle.setVisible(true);
    }

    private _setPosition(x, y)
    {
        this.rectangle.x = x + this._offsetX;
        this.rectangle.y = y;
    }

}

export default class InfoBar {
    private _parent: any;
    private _rectangle: Phaser.GameObjects.Rectangle;
    public static MAX_WIDTH: number;
    private _maxValue: number;
    private _offsetY: number = 0;
    constructor(scene, parent, maxVal) {
        let width = Math.round(window.constants.BASE_WIDTH * 0.125), height = Math.round(window.constants.BASE_HEIGHT * 0.02);
        this._parent = parent;
        this._maxValue = maxVal;
        InfoBar.MAX_WIDTH = width;
        this._rectangle = scene.add.rectangle(0, 0, width, height, 0x00ff00, 1.0);
        this._offsetY = parent.height * 0.75;
        this._setPosition(this._parent.x, this._parent.y);
        this.stop();
    }

    update(time, dt) {
        this._setPosition(this._parent.x, this._parent.y)
    }

    public setValue(value) {
        this._rectangle.width = Math.max(Math.min(Math.round((value / this._maxValue) * InfoBar.MAX_WIDTH), InfoBar.MAX_WIDTH), 0);
        if(this._rectangle.width <= 0)
        {
            this.stop();
        }
    }

    public stop()
    {
        this._rectangle.setActive(false);
        this._rectangle.setVisible(false);
        this._setPosition(window.constants.DEAD_SPOT.x, window.constants.DEAD_SPOT.y);
    }

    public start()
    {
        this._setPosition(this._parent.x, this._parent.y);
        this._rectangle.width = InfoBar.MAX_WIDTH;
        this._rectangle.setActive(true);
        this._rectangle.setVisible(true);
    }

    private _setPosition(x, y)
    {
        this._rectangle.x = x
        this._rectangle.y = y + this._offsetY;
    }

}

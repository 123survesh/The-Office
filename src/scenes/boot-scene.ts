import * as urls from '../assets/loader';
export class BootScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    // set the background and create loading bar
    this.cameras.main.setBackgroundColor(0x98d687);
    this.createLoadingbar();

    // pass value to change the loading bar fill
    this.load.on(
      "progress",
      function (value) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xfff6d3, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    // delete bar graphics, when loading complete
    this.load.on(
      "complete",
      function () {
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    // load out package
    // this.load.pack(
    //   "preload",
    //   "data/pack.json", 
    //   "preload"
    // );
      let assets = [
        {
          type: "image", name: "room"
        },
        {
          type: "image", name: "player"
        },
        {
          type: "font", name: "font1"
        },
      ]

      this._loadAssets(assets, (window.innerWidth > 300));
  }

  update(): void {
    this.scene.start("MenuScene");
  }

  private _loadAssets(assets, isHd) {
    for (let i = 0, length = assets.length; i < length; i++) {
      switch (assets[i].type) {
        case 'image':
          {
            let url = (isHd) ? urls[assets[i].name] : urls["sd_" + assets[i].name];
            this.load.image(assets[i].name, url);
            break;
          }
        case 'font':
          {
            let texture_url = urls[assets[i].name + "_texture"];
            let data_url = urls[assets[i].name + "_data"];
            this.load.bitmapFont(assets[i].name, texture_url, data_url);
            break;
          }
      }
    }
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x5dae47, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}

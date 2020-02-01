import * as Phaser from "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { HUDScene } from "./scenes/hud-scene";
import { MenuScene } from "./scenes/menu-scene";
import * as GameData from "./assets/data/game_data";

let parent = document.getElementById("game");
// let hdFlag = (window.innerWidth > 300);

declare global {
  interface Window { constants: any; }
}
let ratio = window.innerHeight / window.innerWidth;

window.constants = {};
window.constants["HD_FLAG"] = (window.innerWidth > 300);
window.constants["DATA"] = GameData;
window.constants["HEIGHT"] = parent.offsetHeight;
window.constants["WIDTH"] = parent.offsetHeight;

const config: Phaser.Types.Core.GameConfig = {
  title: "The Office",
  version: "0.0.1",
  width: parent.offsetWidth,
  height: parent.offsetHeight,
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, MenuScene, GameScene, HUDScene],
  input: {
    keyboard: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  backgroundColor: "#f5cc69",
  render: { pixelArt: true, antialias: false }
};
let game;
export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  game = new Game(config);
});

window.addEventListener("keyup",function(e){
  if(e.which === 13)
  {
    window.location.reload();
  } 
})
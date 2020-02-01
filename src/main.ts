import * as Phaser from "phaser";
import { BootScene } from "./scripts/scenes/boot-scene";
import { GameScene } from "./scripts/scenes/game-scene";
import { HUDScene } from "./scripts/scenes/hud-scene";
import { MenuScene } from "./scripts/scenes/menu-scene";
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
// window.constants["RATIO"] = window.innerHeight / window.innerWidth;
// window.constants["SOURCE_WIDTH"] = 1080;
// window.constants["SOURCE_HEIGHT"] = 1920;
// window.constants["BASE_WIDTH"] = 1079;
// window.constants["BASE_HEIGHT"] = Math.floor(window.constants["SCREEN_WIDTH"] * window.constants["RATIO"]);
// window.constants["DEAD_SPOT"] = { 
//   x: Math.floor(window.constants["BASE_HEIGHT"] + Math.round(window.constants["BASE_HEIGHT"] * 0.5)), 
//   y: Math.floor(window.constants["BASE_WIDTH"] + Math.round(window.constants["BASE_WIDTH"] * 0.5))
// }

const config: Phaser.Types.Core.GameConfig = {
  title: "The Office",
  version: "0.0.1",
  width: 1080,
  height: 1920,
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
  scale: {
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    // height: window.constants.SCREEN_HEIGHT,
    // width: window.constants.BASE_WIDTH
    autoCenter: Phaser.Scale.CENTER_BOTH
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
import {
  defineSceneConfig,
  AssetType,
  defineScaleConfig,
  defineMapConfig,
  defineCameraConfig,
} from "@latticexyz/phaserx";
import worldTileset from "../../../public/assets/tilesets/world.png";
import forestTileset from "../../../public/assets/tilesets/forest.png";
import { TileAnimations, Tileset } from "../../artTypes/world";
import { Sprites, Assets, Maps, Scenes, TILE_HEIGHT, TILE_WIDTH, Animations } from "./constants";

const ANIMATION_INTERVAL = 200;

const mainMap = defineMapConfig({
  chunkSize: TILE_WIDTH * 64, // tile size * tile amount
  tileWidth: TILE_WIDTH,
  tileHeight: TILE_HEIGHT,
  backgroundTile: [255],
  animationInterval: ANIMATION_INTERVAL,
  tileAnimations: TileAnimations,
  layers: {
    layers: {
      Background: { tilesets: ["Default"] },
      Background1: { tilesets: ["Default"] },
      Foreground: { tilesets: ["Default"] },
    },
    defaultLayer: "Background",
  },
});

export const phaserConfig = {
  sceneConfig: {
    [Scenes.Main]: defineSceneConfig({
      assets: {
        [Assets.Tileset]: {
          type: AssetType.Image,
          key: Assets.Tileset,
          path: forestTileset,
        },
        [Assets.MainAtlas]: {
          type: AssetType.MultiAtlas,
          key: Assets.MainAtlas,
          // Add a timestamp to the end of the path to prevent caching
          path: `/assets/atlases/atlas.json?timestamp=${Date.now()}`,
          options: {
            imagePath: "/assets/atlases/",
          },
        },
      },
      maps: {
        [Maps.Main]: mainMap,
      },
      sprites: {
      },
      animations: [
        {
          key: Animations.GolemIdle,
          assetKey: Assets.MainAtlas,
          startFrame: 0,
          endFrame: 3,
          frameRate: 6,
          repeat: -1,
          prefix: "sprites/golem/idle/",
          suffix: ".png",
        },
        {
          key: Animations.HeroLeft,
          assetKey: Assets.MainAtlas,
          startFrame: 0,
          endFrame: 0,
          frameRate: 0,
          repeat: 0,
          prefix: "sprites/hero/left/",
          suffix: ".png",
        },
        {
          key: Animations.HeroRight,
          assetKey: Assets.MainAtlas,
          startFrame: 0,
          endFrame: 0,
          frameRate: 0,
          repeat: 0,
          prefix: "sprites/hero/right/",
          suffix: ".png",
        },
        {
          key: Animations.HeroUp,
          assetKey: Assets.MainAtlas,
          startFrame: 0,
          endFrame: 0,
          frameRate: 0,
          repeat: 0,
          prefix: "sprites/hero/up/",
          suffix: ".png",
        },
        {
          key: Animations.HeroDown,
          assetKey: Assets.MainAtlas,
          startFrame: 0,
          endFrame: 0,
          frameRate: 0,
          repeat: 0,
          prefix: "sprites/hero/down/",
          suffix: ".png",
        },
        
      ],
      tilesets: {
        Default: {
          assetKey: Assets.Tileset,
          tileWidth: TILE_WIDTH,
          tileHeight: TILE_HEIGHT,
        },
      },
    }),
  },
  scale: defineScaleConfig({
    parent: "phaser-game",
    zoom: 1,
    mode: Phaser.Scale.NONE,
  }),
  cameraConfig: defineCameraConfig({
    pinchSpeed: 1,
    wheelSpeed: 1,
    maxZoom: 3,
    minZoom: 1,
  }),
  cullingChunkSize: TILE_HEIGHT * 16,
};

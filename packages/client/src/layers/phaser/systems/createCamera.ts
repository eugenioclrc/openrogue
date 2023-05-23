import { PhaserLayer } from "../createPhaserLayer";

export const createCamera = (layer: PhaserLayer) => {
  const {
    scenes: {
      Main: {
        camera: { phaserCamera },
      },
    },
  } = layer;

  phaserCamera.centerOn(12, 12);
};

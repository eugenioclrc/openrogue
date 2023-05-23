import { Direction } from "../constants";
import { PhaserLayer } from "../createPhaserLayer";

let latestAction = false;

export function createControlsSystem(layer: PhaserLayer) {
  const {
    scenes: {
      Main: {
        input,
      },
    },
    networkLayer: {
      systemCalls: {
        move,
      },
    },
  } = layer;

  input.onKeyPress(
    keys => keys.has("W"),
    async () => {
      if(latestAction) return;
      try {
        latestAction = true;
        await move(Direction.Up);
      } catch(err) { /* empty */ }
      latestAction = false;
    });

  input.onKeyPress(
    keys => keys.has("A"),
    async () => {
      if(latestAction) return;
      try {
        latestAction = true;
        await move(Direction.Left);
      } catch(err) { /* empty */ }
      latestAction = false;
    }
  );

  input.onKeyPress(
    keys => keys.has("S"),
    async () => {
      if(latestAction) return;
      try {
        latestAction = true;
        await move(Direction.Down);
      } catch(err) { /* empty */ }
      latestAction = false;
    }
  );

  input.onKeyPress(
    keys => keys.has("D"),
    async () => {
      if(latestAction) return;
      try {
        latestAction = true;
        await move(Direction.Right);
      } catch(err) { /* empty */ }
      latestAction = false;
    }
  );
}
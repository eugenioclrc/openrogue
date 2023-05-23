import { Map, RNG } from "rot-js";

let seed = 1684711343;

RNG.setSeed(seed);
const _map = new Map.Rogue(50, 50, {});
_map.create()

const mapCopy = JSON.parse(JSON.stringify(_map.map));
for(let i = 0; i < 50; i++) {
  for(let j = 0; j < 50; j++) {
    // a map is full of 1s and 0s, where 1 is a wall and 0 is a floor
    // storing 0 s cheaper than 1 in solidity, thats why we flip the values
    mapCopy[i][j] = mapCopy[i][j] === 1 ? 0 : 1; 
  }
}

let tilesUintEncoded = [];
let buffer = "";
// we can affoard this loops, its cheap :D
for(let i = 0; i < 50; i++) {
  for(let j = 0; j < 50; j++) {
    buffer += String(mapCopy[i][j]);
    if(buffer.length === 256) {
      tilesUintEncoded.push(buffer);
      buffer = "";
    }
  }
}
if(buffer.length > 0) {
  while(buffer.length < 256){
    buffer += '0';
  }
  tilesUintEncoded.push(buffer);
}

tilesUintEncoded = tilesUintEncoded.map(e => BigInt(parseInt(e, 2)));
// console.log(r, {tilesUintEncoded})

export const room = {
  map: _map,
  tilesUintEncoded,
  seed
};

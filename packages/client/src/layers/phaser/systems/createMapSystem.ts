import { Tileset } from "../../../artTypes/world";
import { PhaserLayer } from "../createPhaserLayer";
import { createNoise2D } from "simplex-noise";

import { room } from "./mapHelper";


export function createMapSystem(layer: PhaserLayer) {
  const {
    scenes: {
      Main: {
        maps: {
          Main: { putTileAt },
        },
      },
    },
  } = layer;

  const map = room.map.map;

  
  for(let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if(map[y][x] == 1) {
        continue;
      }
      const coord = { x, y };
      putTileAt(coord, 34, "Background");
    }
  }

  const patternArray: { regex: RegExp; cb: (x: number, y: number) => void; }[] = [];

  function addPattern(pattern: string, cb: (x: number, y: number) => void) {
		patternArray.push({
			regex: new RegExp(pattern.replace(/\*/g, '[0-1]')),
			cb: cb
		});
	};

  function putTile(tile: number) {
    return (x, y) => putTileAt({x, y}, tile, "Background1");
  }


  addPattern(
	 	'*1*' +
	 	'0*0' +
	 	'000', function (x, y ) {
      putTileAt({x, y: y - 1}, 13, "Background1");
      putTileAt({x, y: y - 1}, 34, "Background");
      if (y > 1) {
	 			  putTileAt({x, y: y - 2}, 8, "Background1");
        }
	 	});

    addPattern(
		'11*' +
		'1*0' +
		'11*',
      function (x, y ) {
        putTileAt({x, y}, 34, "Background");
        putTileAt({x, y}, 9, "Background1");
      }
    )

    addPattern(
	 	'000' +
	 	'0*0' +
	 	'*1*', function (x, y ) {
      putTileAt({x, y: y + 1}, 3, "Background1");
      putTileAt({x, y: y + 1}, 34, "Background");
      /*
      if (y < 49) {
	 			  putTileAt({x, y: y + 2}, 8, "Background1");
      }
      */
        
	 	});

    addPattern(
	 	'000' +
	 	'0*0' +
	 	'001', putTile(1));

    

    /*
    addPattern(
	 	'011' +
	 	'0*1' +
	 	'011', function (x: number, y: number) {
      console.log(x, y);
       putTileAt({x, y}, 13, "Background1");
	 		  if (y > 0) {
	 			  putTileAt({x, y: y - 1}, 8, "Background1");
        }
      });

/*
  addPattern(
	 	'111' +
	 	'1*1' +
	 	'*0*', function (x: number, y: number) {
      putTileAt({x, y}, 14, "Background1");
	 		if (y > 0) {
	 		  putTileAt({x, y: y - 1}, 9, "Background1");
      }
    });


      

     addPattern(
	 	'110' +
	 	'1*0' +
	 	'110', function (x: number, y: number) {
       putTileAt({x, y}, 12, "Background");
	 		  if (y > 0) {
	 			  putTileAt({x, y: y - 1}, 22, "Background1");
        }
      });



 addPattern(
	 	'111' +
	 	'1*1' +
	 	'*0*', function (x, y) {
       putTileAt({x, y}, 14, "Background1");
	 		if (y > 0) {
	 			putTileAt({x, y:y - 1}, 9, "Background1");
       }
	 	});

    
	addPattern(
		'111' +
		'1*1' +
		'0*0', function (x, y) {
			putTileAt({x, y}, 14, "Background1");
			if (y > 0) {
        putTileAt({x, y:y - 1}, 9, "Background1");
			}
		});

	addPattern(
		'111' +
		'1*1' +
		'110', function (x, y) {
			putTileAt({x, y}, 6, "Background1");
			if (y > 0) {
        putTileAt({x, y:y - 1}, 1, "Background1");
			}
		});
*/
function getPosMap(x: number, y: number) {
  return String(map[y][x]);
}

  for (var y = 1; y < 49; y++) {
    for (var x = 1; x < 49; x++) {
			
			var direction =
				getPosMap(x - 1, y -1) + getPosMap(x, y - 1) + getPosMap(x + 1, y - 1) +
					// ml,*,mr  lepongo 0 por ponerle algo en realidad es siempre *
				  getPosMap(x - 1, y) + '1' + getPosMap(x + 1, y)+
				 getPosMap(x - 1, y + 1) + getPosMap(x, y + 1) +  getPosMap(x +1, y + 1);
        for (var i = 0, len = patternArray.length; i < len; i++) {
  				if (patternArray[i].regex.test(direction)) {
            console.log(direction);
	  				patternArray[i].cb(x, y);
		  	}
			}

		}
	}

  // log map to console
  // for(let i = 0; i < map.length; i++) {  

}


  // const patternArray: { regex: RegExp; cb: (tilepos: number, x: number, y: number) => void; }[] | { cb: (arg0: any, arg1: number, arg2: number) => void; }[] = [];
	
  // function addPattern(pattern: string, cb: (tilepos: number, x: number, y: number) => void) {
	// 	patternArray.push({
	// 		regex: new RegExp(pattern.replace(/\*/g, '[0-1]')),
	// 		cb: cb
	// 	});
	// };


	/*

	addPattern(
		'00*' +
		'0*1' +
		'*11', function (tilepos, x, y) {
			cbSetBackground(15)();
			if (y > 0) {
				jsonmap.layers[1].data[(y - 1) * width + x] = 10;
			}
		});

	addPattern(
		'00*' +
		'0*1' +
		'101', function (tilepos, x, y) {
			cbSetBackground(15)();
			if (y > 0) {
				jsonmap.layers[1].data[(y - 1) * width + x] = 10;
			}
		});

	addPattern(
		'000' +
		'0*0' +
		'100', function (tilepos, x, y) {
			cbSetBackground(7)();
			if (y > 0) {
				jsonmap.layers[1].data[(y - 1) * width + x] = 2;
			}
		});

	
	addPattern(
		'*1*' +
		'0*0' +
		'000', cbSetBackground(4));


	addPattern(
		'**1' +
		'0*0' +
		'000', cbSetBackground(11));

	addPattern(
		'111' +
		'0**' +
		'001', cbSetBackground(5));


	addPattern(
		'*00' +
		'1*0' +
		'*00', cbSetBackground(8));


	addPattern(
		'*00' +
		'**0' +
		'11*', cbSetBackground(13));

	addPattern(
		'*1*' +
		'1*0' +
		'*00', cbSetBackground(3));

	addPattern(
		'1**' +
		'**0' +
		'*00', cbSetBackground(12));

	addPattern(
		'**1' +
		'0**' +
		'00*', cbSetBackground(5));
	addPattern(
		'001' +
		'0*0' +
		'111', cbSetBackground(15));


	addPattern(
		'*00' +
		'1*0' +
		'1*1', cbSetBackground(13));




	addPattern(
		'*1*' +
		'***' +
		'*1*', function () {
			jsonmap.layers[0].data[tilepos] = ARENA;
			var f = [18, 23, 18];
			f = f[Math.floor((Math.random() * 3))];
			jsonmap.layers[1].data[tilepos] = f;
		});
	addPattern(
		'***' +
		'1*1' +
		'***', function () {
			jsonmap.layers[0].data[tilepos] = ARENA;
			var f = [18, 23, 18];
			f = f[Math.floor((Math.random() * 3))];
			jsonmap.layers[1].data[tilepos] = f;
		});


	for (var y = 0; y < _map._height; y++) {
		for (var x = 0; x < _map._width; x++) {
			jsonmap.layers[1].data.push(0);
			if (_map.map[x][y] === 0) {
				continue;
			}

			tilepos = y * width + x;

			var direction =
				_exist(x - 1, y - 1) + _exist(x, y - 1) + _exist(x + 1, y - 1) +
					// ml,*,mr  lepongo 0 por ponerle algo en realidad es siempre *
				_exist(x - 1, y) + '1' + _exist(x + 1, y) +
				_exist(x - 1, y + 1) + _exist(x, y + 1) + _exist(x + 1, y + 1);

			for (var i = 0, len = patternArray.length; i < len; i++) {
				if (patternArray[i].regex.test(direction)) {
					patternArray[i].cb(tilepos, x, y);
					break;
				}
			}

		}
	}






*/

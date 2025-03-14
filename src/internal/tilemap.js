( function( beep8 ) {

	/**
	 * A collection of functions for working with tilemaps.
	 * The tilemaps are created with the beep8 Tilemap Editor.
	 *
	 * The tilemap format is a multi-dimensional array of arrays.
	 * The tile array is in the format:
	 * [0] = tile character code.
	 * [1] = foreground color code.
	 * [2] = background color code.
	 * [3] = collision flag.
	 * [4] = additional data.
	 */
	beep8.Tilemap = {};

	beep8.Tilemap.MAP_CHAR = 0;
	beep8.Tilemap.MAP_FG = 1;
	beep8.Tilemap.MAP_BG = 2;
	beep8.Tilemap.MAP_COLLISION = 3;
	beep8.Tilemap.MAP_DATA = 4;


	// Define a mapping from bitmask value to your desired tile name or index.
	const wallTiles = {
		'solid': {
			0: 1,  // wall_isolated.
			1: 1,  // wall_end_bottom.
			2: 1,  // wall_end_left.
			3: 36,  // wall_corner_bottomLeft.
			4: 1,  // wall_end_top.
			5: 1,  // wall_vertical.
			6: 18,  // wall_corner_topLeft.
			7: 1,  // wall_t_right.
			8: 1,  // wall_end_right.
			9: 37,  // wall_corner_bottomRight.
			10: 1, // wall_horizontal.
			11: 1, // wall_t_bottom.
			12: 19, // wall_corner_topRight.
			13: 1, // wall_t_left.
			14: 1, // wall_t_top.
			15: 1  // wall_cross.
		},
		'rounded': {
			0: 1,  // wall_isolated.
			1: 42,  // wall_end_bottom.
			2: 23,  // wall_end_left.
			3: 36,  // wall_corner_bottomLeft.
			4: 41,  // wall_end_top.
			5: 1,  // wall_vertical.
			6: 18,  // wall_corner_topLeft.
			7: 1,  // wall_t_right.
			8: 24,  // wall_end_right.
			9: 37,  // wall_corner_bottomRight.
			10: 1, // wall_horizontal.
			11: 1, // wall_t_bottom.
			12: 19, // wall_corner_topRight.
			13: 1, // wall_t_left.
			14: 1, // wall_t_top.
			15: 1  // wall_cross.
		},
		'half': {
			0: 128,  // wall_isolated.
			1: 75,  // wall_end_bottom.
			2: 58,  // wall_end_left.
			3: 93,  // wall_corner_bottomLeft.
			4: 75,  // wall_end_top.
			5: 75,  // wall_vertical.
			6: 57,  // wall_corner_topLeft.
			7: 129,  // wall_t_right.
			8: 58,  // wall_end_right.
			9: 95,  // wall_corner_bottomRight.
			10: 58, // wall_horizontal.
			11: 111, // wall_t_bottom.
			12: 59, // wall_corner_topRight.
			13: 130, // wall_t_left.
			14: 112, // wall_t_top.
			15: 113  // wall_cross.
		},
		'half_rounded': {
			0: 128,  // wall_isolated.
			1: 148,  // wall_end_bottom.
			2: 166,  // wall_end_left.
			3: 93,  // wall_corner_bottomLeft.
			4: 149,  // wall_end_top.
			5: 75,  // wall_vertical.
			6: 57,  // wall_corner_topLeft.
			7: 129,  // wall_t_right.
			8: 167,  // wall_end_right.
			9: 95,  // wall_corner_bottomRight.
			10: 58, // wall_horizontal.
			11: 111, // wall_t_bottom.
			12: 59, // wall_corner_topRight.
			13: 130, // wall_t_left.
			14: 112, // wall_t_top.
			15: 113  // wall_cross.
		},
		'pipe': {
			0: 128,  // wall_isolated.
			1: 148,  // wall_end_bottom.
			2: 166,  // wall_end_left.
			3: 93,  // wall_corner_bottomLeft.
			4: 149,  // wall_end_top.
			5: [ 75, 77 ],  // wall_vertical.
			6: 57,  // wall_corner_topLeft.
			7: 129,  // wall_t_right.
			8: 167,  // wall_end_right.
			9: 95,  // wall_corner_bottomRight.
			10: [ 58, 94 ], // wall_horizontal.
			11: 111, // wall_t_bottom.
			12: 59, // wall_corner_topRight.
			13: 130, // wall_t_left.
			14: 112, // wall_t_top.
			15: [ 113, 131, 76 ]  // wall_cross.
		},
		'thin': {
			0: 110,  // wall_isolated.
			1: 173,  // wall_end_bottom.
			2: 172,  // wall_end_left.
			3: 164,  // wall_corner_bottomLeft.
			4: 154,  // wall_end_top.
			5: 72,  // wall_vertical.
			6: 146,  // wall_corner_topLeft.
			7: 126,  // wall_t_right.
			8: 155,  // wall_end_right.
			9: 165,  // wall_corner_bottomRight.
			10: 55, // wall_horizontal.
			11: 108, // wall_t_bottom.
			12: 147, // wall_corner_topRight.
			13: 127, // wall_t_left.
			14: 109, // wall_t_top.
			15: 73  // wall_cross.
		},
	};


	/**
	 * Convert a tilemap array to a string.
	 *
	 * This string can be loaded with beep8.Tilemap.load.
	 *
	 * @param {Array} tilemap - The tilemap array to save.
	 * @returns {string} The encoded string
	 */
	beep8.Tilemap.save = function( tilemap ) {

		beep8.Utilities.checkArray( "tilemap", tilemap );

		const cborString = CBOR.encode( tilemap );
		const encodedString = btoa( String.fromCharCode.apply( null, new Uint8Array( cborString ) ) );

		return encodedString;

	}


	/**
	 * Load a tilemap array from a string.
	 *
	 * @param {string} data The encoded string
	 * @returns {Array} The tilemap array
	 */
	beep8.Tilemap.load = function( data ) {

		beep8.Utilities.checkString( "data", data );

		// Step 1: Decode the Base64 string back to a binary string
		const binaryString = atob( data );

		// Step 2: Convert the binary string to a Uint8Array
		const byteArray = new Uint8Array( binaryString.length );
		for ( let i = 0; i < binaryString.length; i++ ) {
			byteArray[ i ] = binaryString.charCodeAt( i );
		}

		// Step 3: Convert the Uint8Array to an ArrayBuffer
		const arrayBuffer = byteArray.buffer;

		// Step 4: Use CBOR.decode to convert the byte array back to the original data structure
		const mapData = CBOR.decode( arrayBuffer );

		return mapData;

	}


	/**
	 * Draw a tilemap array to the screen.
	 *
	 * @param {Array} tilemap The tilemap array to draw.
	 * @param {number} [width=null] The width of the tilemap to draw.
	 * @param {number} [height=null] The height of the tilemap to draw.
	 * @returns {void}
	 */
	beep8.Tilemap.draw = function( tilemap, width = null, height = null ) {

		beep8.Utilities.checkArray( "tilemap", tilemap );

		if ( !width ) {
			width = tilemap[ 0 ].length;
		}

		if ( !height ) {
			height = tilemap.length;
		}

		beep8.Utilities.checkNumber( "width", width );
		beep8.Utilities.checkNumber( "height", height );

		const startRow = beep8.Core.drawState.cursorRow;
		const startCol = beep8.Core.drawState.cursorCol;

		for ( let y = 0; y < height; y++ ) {
			beep8.locate(
				0 + startCol,
				y + startRow
			);
			for ( let x = 0; x < width; x++ ) {
				const tile = tilemap[ y ][ x ];
				if ( tile && tile.length >= 3 ) {

					beep8.color(
						tile[ beep8.Tilemap.MAP_FG ],
						tile[ beep8.Tilemap.MAP_BG ]
					);
					beep8.printChar( tile[ beep8.Tilemap.MAP_CHAR ] );

				}
			}
		}

	};


	/**
	 * Create an empty tilemap array of the specified size.
	 *
	 * @param {number} width The width of the tilemap.
	 * @param {number} height The height of the tilemap.
	 * @returns {Array} The empty tilemap array.
	 */
	beep8.Tilemap.createEmptyTilemap = function( width, height ) {

		let layout = [];

		for ( let y = 0; y < height; y++ ) {
			layout[ y ] = [];
			for ( let x = 0; x < width; x++ ) {

				// char: 0,				// Default to space character
				// fg: data.colors.FG,		// Default foreground color (adjust as needed)
				// bg: data.colors.BG,		// Default background color (adjust as needed)
				// coll: 0,				// Default to no collision
				// data: {}				// Empty object for additional data

				layout[ y ][ x ] = beep8.Tilemap.getDefaultTile();

			}
		}

		return layout;

	};


	/**
	 * Shift and wrap a tilemap array by the specified amount.
	 *
	 * @param {Array} tilemap The tilemap array to shift.
	 * @param {number} dx The amount to shift the tilemap in the x direction.
	 * @param {number} dy The amount to shift the tilemap in the y direction.
	 * @returns {void}
	 */
	beep8.Tilemap.shift = function( tilemap, dx, dy ) {

		beep8.Utilities.checkArray( "tilemap", tilemap );
		beep8.Utilities.checkNumber( "dx", dx );
		beep8.Utilities.checkNumber( "dy", dy );

		const width = tilemap[ 0 ].length;
		const height = tilemap.length;

		const newTilemap = beep8.Tilemap.createEmptyTilemap( width, height );

		for ( let y = 0; y < height; y++ ) {
			for ( let x = 0; x < width; x++ ) {
				const newX = ( x + dx + width ) % width;
				const newY = ( y + dy + height ) % height;
				newTilemap[ newY ][ newX ] = [ ...tilemap[ y ][ x ] ];
			}
		}

		return newTilemap;

	};


	/**
	 * Resize a tilemap array to the specified width and height.
	 *
	 * @param {Array} tilemap The tilemap array to resize.
	 * @param {number} width The new width of the tilemap.
	 * @param {number} height The new height of the tilemap.
	 * @returns {Array} The resized tilemap array.
	 */
	beep8.Tilemap.resize = function( tilemap, width, height ) {

		beep8.Utilities.checkArray( "tilemap", tilemap );
		beep8.Utilities.checkNumber( "width", width );
		beep8.Utilities.checkNumber( "height", height );

		const newTilemap = beep8.Tilemap.createEmptyTilemap( width, height );

		for ( let y = 0; y < height; y++ ) {
			for ( let x = 0; x < width; x++ ) {
				if ( tilemap[ y ] && tilemap[ y ][ x ] ) {
					newTilemap[ y ][ x ] = [ ...tilemap[ y ][ x ] ];
				}
			}
		}

		return newTilemap;

	};


	/**
	 * Get the default tile for a tilemap.
	 *
	 * @returns {Array} The default tile.
	 */
	beep8.Tilemap.getDefaultTile = function() {

		return [
			0,
			15,
			0,
			0,
			{}
		]

	};


	/**
	 * Get a text map and convert it to an array of arrays.
	 *
	 * @param {string} mapText The text map to convert.
	 * @returns {Array} The converted tilemap array.
	 */
	beep8.Tilemap.convertFromText = function( mapText ) {

		beep8.Utilities.checkString( "text", mapText );

		const lines = mapText.trim().split( '\n' );
		const map = lines.map( row => row.trim().split( '' ) );

		return map;

	}


	/**
	 * Create a tilemap from an array of arrays.
	 * The tilePattern is an object that maps tile characters to tile properties.
	 *
	 * @param {Array} grid The grid array to create the tilemap from.
	 * @param {Object} tilePattern The tile pattern object.
	 * @returns {Array} The created tilemap array.
	 */
	beep8.Tilemap.createFromArray = function( grid, tilePattern ) {

		beep8.Utilities.checkArray( "grid", grid );
		beep8.Utilities.checkObject( "tilePattern", tilePattern );

		console.log( 'createFromArray', grid, tilePattern );

		const tilemap = [];

		for ( let y = 0; y < grid.length; y++ ) {
			tilemap[ y ] = [];
			for ( let x = 0; x < grid[ y ].length; x++ ) {

				// Set default properties.
				tilemap[ y ][ x ] = beep8.Tilemap.getDefaultTile();

				// If tile pattern not defined assume tile is empty and continue.
				if ( !tilePattern[ grid[ y ][ x ] ] ) {
					beep8.Utilities.log( "Tile pattern not found for: " + grid[ y ][ x ] );
					continue;
				}

				const tile = tilePattern[ grid[ y ][ x ] ];

				let tileId = tile.t;

				// If tileId is a string and begins with "wall_" then compute bitmask.
				if ( typeof tileId === "string" && tileId.startsWith( "wall_" ) ) {
					tileId = beep8.Tilemap.wallTile( x, y, grid, tileId );
				}

				// If is an array of ids then do a weighted pick from those.
				if ( Array.isArray( tileId ) ) {
					tileId = beep8.Random.pickWeighted( tileId );
				}

				tilemap[ y ][ x ] = [
					tileId,
					tile.fg || 15,
					tile.bg || 0,
					tile.coll || 0,
					tile.data || {},
				];

			}
		}

		return tilemap;

	};


	/**
	 * Select a wall tile from a predefined list based on the surrounding tiles.
	 * The grid is the 2D array of tile ids.
	 * The x and y are the coordinates of the tile to check.
	 *
	 * @param {number} x The x coordinate of the tile.
	 * @param {number} y The y coordinate of the tile.
	 * @param {Array} grid The 2D array of tile ids.
	 * @param {string} name The name of the wall tile to select. Picked from the default lists of wall patterns.
	 * @returns {number} The selected wall tile id.
	 */
	beep8.Tilemap.wallTile = function( x, y, grid, name = null ) {

		beep8.Utilities.checkNumber( "x", x );
		beep8.Utilities.checkNumber( "y", y );
		beep8.Utilities.checkArray( "grid", grid );
		beep8.Utilities.checkString( "name", name );

		if ( null === name ) {
			beep8.Utilities.fatal( "Wall tile name not given: " + name );
		}

		// Remove wall_ prefix from name.
		const tileType = name.substring( 5 );

		if ( !wallTiles[ tileType ] ) {
			beep8.Utilities.fatal( "Wall tile type not found: " + tileType );
		}

		const mask = computeBitmask( grid, x, y );
		return wallTiles[ tileType ][ mask ];

	};


	// A helper function to compute a 4-bit bitmask for a wall tile.
	// Bit values: 1 = North, 2 = East, 4 = South, 8 = West.
	function computeBitmask( grid, x, y ) {

		let bitmask = 0;
		const tileId = grid[ y ][ x ];

		// Check North
		if ( y > 0 && grid[ y - 1 ][ x ] === tileId ) bitmask += 1;
		// Check East
		if ( x < grid[ y ].length - 1 && grid[ y ][ x + 1 ] === tileId ) bitmask += 2;
		// Check South
		if ( y < grid.length - 1 && grid[ y + 1 ][ x ] === tileId ) bitmask += 4;
		// Check West
		if ( x > 0 && grid[ y ][ x - 1 ] === tileId ) bitmask += 8;

		return bitmask;

	}


} )( beep8 || ( beep8 = {} ) );

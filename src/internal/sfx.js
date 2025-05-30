( function( beep8 ) {

	beep8.Sfx = {};


	/**
	 * Sound effect library.
	 *
	 * @see https://killedbyapixel.github.io/ZzFX/
	 * @see https://codepen.io/KilledByAPixel/pen/BaowKzv?editors=1000
	 * @type {Object}
	 */
	beep8.Sfx.library = {
		coin: [ 1.2, 0, 1675, , .06, .24, 1, 1.82, , , 837, .06 ],
		coin2: [ 1.2, 0, 523.2511, .01, .06, .3, 1, 1.82, , , 837, .06 ],
		blip: [ 5, 0, 150, .02, .03, .02, , 2.8, , , , , , , , , , .7, .02 ],
		blip2: [ 3, 0, 200, .02, .03, .02, , 2.8, , , , , , , , , , .7, .02 ],
		blip3: [ 3, 0, 250, .02, .03, .02, , 2.8, , , , , , , , , , .7, .02 ],

		hit: [ , 0, 925, .04, .3, .6, 1, .3, , 6.27, -184, .09, .17 ],
		sparkle: [ 1.2, 0, 539, 0, .04, .29, 1, 1.92, , , 567, .02, .02, , , , .04 ],
		sparkle2: [ 1.2, 0, 80, .3, .4, .7, 2, .1, -0.73, 3.42, -430, .09, .17, , , , .19 ],
		life: [ 1.5, 0, 537, .02, .02, .22, 1, 1.59, -6.98, 4.97 ],
		life2: [ 1.4, 0, 20, .04, , .6, , 1.31, , , -990, .06, .17, , , .04, .07 ],
		break: [ 1.2, 0, 528, .01, , .48, , .6, -11.6, , , , .32, 4.2 ],
		lazer1: [ 1.5, 0, 515, .05, .07, .09, 1, 2.8, , , 302, .06, .1, , 3.5, .1, .08, .75, .04 ],
		alien: [ , 0, 662, .82, .11, .33, 1, 0, , -0.2, , , , 1.2, , .26, .01 ],
		beep: [ 2, 0, 270, , .1, , 1, 1.5, , , , , , , , .1, .01 ],
		beep2: [ 2, 0, 150, , .1, , 1, 1.5, , , , , , , , .1, .01 ],
		beep3: [ 2, 0, 200, , .1, , 1, 1.5, , , , , , , , .1, .01 ],
		ding: [ 1, 0, 685, .01, .03, .17, 1, 1.4, , , , , , , , , , .63, .01, , 420 ],
		drum: [ 1.5, 0, 129, .01, , .15, , , , , , , , 5 ],
		explode: [ 1.5, 0, 333, .01, 0, .9, 4, 1.9, , , , , , .5, , .6 ],
		explode2: [ 1.1, 0, 418, 0, .02, .2, 4, 1.15, -8.5, , , , , .7, , .1 ],
		explode3: [ 1.2, 0, 82, .02, , .2, 4, 4, , , , , , .8, , .2, , .8, .09 ],
		squeak1: [ 1.2, 0, 1975, .08, .56, .02, , , -0.4, , -322, .56, .41, , , , .25 ],
		squeak2: [ , 0, 75, .03, .08, .17, 1, 1.88, 7.83, , , , , .4 ],
		squeak3: [ 1.2, 0, 1306, .8, .08, .02, 1, , , , , , .48, , -0.1, .11, .25 ],
		squeak4: [ 1.2, 0, 1e3, .02, , .01, 2, , 18, , 475, .01, .01 ],
		bell: [ 2, 0, 999, , , , , 1.5, , .3, -99, .1, 1.63, , , .11, .22 ],
		satellite: [ , 0, 847, .02, .3, .9, 1, 1.67, , , -294, .04, .13, , , , .1 ],
		phone: [ , 0, 1600, .13, .52, .61, 1, 1.1, , , , , , .1, , .14 ],
		pop: [ 4, 0, 224, .02, .02, .08, 1, 1.7, -13.9, , , , , , 6.7 ],
		rocket: [ 1.5, 0, 941, .8, , .8, 4, .74, -222, , , , , .8, , 1 ],
		rocket2: [ 1.2, 0, 172, .8, , .8, 1, .76, 7.7, 3.73, -482, .08, .15, , .14 ],
		squirt: [ , 0, 448, .01, .1, .3, 3, .39, -0.5, , , , , , .2, .1, .08 ],
		swing: [ 1.5, 0, 150, .05, , .05, , 1.3, , , , , , 3 ],
		wave: [ , 0, 40, .5, , 1.5, , 11, , , , , , 199 ],
		warp: [ 3, 0, 713, .16, .09, .24, , .6, -29, -16, , , .09, .5, , , .23, .75, .15, .48 ],
		radioactive: [ , 0, 130, .02, .9, .39, 2, .8, , , , , .13, .2, , .1, , .93, .06, .28 ],
		siren: [ 1.3, 0, 960, , 1, .01, , .8, -0.01, , -190, .5, , .05, , , 1 ],
		car_horn: [ 1.8, 0, 250, .02, .02, .2, 2, 2, , , , , .02, , , .02, .01, , , .1 ],
		engine2: [ 1.2, 0, 25, .05, .3, .5, 3, 9, -0.01, , , , , , 13, .1, .2 ],
		thunder: [ 1.2, 0, 471, , .09, .47, 4, 1.06, -6.7, , , , , .9, 61, .1, , .82, .09, .13 ],
		sparkle3: [ , 0, 63, , 1, , 1, 1.5, , , , , , , , 3.69, .08 ],
		sweep: [ 1.2, 0, 9220, .01, , , , 5, , , , , , 9 ],
		click: [ 1.5, 0, 900, , .01, 0, 1, , -10, , -31, .02, , , , , , 1.2, , .16, -1448 ],
	};


	/**
	 * Play a named sound effect.
	 *
	 * @param {string} sfx - The name of the sound effect to play.
	 * @throws {Error} If the sfx is not found.
	 * @returns	{void}
	 */
	beep8.Sfx.play = function( sfx = '' ) {

		// Quit if no sound specified.
		if ( !sfx ) return;

		// Check the sfx is a string.
		beep8.Utilities.checkString( 'sfx', sfx );

		// SFX not found.
		if ( !beep8.Sfx.library[ sfx ] ) {
			beep8.Utilities.fatal( `SFX ${sfx} not found.` );
		}

		beep8.Sfx.playFromArray( beep8.Sfx.library[ sfx ] );

	}


	/**
	 * Play a sound effect from a ZzFX array.
	 *
	 * This array can be generated with ZzFX. It should be just the array beginning and ending with square brackets.
	 *
	 * @see https://killedbyapixel.github.io/ZzFX/
	 *
	 * @param {Array} sfxArray - The sound effect array to play.
	 * @returns {void}
	 */
	beep8.Sfx.playFromArray = function( sfxArray = [] ) {

		// Check the sfx is an array.
		beep8.Utilities.checkArray( 'sfxArray', sfxArray );

		// Play the raw sound effect.
		zzfx( ...sfxArray );

	}


	/**
	 * Add a sound effect to the library.
	 *
	 * @param {string} sfxName - The name of the sound effect.
	 * @param {Array} sfxArray The sound effect array.
	 * @throws {Error} If the sfxName is not a string.
	 * @throws {Error} If the sfxArray is not an array.
	 * @return {void}
	 */
	beep8.Sfx.add = function( sfxName, sfxArray ) {

		beep8.Utilities.checkString( 'sfxName', sfxName );
		beep8.Utilities.checkArray( 'sfxArray', sfxArray );

		beep8.Sfx.library[ sfxName ] = sfxArray;

	}


	/**
	 * Get the list of sfx from the library.
	 *
	 * @return {Array} The list of sfx.
	 */
	beep8.Sfx.get = function() {

		return Object.keys( beep8.Sfx.library );

	}

} )( beep8 || ( beep8 = {} ) );

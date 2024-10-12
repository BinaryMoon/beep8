( function( beep8 ) {

	beep8.Intro = {};

	/**
	 * Play a sound effect.
	 *
	 * @param {string} sfx The sound effect to play.
	 * @throws {Error} If the sfx is not found.
	 */
	beep8.Intro.loading = async function( sfx ) {

		// Colour count.
		const prefix = "8> ";

		// Loop through all colours.
		beep8.color( 0, 4 );
		beep8.cls();
		beep8.locate( 1, 1 );
		beep8.print( prefix + "beep8 Loading...\n" );

		await beep8.Async.wait( 0.4 );

	}


	/**
	 * Display a splash screen.
	 *
	 * @param {string} [name="beep8 Project"] The name of the project.
	 * @returns {Promise<void>} A promise that resolves when the splash screen is dismissed.
	 */
	beep8.Intro.splash = async function() {

		// Load title screen image.
		const titleScreen = beep8.Tilemap.load( `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BACDAQQAgxcDBIMBAwSDGBgDBIMAAwSDAQQAgxh0AwSDGIYDBIMABQSDAQQAAA8AAA8AmCCDAQQAgwEEAIMBBACDAQQAgwEEAIMADwSDAQQAgwEEAIMBBACDFwMEgwIDBIMBAwSDGBgDBIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMAAwSDAAMEgxh0AwSDGQFGBQSDAQQAgxkBRgUEgwEEAAAPAAAPAJgggxYFBIMQBQSDFgMEgxgoAwSDAQQAgwEEAIMYdAMEgxADBIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgxYDBIMYKAMEgxh0AwSDGIYDBIMYdAMEgxi0BQSDAAUFgwEFBIMBBQSDAQUEAA8AAA8AmCCDAQUEgwEFBIMYKAUDgwAFA4MYKAMEgxh0AwSDAQQAgwEEAIMZATMDBIMBBACDAQQAgxh0AwSDGIYDBIMWAwSDGCgDBIMWAwSDAQMEgwEDBIMQAwSDAAMEgwEEAIMBBQSDAAUFgwEFBIMBBQSDAQUEAA8AAA8AmCCDAQUEgwEFBIMBBQSDGCgFA4MABQODGCgDBIMYuAUEgwEEAIMBBACDGIYDBIMYdAMEgxi4BQSDDwMEgwsEA4MBAwSDAQMEgxkBSQUDgwEDBIMBAwSDGCgDBIMBBACDAQUEgwAFBYMBBQSDAQUEgwEFBAAPAAAPAJgggwkBBYMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDDwEFgwEFBIMBBQQADwAADwCYGIMADwGDCQEFgwAPBYMADwWDAA8FgwAPBYMADwWDAA8FgwAPBYMAAQWDAA8FgwAPBYMADwWDAA8FgwAPBYMADwWDAA8FgwAPBYMADwWDAA8FgwAPBYMJAQWDAA8FgwAPAZgYgwAPAYMADwGDAA8BgxABBYMADwWDAA8FgwAPBYMADwWDAA8FgwEBBYMQAQWDAA8FgwAPBYMADwWDAA8FgwAPBYMJAQWDAA8FgwAPBYMEAQWDAA8BgwAPAYMADwGDAA8B` );

		// Draw title screen.
		beep8.locate( 0, 0 );
		beep8.Tilemap.draw( titleScreen );

		// Click to start.
		let message = "Click to start";
		if ( beep8.Core.isTouchDevice() ) message = "Tap to start";

		beep8.color( 4, 5 );
		beep8.locate(
			Math.round( ( beep8.CONFIG.SCREEN_COLS - message.length ) / 2 ),
			beep8.CONFIG.SCREEN_ROWS - 2
		);
		beep8.print( message );

		// Wait for user input.
		await beep8.Input.readPointerAsync();

		beep8.color( 15, 0 );
		beep8.cls();

	}


} )( beep8 || ( beep8 = {} ) );

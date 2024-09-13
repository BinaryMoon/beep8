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
		const titleScreen = beep8.Tilemap.load( `mByYHIMBBACDAQQAgwEEAIMBBACDAwMEgwEEAIMBBACDGEgDBIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDDQUEmByDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgxhKAwSDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMAAwSDAQQAgwEEAIMBBACDAQQAgwEEAJgcgwEEAIMBBACDGDYDBIMYNwMEgxg3AwSDGFsDBIMYNwMEgxilAwSDAQQAgwMDBIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwADBIMYKQMEgxgpAwSDAQQAgwEEAIMBBACDAQQAmByDAQQAgwEEAIMYrQMEgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAAMEgxcDBIMBAwSDAgMEgxgYAwSDAQQAgwEEAIMBBACYHIMQBQSDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwMDBIMDAwSDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACYHIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwMDBIMDAwSDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAAQEgwAEBIMABASYHIMBBACDAQQAgwEEAIMBBACDAQQAgxiSAwSDGDcDBIMYWwMEgxg3AwSDGDcDBIMYbgMEgxkBBgMEgxhuAwSDGDcDBIMYNwMEgxg3AwSDGDcDBIMYNwMEgxhuAwSDGQEFAwSDGG4DBIMYOAMEgwEEAIMBBACDAQQAgwAEBIMDAwSDAQQAmByDAQQAgwEEAIMBBACDAQQAgw8FBIMYSAMEgwIPBIMBDwCDGCgPBIMBBACDGOYPBIMY3A8EgxjmDwSDAQQAgxkBLw8EgxkBLw8EgxkBMQ8EgwEEAIMBDwSDAQ8AgxMPBIMYSgMEgwEEAIMBBACDAQQAgwAEBIMBBACDAQQAmByDAQQAgxhYAwSDAQQAgwEEAIMBBACDGEgDBIMBDwCDAQQAgwEPAIMBBACDAQ8EgwEEAIMBBACDAQQAgxkBMA8EgwEEAIMBBACDAQQAgwwPBIMZAQkEBIMMDwSDGEgDBIMBBACDAQQAgwEEAIMABASDAQQAgw8FBJgcgwEEAIMBBACDAQQAgwEEAIMBBACDGEgDBIMBDwCDAQ8AgxgtBA+DAQQAgxkBLA8EgwEPBIMADwSDAQQAgxkBLw8EgxkBLw8EgwAPBIMBBACDAQ8EgwEPAIMYJQ8EgxhuDwSDGJcPBIMBBACDAQQAgwAEBIMBBACDAQQAmByDAQQAgwEEAIMBBACDAQQAgwEEAIMYSAMEgwkPBIMBBACDAQ8AgwEEAIMBDwCDAA8EgwAPBIMBBACDGQEvDwSDAQQAgwEEAIMBBACDAQ8EgwADBIMAAwSDGEgDBIMBBACDAQQAgwEEAIMABASDAAQEgwAEBJgcgwEEAIMBBACDGCkDBIMAAwSDAQQAgxhIAwSDGE8PBIMBDwCDDg8EgwEEAIMY2w8EgxIKD4MYHAUKgxgZBQqDGB0FCoMTCg+DGB0FD4MBBACDBg8EgwADBIMPAwSDGEgDBIMOBQSDAQQAgwEEAIMBBACDAQQAgwEEAJgcgxcDBIMBAwSDAQMEgxgYAwSDAQQAgxhaAwSDGDcDBIMYNwMEgxg3AwSDGDcDBIMYNwMEgwEKBIMYKwoFgxg3AwSDGCsECoMBCgSDGCsFBIMYNwMEgxhbAwSDGDcDBIMYNwMEgxilAwSDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACYHIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgxgkCgSDGC4FCoMYGQoEgxgvBAqDGCUKBYMYKwUEgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACYHIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgxIKBIMYHAUKgxgZBQqDGB0FCoMTCgWDGCAFBIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAmByDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgw0FBIMLBAqDGCsKBYMACgSDGCsECoMBCgSDGDAFBIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMDAwSDAwMEgwEEAIMBBACDAQQAmByDGDcDBIMYNwMEgxg3AwSDGDgDBIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDGCQKBIMYLgUKgxgZCgSDGC8ECoMYJQoFgxgrBQSDAAUKgxgwBQSDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACYHIMBBACDAQQAgwEEAIMYSgMEgwEEAIMBBACDAQQAgwEEAIMBBACDAAoEgwAKBIMACgSDGC4FBIMYGQQFgxgZBAWDGBkEBYMYLwUEgxghBQSDGC8FBIMBBACDAQQAgwEEAIMBBACDGKwDBIMYNwMEgxg3AwSDGFsDBIMYNwMEmByDEAUEgwEEAIMBBACDGFoDBIMYNwMEgxg3AwSDGJsDBIMBBACDAQQAgwEEAIMBBACDAQQEgwEEBIMBBASDAQQEgwEEBIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAJgcgwEEAIMBBACDAQQAgwMDBIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAJgcgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMAAwSDAAMEgwADBJgcgwEEAIMBBACDAQQAgwEEAIMYHAoEgxgdCgSDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMYKQMEgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAJgcgwEEAIMBBACDAQQAgwEEAIMYLgoEgxgvCgSDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDGCkDBIMYKQMEgwEEAIMBBACDAQQAgwEEAIMBBACDFwMEgwEDBIMYGAMEgwEEAIMBBACDAQQAgwEEAIMABQSDAQQAmByDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMXAwSDAgMEgwEDBIMYGAMEgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDGHQDBIMYhgMEgwEEAIMZAUYFBIMBBACYHIMWBQSDGCgFBIMAAwSDAAMEgxYDBIMYKAMEgwEEAIMBBACDGHQDBIMYhgMEgwEEAIMBBACDAQQAgwEEAIMBBACDAQQAgwEEAIMBBACDFgMEgxgoAwSDAQQAgwEEAIMYdAMEgwEEAIMYtAUEgwEFBIMBBQSDAQUEmByDAQUEgwEFBIMQBQSDFgMEgwAFA4MABQODGCgDBIMYdAMEgwEEAIMBBACDGQEzAwSDAQQAgwEEAIMYdAMEgxiGAwSDFgMEgxgoAwSDFgMEgwEDBIMBAwSDEAMEgxh0AwSDAQQAgwEEAIMBBQSDAQUEgwEFBIMBBQSYHIMBBQSDAQUEgwEFBIMYKAUDgwAFA4MYuAUDgwAFA4MYKAMEgxi4BQSDAQQAgwEEAIMYhgMEgxh0AwSDGLgFBIMPAwSDCwMEgwEDBIMBAwSDGQFJBQODAQMEgwEDBIMYKAMEgwEEAIMBBACDCwUEgwEFBIMBBQSDAQUEmByDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUEgwEFBIMBBQSDAQUE` );

		// Draw title screen.
		beep8.locate( 0, 0 );
		beep8.Tilemap.draw( titleScreen );

		// Click to start.
		let message = "Click to start";
		if ( beep8.Core.isTouchDevice() ) message = "Tap to start";

		beep8.locate(
			Math.round( ( beep8.CONFIG.SCREEN_COLS - message.length ) / 2 ),
			beep8.CONFIG.SCREEN_ROWS - 4
		);
		beep8.print( message );

		// Wait for user input.
		await beep8.Core.inputSys.readPointerAsync();

	}


} )( beep8 || ( beep8 = {} ) );

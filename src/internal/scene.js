( function( beep8 ) {

	/**
	 * Stores all scenes by name.
	 *
	 * @type {Object}
	 */
	beep8.Scene = {};


	/**
	 * Holds the current active scene object.
	 *
	 * @type {Object|null}
	 */
	let activeScene = null;

	const sceneList = {};


	/**
	 * Adds a new scene to the scene manager.
	 *
	 * A scene should be a javascript object with at least one of the following functions:
	 *
	 * - init (optional): A function that will be called when the scene is set.
	 * - update (optional): A function that will be called multiple times a frame and passed a deltatime value as a parameter.
	 * - render (optional): A function that will be called every frame.
	 *
	 * Init can be used to set up the scene. For asynchronous games you can add a while loop here and use await functions (eg for keypresses) and then render yourself.
	 * For synchronous games you can use the update and render functions to manage game logic and rendering efficiently.
	 *
	 * eg:
	 * const game = {
	 *  init: () => { }
	 *  update: ( dt ) => { }
	 *  render: () => { }
	 * }
	 *
	 * @param {string} name - The name of the scene.
	 * @param {object} gameObject - An object that includes init, update, and
	 * render methods as well as other properties for the scene. If update and
	 * render are set then these will be passed to `beep8.frame`.
	 * @param {number} frameRate - The frame rate at which to update and render
	 */
	beep8.Scene.add = function( name, gameObject = null, frameRate = 30 ) {

		beep8.Utilities.checkString( 'name', name );

		if ( gameObject !== null ) {
			beep8.Utilities.checkObject( 'gameObject', gameObject );
		}

		beep8.Utilities.checkInt( 'frameRate', frameRate );

		const init = gameObject.init || null;
		const update = gameObject.update || null;
		const render = gameObject.render || null;

		sceneList[ name ] = { init, update, render, frameRate };

	};


	/**
	 * Switches to a specified scene by name.
	 *
	 * @param {string} name - The name of the scene to switch to.
	 */
	beep8.Scene.set = function( name ) {

		beep8.Utilities.checkString( 'name', name );

		if ( !sceneList[ name ] ) {
			beep8.Utilities.fatal( `Scene "${name}" does not exist.` );
		}

		// Stop the current game loop.
		beep8.Core.stopFrame();

		// Store the active scene.
		activeScene = name;

		// Clear any inputs.
		if ( beep8.Input && typeof beep8.Input.onEndFrame === 'function' ) {
			beep8.Input.onEndFrame();
		}

		// Get the scene object.
		const currentScene = sceneList[ name ];

		// If there's an init method, call it.
		if ( currentScene.init ) {
			currentScene.init();
		}

		// If there's an update or render method, call frame to create a synchronous game.
		if ( currentScene.update || currentScene.render ) {
			beep8.frame( currentScene.render, currentScene.update, currentScene.frameRate );
		}

	};


	/**
	 * Pauses the current scene.
	 *
	 * @param {string} name - The name of the scene to pause.
	 * @returns {void}
	 */
	beep8.Scene.pause = function() {

		beep8.frame( null );

	};


	/**
	 * Resumes the current scene.
	 *
	 * @returns {void}
	 */
	beep8.Scene.resume = function() {

		// If there's no active scene, do nothing.
		if ( !activeScene ) {
			return;
		}

		// Get the currentScene.
		const currentScene = sceneList[ activeScene ];

		// If there's an update or render method, call frame to create a synchronous game.
		if ( currentScene.update || currentScene.render ) {
			beep8.frame(
				currentScene.render || ( () => { } ),
				currentScene.update || ( () => { } ),
				currentScene.frameRate || 30
			);
		}

	};


	/**
	 * Gets the current active scene.
	 *
	 * @returns {Object|null} The active scene object, or null if no scene is active.
	 */
	beep8.Scene.get = function() {

		return activeScene;

	};


	/**
	 * Gets all scenes.
	 *
	 * @returns {Object} All scenes.
	 */
	beep8.Scene.getAll = function() {

		return sceneList;

	};

} )( beep8 || ( beep8 = {} ) );

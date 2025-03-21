( function( beep8 ) {

	/**
	 * beep8.Particles handles particles.
	 */
	beep8.Particles = {};

	// Private particle array.
	let particles_ = [];


	/**
	 * Adds a new particle to the system.
	 *
	 * Each particle is an object with properties:
	 * - x, y: position,
	 * - vx, vy: velocity (pixels per second, default=0),
	 * - life: remaining life time (seconds, default=1),
	 * - size: square size (pixels, default=1),
	 * - color: fill color (a beep8 palette id, default=15).
	 * - gravity: gravity (pixels per second, default=0).
	 *
	 * @param {object} particle - The particle object to add.
	 * @returns {void}
	 */
	beep8.Particles.add = function( x, y, props ) {

		beep8.Utilities.checkNumber( 'x', x );
		beep8.Utilities.checkNumber( 'y', y );
		beep8.Utilities.checkObject( 'props', props );

		const defaults = {
			x: x,
			y: y,
			vx: 0,
			vy: 0,
			life: 1,
			size: 1,
			color: 15,
			gravity: 0,
		}

		const newParticle = Object.assign( {}, defaults, props );

		// Particle Color.
		if ( Array.isArray( newParticle.color ) ) {
			newParticle.color = beep8.Random.pick( newParticle.color );
		}

		// Particle Size.
		if ( Array.isArray( newParticle.size ) ) {
			newParticle.size = beep8.Random.pick( newParticle.size );
		}

		particles_.push( newParticle );

	};


	/**
	 * Adds an explosion of particles to the system.
	 *
	 * The explosion is created at the x, y position with a number of particles.
	 *
	 * The optional properties include:
	 * - size: The size of the particles (in pixels, default=1).
	 * - color: The color of the particles (a beep8 palette id, default=fgColor).
	 * - life: The life of the particles (in seconds, default=2).
	 * - speed: The speed of the particles (in pixels per second, default=25).
	 * - gravity: The gravity of the particles (in pixels per second, default=0).
	 *
	 * @param {number} x - The x position of the explosion.
	 * @param {number} y - The y position of the explosion.
	 * @param {number} count - The number of particles to add.
	 * @param {object} props - The properties of the explosion.
	 * @returns {void}
	 */
	beep8.Particles.createExplosion = function( x, y, count = 10, props = {} ) {

		beep8.Utilities.checkNumber( 'x', x );
		beep8.Utilities.checkNumber( 'y', y );
		beep8.Utilities.checkNumber( 'count', count );
		beep8.Utilities.checkObject( 'props', props );

		const defaults = {
			size: 1,
			color: beep8.Core.drawState.fgColor,
			life: 2,
			speed: 25,
			gravity: 0,
		};

		const newExplosion = Object.assign( {}, defaults, props );

		for ( let i = 0; i < count; i++ ) {

			const angle = beep8.Random.range( 0, Math.PI * 2 );
			const speed = beep8.Random.range( newExplosion.speed / 2, newExplosion.speed );

			beep8.Particles.add(
				x,
				y,
				{
					size: newExplosion.size,
					color: newExplosion.color,
					life: newExplosion.life,
					vx: Math.cos( angle ) * speed,
					vy: Math.sin( angle ) * speed,
					g: newExplosion.gravity,
				}
			);

		}

	};


	/**
	 * Updates all particles.
	 *
	 * If you are using Beep8 scenes or the Beep8 game loop (doframe) then this
	 * is called automatically and you don't need to call it manually.
	 *
	 * @param {number} dt - Delta time to update particle movement.
	 * @returns {void}
	 */
	beep8.Particles.update = function( dt ) {

		// Loop backwards to allow for removal.
		for ( let i = particles_.length - 1; i >= 0; i-- ) {

			const p = particles_[ i ];
			// Apply gravity.
			p.vy += ( p.g * dt );
			// Update position based on velocity.
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			// Decrease life.
			p.life -= dt;

			// Remove particle if life expired.
			if ( p.life <= 0 ) {
				particles_.splice( i, 1 );
			}

		}

	};


	/**
	 * Renders all particles as squares.
	 *
	 * This should be called in your render method. This is not called
	 * automatically which allows you to control the draw order.
	 *
	 * @returns {void}
	 */
	beep8.Particles.render = function() {

		for ( let i = 0; i < particles_.length; i++ ) {

			const p = particles_[ i ];
			const center = p.size / 2;

			// Draw the square particle with p.x, p.y at the center.
			beep8.Core.ctx.fillStyle = beep8.Core.getColorHex( p.color );
			beep8.Core.ctx.fillRect( Math.round( p.x - center ), Math.round( p.y - center ), Math.round( p.size ), Math.round( p.size ) );

		}

	};


	/**
	 * Clears all particles from the system.
	 *
	 * @returns {void}
	 */
	beep8.Particles.clearAll = function() {

		particles_ = [];

	};


	/**
	 * Returns the particles array.
	 *
	 * This is useful for debugging or if you want to manipulate the particles
	 * directly.
	 *
	 * @returns {array} The particles array.
	 */
	beep8.Particles.getParticles = function() {

		return [ ...particles_ ];

	};


	/**
	 * Sets the particles array.
	 *
	 * Can be used with Particles.getParticles to manipulate the particles directly.
	 *
	 * @param {array} particles - The particles array.
	 * @returns {void}
	 */
	beep8.Particles.setParticles = function( particles ) {

		beep8.Utilities.checkArray( 'particles', particles );

		particles_ = particles;

	};

} )( beep8 || ( beep8 = {} ) );

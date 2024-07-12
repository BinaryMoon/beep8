/// MODULE: nano

import * as main from "./internal/main.js";
import * as qut from "./qut.js";

/// Initializes the API. This must be called before other functions
/// and it must finish executing before other API functions are called.
/// Once the supplied callback is called, you can start using
/// beep8 functions.
/// callback: function
///   The callback to call when initialization is done.
export function init( callback ) { return main.init( callback ); }

// Sets the frame handler, that is, the function that will be called
// on every frame to render the screen.
// fps: the target frames per second. Recommended: 30.
export function frame( handler, fps = 30 ) {

	main.preflight( "beep8.frame" );

	if ( handler !== null ) qut.checkFunction( "handler", handler );

	qut.checkNumber( "fps", fps );

	return main.setFrameHandler( handler, fps );

}

/// Forces the screen to render right now. You only need this if you
/// are doing some kind of animation on your own and you want to
/// redraw the screen immediately to show the current state.
/// Otherwise the screen repaints automatically when waiting for
/// user input.
export function render() {

	main.preflight( "beep8.render" );
	return main.render();

}

/// Sets the foreground and/or the background color.
/// fg: integer
///   The foreground color.
/// bg: integer (optional)
///   (optional) The foreground color (a number). If omitted, the current
///   background color will be kept.
export function color( fg, bg ) {

	main.preflight( "beep8.color" );
	qut.checkNumber( "fg", fg );
	if ( bg !== undefined ) qut.checkNumber( "bg", bg );
	main.setColor( fg, bg );

}

/// Returns the current foreground color.
export function getFgColor() {

	main.preflight( "getFgColor" );
	return main.drawState.fgColor;

}

/// Returns the current background color.
/// Note that -1 means transparent.
export function getBgColor() {

	main.preflight( "getBgColor" );
	return main.drawState.bgColor;

}

/// Clears the screen using the current background color.
export function cls() {

	main.preflight( "beep8.cls" );
	main.cls();

}

/// Places the cursor at the given screen column and row.
/// col:
///   The column where the cursor is to be placed.
/// row:
///   (optional) The row where the cursor is to be placed. If omitted, remains
///   on the current row.
export function locate( col, row ) {

	main.preflight( "beep8.locate" );
	qut.checkNumber( "col", col );
	if ( row !== undefined ) qut.checkNumber( "row", row );
	main.setCursorLocation( col, row );

}

/// Returns the cursor's current column.
export function col() { main.preflight( "col" ); return main.drawState.cursorCol; }

/// Returns the cursor's current row.
export function row() { main.preflight( "row" ); return main.drawState.cursorRow; }

/// Shows or hides the cursor.
/// visible: boolean
///   If true, show the cursor. If false, hide the cursor.
export function cursor( visible ) {
	main.preflight( "cursor" );
	qut.checkBoolean( "visible", visible );
	main.cursorRenderer.setCursorVisible( visible );
}

/// Prints text at the cursor position, using the current foreground and
/// background colors. This will advance the cursor position.
/// text: string
///   The text to print. This can contain embedded newlines and they will
///   behave as you expect: printing will continue at the next line.
///   If PRINT_ESCAPE_START and PRINT_ESCAPE_END are defined in CONFIG, then
///   you can also use escape sequences. For example {{c1}} sets the color to 1,
///   so your string can be "I like the color {{c1}}blue" and the word 'blue' would
///   be in blue. The sequence {{b2}} sets the background to 2 (red). The sequence
///   {{z}} resets the color to the default. See example-printing.html for an example.
export function print( text ) {
	main.preflight( "beep8.text" );
	qut.checkString( "text", text );
	main.textRenderer.print( text );
}

/// Prints text centered horizontally in a field of the given width. If the text is
/// bigger than the width, it will overflow it.
/// text: string
///   The text to print.
/// width: number
///   The width of the field, in characters.
export function printCentered( text, width ) {
	main.preflight( "beep8.printCentered" );
	qut.checkString( "text", text );
	qut.checkNumber( "width", width );
	main.textRenderer.printCentered( text, width );
}

/// Draws text at an arbitrary pixel position on the screen, not following
/// the "row and column" system. This won't affect cursor position.
/// x: integer
///   The X coordinate of the top-left of the text.
/// y: integer
///   The Y coordinate of the top-left of the text.
/// text: string
///   The text to print. This can contain embedded newlines and they will
///   behave as you expect: printing will continue at the next line.
/// fontId: string
///   (optional) If specified, this is a font ID previously obtained with
///   beep8a.loadFont(), indicating the custom font to use to print the text.
///   If not specified, then we will use the current font as set with
///   beep8.setFont(), or the default font if that was never set.
export function drawText( x, y, text, fontId = null ) {
	main.preflight( "beep8.drawText" );
	qut.checkNumber( "x", x );
	qut.checkNumber( "y", y );
	qut.checkString( "text", text );
	if ( fontId ) qut.checkString( "fontId", fontId );
	main.textRenderer.drawText( x, y, text, fontId );
}

/// Measures the size of the given text without printing it.
/// text: string
///   The text to measure.
/// return:
///   An object with {cols, rows} indicating how wide and how tall the text is,
///   expressed in rows and columns (not pixels).
export function measure( text ) {
	main.preflight( "measure" );
	qut.checkString( "text", text );
	return main.textRenderer.measure( text );
}

/// Prints a character at the current cursor position using the current
/// foreground and background colors, advancing the cursor position.
/// charCode: integer | string
///   The character to print, as an integer (its ASCII code). This
///   can also be a one-character string for convenience, so 65
///   and "A" mean the same thing.
/// numTimes: integer, optional, default = 1
///   How many times to print the character. By default 1.
export function printChar( charCode, numTimes = 1 ) {
	main.preflight( "beep8.printChar" );
	charCode = convChar( charCode );
	qut.checkNumber( "charCode", charCode );
	qut.checkNumber( "numTimes", numTimes );
	main.textRenderer.printChar( charCode, numTimes );
}

/// Prints a rectangle of the given size with the given character,
/// with the current foreground and background colors,
/// starting at the current cursor position. Does not change cursor position.
/// widthCols: integer
///   Width of the rectangle in screen columns.
/// heightRows: integer
///   Height of the rectangle in screen rows.
/// charCode: integer | string (default = 32)
///   The character to print, as an integer (its ASCII code). This
///   can also be a one-character string for convenience, so 65
///   and "A" mean the same thing. By default this is 32 (space).
export function printRect( widthCols, heightRows, charCode = 32 ) {
	main.preflight( "beep8.printRect" );
	charCode = convChar( charCode );
	qut.checkNumber( "widthCols", widthCols );
	qut.checkNumber( "heightRows", heightRows );
	qut.checkNumber( "charCode", charCode );
	main.textRenderer.printRect( widthCols, heightRows, charCode );
}

/// Prints a box of the given size starting at the cursor position, using
/// border-drawing characters. Does not change cursor position.
/// widthCols: integer
///   Width of the box in screen columns, including the border.
/// heightRows: integer
///   Height of the box in screen rows, including the border.
/// fill: boolean (default = true)
///   If true, will fill the interior of the box with spaces. Otherwise,
///   the interior of the box won't be printed, only the borders.
/// borderChar: integer (default = 0x80)
///   The first border-drawing character to use. Border-drawing characters
///   are assumed to start at the given character code and must be arranged
///   in this order: top-left, top-right, bottom-left, bottom-right,
///   vertical bar, horizontal bar. The default font has these characters
///   already in the right positions and order at char code 0x80.
export function printBox( widthCols, heightRows, fill = true, borderChar = 0x80 ) {
	main.preflight( "beep8.printBox" );
	borderChar = convChar( borderChar );
	qut.checkNumber( "widthCols", widthCols );
	qut.checkNumber( "heightRows", heightRows );
	qut.checkBoolean( "fill", fill );
	qut.checkNumber( "borderChar", borderChar );
	main.textRenderer.printBox( widthCols, heightRows, fill, borderChar );
}

/// Draws an image (previously loaded with beep8a.loadImage).
/// x: integer
///   The x coordinate (in pixels) of the point on the screen
///   where the top-left of the image will be drawn.
/// y: integer
///   The y coordinate (in pixels) of the point on the screen
///   where the top-left of the image will be drawn.
/// image: Image
///   The image to draw.
export function drawImage( x, y, image ) {
	qut.checkInstanceOf( "image", image, HTMLImageElement );
	qut.checkNumber( "x", x );
	qut.checkNumber( "y", y );
	main.drawImage( image, x, y );
}

/// Draws a rectangular part of an image (previously loaded with beep8a.loadImage).
/// x: integer
///   The x coordinate (in pixels) of the point on the screen
///   where the top-left of the image will be drawn.
/// y: integer
///   The y coordinate (in pixels) of the point on the screen
///   where the top-left of the image will be drawn.
/// image: Image
///   The image to draw.
/// srcX: integer
///   The x coordinate (in pixels) of the top-left of the rectangle
///   to be drawn.
/// srcY: integer
///   The y coordinate (in pixels) of the top-left of the rectangle
///   to be drawn.
/// width: integer
///   The width in pixels of the rectangle to be drawn.
/// height: integer
///   The height in pixels of the rectangle to be drawn.
export function drawImageRect( x, y, image, srcX, srcY, width, height ) {
	qut.checkInstanceOf( "image", image, HTMLImageElement );
	qut.checkNumber( "x", x );
	qut.checkNumber( "y", y );
	qut.checkNumber( "srcX", srcX );
	qut.checkNumber( "srcY", srcY );
	qut.checkNumber( "width", width );
	qut.checkNumber( "height", height );
	main.drawImage( image, x, y, srcX, srcY, width, height );
}

/// Draws a rectangle (border only). The rectangle is drawn using the
/// current foreground color.
///
/// x: integer
///   The x coordinate (in pixels) of the top-left corner of
///   the rectangle.
/// y: integer
///   The y coordinate (in pixels) of the top-left corner of
///   the rectangle.
/// width: integer
///   The width in pixels of the rectangle.
/// height: integer
///   The height in pixels of the rectangle.
export function drawRect( x, y, width, height ) {
	qut.checkNumber( "x", x );
	qut.checkNumber( "y", y );
	qut.checkNumber( "width", width );
	qut.checkNumber( "height", height );
	main.drawRect( x, y, width, height );
}

/// Draws a filled rectangle. The rectangle is drawn and filled
/// using the current foreground (not background!) color.
///
/// x: integer
///   The x coordinate (in pixels) of the top-left corner of
///   the rectangle.
/// y: integer
///   The y coordinate (in pixels) of the top-left corner of
///   the rectangle.
/// width: integer
///   The width in pixels of the rectangle.
/// height: integer
///   The height in pixels of the rectangle.
export function fillRect( x, y, width, height ) {
	qut.checkNumber( "x", x );
	qut.checkNumber( "y", y );
	qut.checkNumber( "width", width );
	qut.checkNumber( "height", height );
	main.fillRect( x, y, width, height );
}

/// Plays a sound (previously loaded with beep8a.playSound).
/// sfx: Sound
///   The sound to play.
/// volume: number (default = 1)
///   The volume to play the sound at.
/// loop: boolean (default = false)
///   Plays the sound in a loop (returns to the start after finishing)
export function playSound( sfx, volume = 1, loop = false ) {
	qut.checkInstanceOf( "sfx", sfx, HTMLAudioElement );
	sfx.currentTime = 0;
	sfx.volume = volume;
	sfx.loop = loop;
	sfx.play();
}

/// Draws a sprite on the screen.
/// ch:
///   The character code of the sprite.
/// x:
///   The X position at which to draw (top-left).
/// y:
///   The Y position at which to draw (top-left).
export function spr( ch, x, y ) {
	ch = convChar( ch );
	qut.checkNumber( "ch", ch );
	qut.checkNumber( "x", x );
	qut.checkNumber( "y", y );
	main.textRenderer.spr( ch, x, y );
}

/// Checks if the given key is currently pressed or not. This only works
/// if running in a frame handler (see the beep8.frame() function).
/// keyName: string
///   The name of the key like "A", "B", "C", "ArrowUp", etc.
///   This is just the Javascript key name as described
///   <a href="https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values">here</a>.
export function key( keyName ) {
	main.preflight( "beep8.key" );
	qut.checkString( "keyName", keyName );
	return main.inputSys.keyHeld( keyName );
}

/// Checks if the given key was JUST pressed on this frame. This only works
/// if running in a frame handler (see the frame() function). When a key
/// is pressed, this function will return true for one frame, then will
/// become false afterwards even if the key is held.
/// keyName: string
///   The name of the key like "A", "B", "C", "ArrowUp", etc.
///   This is just the Javascript key name as described
///   <a href="https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values">here</a>.
export function keyp( keyName ) {
	main.preflight( "beep8.keyp" );
	qut.checkString( "keyName", keyName );
	return main.inputSys.keyJustPressed( keyName );
}

/// Redefines the colors, that is, assigns new RGB values to each
/// of the integer colors. This won't change the image on the screen,
/// it only applies to newly drawn elements, so this can't be used for
/// palette animation of something that was already drawn.
/// WARNING: This is reasonably expensive, as all cached glyph images
/// must be regenerated. Don't call this often.
/// colors: array
///   An array of RGB values with the new color definitions, in the
///   same format as in the CONFIG object.
export function redefineColors( colors ) {
	main.preflight( "beep8.redefineColors" );
	qut.checkArray( "colors", colors );
	main.defineColors( colors );
}

/// Sets the current font for text-based operations like beep8.print().
/// Note that the font passed must have been previously loaded with
/// beep8a.loadFont(). For use as a text font, the font's character dimensions
/// must be a multiple of CONFIG.CHR_WIDTH and CONFIG.CHR_HEIGHT, so for
/// example if you specified that your default character size is 8x8, then
/// fonts can be 8x8, 16x8, 16x16, 32x32, etc. But not 9x7 for example.
///
/// fontId: string
///   (optional) The font to set. To reset to the default font, pass null,
///   or omit the parameter.
export function setFont( fontId ) {
	main.preflight( "beep8.setFont" );
	fontId = fontId || "default"
	qut.checkString( "fontId", fontId );
	main.textRenderer.setFont( fontId );
}

function convChar( charCode ) {
	if ( typeof ( charCode ) === "string" && charCode.length > 0 ) {
		return charCode.charCodeAt( 0 );
	}
	return charCode;
}

/// Stop a sound (previously loaded with beep8a.playSound).
/// sfx: Sound
///   The sound to stop playing.
export function stopSound( sfx ) {
	qut.checkInstanceOf( "sfx", sfx, HTMLAudioElement );
	sfx.currentTime = 0;
	sfx.pause();
}

/// Returns the raw canvas 2D context so you can draw anything you want
/// to it. Note that this is the off-screen 2D context, so you are drawing
/// to a hidden surface and your beautiful artwork will only be visible
/// once the screen renders (either by calling beep8.render() explicitly,
/// or by calling a blocking function that causes an implicit render).
///
/// return:
///   The raw HTML 2D canvas context for your enjoyment. If you put the
///   context into an unusual state, please revert that state after you're
///   done, otherwise beep8 might get confused.
export function getContext() {
	return main.getContext();
}

/// Saves the contents of the screen into an ImageData object and returns it.
/// You can later restore the screen's contents with beep8.restoreScreen.
/// An ImageData object is somewhat large, as it contains all the pixels on the screen.
/// This is no longer 1985, so you can keep several of these in memory, but
/// you shouldn't create them indiscriminately.
///
/// return:
///   An ImageData object with the screen's contents.
export function saveScreen() {
	return main.saveScreen();
}

/// Restores the contents of the screen using an ImageData object obtained from a
/// previous call to beep8.saveScreen().
///
/// screenData: ImageData
///   The ImageData object obtained from a previous call to beep8.saveScreen().
export function restoreScreen( screenData ) {
	return main.restoreScreen( screenData );
}
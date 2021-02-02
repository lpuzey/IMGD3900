// game.js for Perlenspiel 3.3
// The following comment lines are for JSHint. You can remove them if you don't use JSHint.
/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

// Linda Puzey
// Mod 1: I deleted many of the functions and variables that I didn't want (ex. sprites)
// Mod 2: I added multiple different colors for the map
// Mod 3: I completely reworked the map, with the new colors, to make Billy Batson
// Mod 4: I created an entirely new map to create Shazam
// Mod 5: I changed the gridcolor to gray
// Mod 6: I reworked the touch function to switch between maps (Billy and Shazam)
// Mod 7: I changed the status line to say "Click to SHAZAM!"
// Mod 8: The touch funtion plays the fx_bang audio
// Mod 9: I used a fader to flash the yellow color (symbolizing a lightning strike)
// Mod 10: I made is so the gray beads also use the fader to flash yellow so that there isn't a box around Billy/Shazam
// Mod 11: I changed the status line color to black
// Mod 12: I added multiple audio files
// Mod 13: I made it so he says "shazam" depending on which form he is in

// AUDIO CREDITS
//From the game LEGO DC Supervillians
//All credit to Warner Bros. and Travelers Tales
//SHAZAM belongs to DC comics


"use strict";

// The G object will contain all public constants, variables and functions.
// The immediately invoked function expression (IIFE) encapsulates all game functionality.
// It is called as this file is loaded, and initializes the G object.

const G = ( function () {

	// Constants are in all upper-case

	const WIDTH = 21; // grid width
	const HEIGHT = 21; // grid height

	const COLOR_BG = PS.COLOR_GRAY; // background color
	const COLOR_OL = PS.COLOR_BLACK; // wall color
	const COLOR_RED = PS.COLOR_RED; // floor color
	const COLOR_YELLOW = PS.COLOR_YELLOW; // gold color
	const COLOR_WHITE = PS.COLOR_WHITE; // white color

	const COLOR_JACKET = 0x956E3C; // brown color
	const COLOR_PANTS = 0x2C375B; // dark blue color
	const COLOR_GLOVES = 0x212728; // grey color
	const COLOR_SOCKS = 0xABC6CB; // light grey color
	const COLOR_HAIR = 0x503421; // brown color

	const COLOR_SKIN = 0xFFEAB9; // tan color

	const BACKGROUND = 0; // background
	const OUTLINE = 1; // black
	const REDSHIRT = 2; // red superhero shirt
	const YELLOWSHIRT = 3; //yellow superhero shirt
	const WHITESHIRT = 4; //White for the cape and eyes

	const JACKET = 5; //brown jacket
	const PANTS = 6; //blue pants
	const GLOVES = 7; //dark grey gloves
	const SOCKS = 8; //light greay socks
	const HAIR = 10; //brown hair

	const SKIN = 9; // Skin Tone


	//Billy Batson's map
	let Billy = {
		width: WIDTH, // must match WIDTH!
		height: HEIGHT, // must match HEIGHT!
		pixelSize: 1, // must be present!
		data: [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 1, 10, 10, 10, 10, 10, 1, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 10, 10, 10, 10, 10, 10, 10, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 10, 9, 9, 9, 9, 9, 10, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 9, 1, 9, 9, 9, 1, 9, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 1, 1, 9, 4, 9, 9, 9, 4, 9, 1, 1, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 1, 2, 1, 1, 9, 9, 9, 9, 9, 1, 1, 2, 1, 0, 0, 0, 0,
			0, 0, 0, 0, 1, 1, 5, 2, 1, 9, 9, 9, 1, 2, 5, 1, 1, 0, 0, 0, 0,
			0, 0, 0, 0, 1, 5, 5, 1, 2, 1, 1, 1, 2, 1, 5, 5, 1, 0, 0, 0, 0,
			0, 0, 0, 1, 5, 5, 1, 1, 5, 2, 6, 2, 5, 1, 1, 5, 5, 1, 0, 0, 0,
			0, 0, 0, 1, 7, 7, 1, 1, 5, 5, 2, 5, 5, 1, 1, 7, 7, 1, 0, 0, 0,
			0, 0, 0, 1, 7, 7, 1, 1, 5, 5, 5, 5, 5, 1, 1, 7, 7, 1, 0, 0, 0,
			0, 0, 0, 0, 1, 1, 0, 1, 5, 5, 5, 5, 5, 1, 0, 1, 1, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 1, 6, 6, 1, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 6, 6, 1, 0, 1, 6, 6, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 1, 1, 8, 8, 1, 0, 0, 0, 1, 8, 8, 1, 1, 0, 0, 0, 0,
			0, 0, 0, 1, 4, 4, 4, 4, 1, 0, 0, 0, 1, 4, 4, 4, 4, 1, 0, 0, 0,
			0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0
		]
	};

	//Shazam's map
	let Shazam = {
		width: WIDTH, // must match WIDTH!
		height: HEIGHT, // must match HEIGHT!
		pixelSize: 1, // must be present!
		data: [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 1, 9, 9, 9, 9, 9, 1, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 9, 4, 9, 9, 9, 4, 9, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 9, 1, 9, 9, 9, 1, 9, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 1, 9, 9, 9, 9, 9, 1, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 1, 1, 2, 2, 1, 9, 9, 9, 1, 2, 3, 1, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 1, 2, 2, 1, 3, 1, 1, 1, 3, 1, 4, 3, 1, 0, 0, 0, 0,
			0, 0, 0, 1, 2, 2, 1, 1, 2, 2, 3, 3, 2, 1, 4, 4, 3, 1, 0, 0, 0,
			0, 0, 0, 1, 3, 3, 1, 1, 2, 2, 3, 3, 2, 1, 4, 4, 3, 1, 0, 0, 0,
			0, 0, 0, 1, 9, 9, 1, 1, 2, 2, 3, 2, 2, 1, 4, 4, 3, 1, 0, 0, 0,
			0, 0, 0, 0, 1, 1, 0, 1, 3, 3, 3, 3, 3, 1, 4, 4, 3, 1, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 2, 2, 1, 4, 4, 3, 1, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 1, 2, 2, 1, 1, 3, 1, 0, 0, 0,
			0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0, 0, 1, 2, 2, 1, 1, 0, 0, 0, 0,
			0, 0, 0, 1, 3, 3, 3, 3, 1, 0, 0, 0, 1, 3, 3, 3, 3, 1, 0, 0, 0,
			0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0
		]
	};

	// Public functions are exposed in the global G object, which is initialized here.
	// Only two functions need to be exposed; everything else is encapsulated!
	// So safe. So elegant.

	return {
		// Initialize the game
		// Called once at startup

		init : function () {
			let x, y, val, color;

			// Establish grid size
			// This should always be done FIRST, before any other initialization!

			PS.gridSize( WIDTH, HEIGHT );

			PS.gridColor( PS.COLOR_GRAY); // grid background color
			PS.border( PS.ALL, PS.ALL, 0 ); // no bead borders
			PS.statusColor( PS.COLOR_BLACK ); //Statusline color
			PS.statusText( "Click to SHAZAM!" ); //Statusline text

			// Use the map.data array to draw the maze
			// This also counts the number of gold pieces that have been placed

			for ( y = 0; y < HEIGHT; y += 1 ) {
				for ( x = 0; x < WIDTH; x += 1 ) {
					val = Billy.data[ ( y * HEIGHT ) + x ]; // get data
					if ( val === BACKGROUND ) {
						color = COLOR_BG;
					}
					else if ( val === OUTLINE ) {
						color = COLOR_OL;
					}
					else if ( val === REDSHIRT ) {
						color = COLOR_RED;
					}
					else if ( val === YELLOWSHIRT ) {
						color = COLOR_YELLOW;
					}
					else if ( val === WHITESHIRT ) {
						color = COLOR_WHITE;
					}
					else if ( val === SKIN ) {
						color = COLOR_SKIN;
					}
					else if ( val === JACKET ) {
						color = COLOR_JACKET;
					}
					else if ( val === PANTS ) {
						color = COLOR_PANTS;
					}
					else if ( val === GLOVES ) {
						color = COLOR_GLOVES;
					}
					else if ( val === SOCKS ) {
						color = COLOR_SOCKS;
					}
					else if ( val === HAIR ) {
						color = COLOR_HAIR;
					}
					PS.color( x, y, color );
				}
			}

			PS.audioLoad( "fx_bang" );

		},
		touch : function () {
			//Setting vars for the func
			let x, y, val, color, nextMap;

			//Sets the map to Shazam, if it is Shazam then it changes it to Billy
			nextMap= Shazam;
			if(PS.color( 10, 12 ) == COLOR_YELLOW){
				nextMap = Billy;
				PS.audioPlay( "Shazam", { path : "audio/"} );

			}else{
				PS.audioPlay( "BillyBatson", { path : "audio/"} );
			}

			//The thunder sound
			PS.audioPlay( "fx_bang" );

			//The lightning flash
			PS.gridColor( PS.COLOR_GRAY );
			PS.gridFade( 5 );
			PS.gridColor( PS.COLOR_YELLOW );
			PS.gridFade( 5 );
			PS.gridColor( PS.COLOR_GRAY );



			//A for loop that goes through and changes the colors to that of the map
			for ( y = 0; y < HEIGHT; y += 1 ) {
				for ( x = 0; x < WIDTH; x += 1 ) {
					val = nextMap.data[ ( y * HEIGHT ) + x ]; // get data
					if ( val === BACKGROUND ) {
						color = COLOR_BG;
						PS.fade(x,y, 5);
					}
					else if ( val === OUTLINE ) {
						color = COLOR_OL;
					}
					else if ( val === REDSHIRT ) {
						color = COLOR_RED;
					}
					else if ( val === YELLOWSHIRT ) {
						color = COLOR_YELLOW;
					}
					else if ( val === WHITESHIRT ) {
						color = COLOR_WHITE;
					}
					else if ( val === SKIN ) {
						color = COLOR_SKIN;
					}
					else if ( val === JACKET ) {
						color = COLOR_JACKET;
					}
					else if ( val === PANTS ) {
						color = COLOR_PANTS;
					}
					else if ( val === GLOVES ) {
						color = COLOR_GLOVES;
					}
					else if ( val === SOCKS ) {
						color = COLOR_SOCKS;
					}
					else if ( val === HAIR ) {
						color = COLOR_HAIR;
					}

					//Uses the fader of the background beads
					if(color == COLOR_BG){

						PS.color( x, y, color );
						PS.fade(x,y, 5);
						PS.color( x, y, COLOR_YELLOW);
						PS.fade(x,y, 5);
						PS.color( x, y, color);
					}
					//Changes the colors to those above
					PS.color( x, y, color );
				}
			}
		}
	};
} () ); // end of IIFE

// The following calls assign the G.init() and G.touch() functions above to Perlenspiel's event handlers.

// PS.init( system, options )
// Initializes the game

PS.init = function ( system, options ) {
	G.init(); // game-specific initialization
};

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched

PS.touch = function ( x, y, data, options ) {
	G.touch(); // Does a bunch of stuff when it is clicked
};



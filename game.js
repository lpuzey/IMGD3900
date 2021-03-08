/*
game.js for Perlenspiel 3.3.x
Last revision: 2021-01-29 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-21 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Add code to the event handlers required by your project.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these lines.
*/

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT delete this directive!

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/
const DB = "PiperStory";
const USERS = ["lpuzey","adhiggins"];
let user;

var sequenceMade=[];
var sequenceUser=[];
let level = 0;
let waiting;

//plays the music and buttons for the sequence
function playSequence(){
	let x;
	let y;
	for (let element = 0; element < sequenceMade.length; element++) {
		setTimeout(function(){
			switch (sequenceMade[element]){
				//Green
				case 0:
					x = 4;
					y = 2;
					PS.audioPlay( "xylo_a4" );
					PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );
					PS.color( x, y, PS.COLOR_GREEN );
					break;
				//Red
				case 1:
					x = 6;
					y = 2;
						PS.audioPlay( "xylo_c5" );
						PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );
						PS.color( x, y, PS.COLOR_RED );
					break;
				//Yellow
				case 2:
					x = 9;
					y = 2;

						PS.audioPlay( "xylo_c6" );
						PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );
						PS.color( x, y, PS.COLOR_YELLOW );
					break;
				//Blue
				case 3:
					x = 11;
					y = 2;
						PS.audioPlay( "xylo_c7" );
						PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );
						PS.color( x, y, PS.COLOR_BLUE );
					break;
			}
		},element*500)

	}

};

//creates the next entry in the sequence
function nextSequence() {
	var randomNumber = Math.floor(Math.random()*4);
	sequenceMade.push(randomNumber);
	waiting = true;
	PS.statusText( "Press SPACE to continue." );
	sequenceUser=[];
	nextLevel();
};

//checks if the sequence that the player put in is correct or not
function checkSequence(indexOfArray) {

	if(sequenceUser[indexOfArray] === sequenceMade[indexOfArray]){

		if(sequenceMade.length === sequenceUser.length) {
			//Correct Sequence
			if(level == 10){
				PS.statusText( "You Win!" );
				PS.dbEvent( DB, "Win?", "Won" );
				S.dbEvent( DB, "LevelNum", level);
				PS.dbSend( DB, USERS);
			}else{
				nextSequence();
			}
		}
	} else {
		//What happens when you fail
		PS.statusText( "Gameover!" );
		PS.dbEvent( DB, "Win?", "Gameover" );
		PS.dbEvent( DB, "LevelNum", level);
		PS.dbSend( DB, USERS);
	}
};

//increments the level the player is on
function nextLevel() {
	level++;
};

//coordinates for the green button
const BUTTON_GREEN = [
	[ 4, 2 ]
];
//coordinates for the red button
const BUTTON_RED = [
	[ 6, 2 ]
];

//coordinates for the yellow button
const BUTTON_YELLOW = [
	[ 9, 2 ]
];

//coordinates for the blue button
const BUTTON_BLUE = [
	[ 11, 2 ]
];

//Function to create buttons
const initButton = function ( data, exec ) {
	let len = data.length;
	for ( let i = 0; i < len; i += 1 ) {
		let loc = data[ i ]; // grab a coordinate array
		let x = loc[ 0 ]; // first element is x
		let y = loc[ 1 ]; // second element is y
		PS.exec( x, y, exec ); // assign the button's function to this bead

	}
};

//When the player clicks on the green button
const click_green = function () {
	//coordinates
	let x = 4;
	let y = 2;

	sequenceUser.push(0);

	PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );

	PS.color( x, y, PS.COLOR_GREEN );

	PS.audioPlay( "xylo_a4" );

	checkSequence(sequenceUser.length-1);


};

//When the player clicks on the red button
const click_red = function () {
	//coordinates
	let x = 6;
	let y = 2;

	sequenceUser.push(1);

	PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );

	PS.color( x, y, PS.COLOR_RED );

	PS.audioPlay( "xylo_c5" );

	checkSequence(sequenceUser.length-1);

};

//When the player clicks on the yellow button
const click_yellow = function () {
	//coordinates
	let x = 9;
	let y = 2;

	sequenceUser.push(2);

	PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );

	PS.color( x, y, PS.COLOR_YELLOW );

	PS.audioPlay( "xylo_c6" );

	checkSequence(sequenceUser.length-1);

};

//When the player clicks on the blue button
const click_blue = function () {
	//coordinates
	let x = 11;
	let y = 2;

	sequenceUser.push(3);

	PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );

	PS.color( x, y, PS.COLOR_BLUE );

	PS.audioPlay( "xylo_c7" );

	checkSequence(sequenceUser.length-1);

};


// Image loading function
// Called when image loads successfully
// [data] parameter will contain imageData
let myLoader;

myLoader = function ( imageData ) {

	// Blit the image to the grid at 0, 0

	PS.imageBlit( imageData, 0, 0 );
};


PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:

	// PS.debug( "PS.init() called\n" );

	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!
	// The sample call below sets the grid to the
	// default dimensions (8 x 8).
	// Uncomment the following code line and change
	// the x and y parameters as needed.

	 PS.gridSize( 15, 4 );
     PS.border( PS.ALL, PS.ALL, 0 ); // no borders
	PS.imageLoad( "images/recorder.bmp", myLoader );

	initButton( BUTTON_GREEN, click_green );
	initButton( BUTTON_RED, click_red );
	initButton( BUTTON_YELLOW, click_yellow );
	initButton( BUTTON_BLUE, click_blue );

	//Load all the audio
	PS.audioLoad( "xylo_a4" );
	PS.audioLoad( "xylo_c5" );
	PS.audioLoad( "xylo_c6" );
	PS.audioLoad( "xylo_c7" );

	const onLogin = function ( id, username ) {
		if ( username === PS.ERROR ) {
			PS.statusText( "Login failed; aborting." );
			return; // aborts game startup
		}

		user = username; // save collected username
		PS.statusText( "Hello, " + user + "!" );

		// Final game startup code goes here
		nextSequence();
		PS.statusText( "Press SPACE to start." );
	};

	// Collect user credentials, init database
	// NOTE: To disable DB operations during development,
	// change the value of .active to false



	PS.dbLogin( DB, onLogin, { active : true } );

};

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
	// Uncomment the following code line
	// to inspect x/y parameters:

	 // PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches
	// over a bead.
};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyDown = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	//PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.

	if((key == 32)&&(waiting == true)){

		PS.statusText( "Practice playing your Flute." );
		playSequence();
		waiting = false;
	}
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

	//	 var device = sensors.wheel; // check for scroll wheel
	//
	//	 if ( device ) {
	//	   PS.debug( "PS.input(): " + device + "\n" );
	//	 }

	// Add code here for when an input event is detected.
};

/*
PS.shutdown ( options )
Called when the browser window running Perlenspiel is about to close.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: This event is generally needed only by applications utilizing networked telemetry.
*/

PS.shutdown = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "“Dave. My mind is going. I can feel it.”\n" );

	// Add code here to tidy up when Perlenspiel is about to close.
};


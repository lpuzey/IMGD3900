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

//AUDIO CREDIT
//Flute noises by Nintendo
//From The Legend of Zelda: Ocarina of Time
//Background music from
//The Legend of Zelda: Majora's Mask


const DB = "PiperStory";
const USERS = ["lpuzey","adhiggins"];
let user;
let game1 = true;
let game2 = false;
let game3 = false;

//INFESTATION CODE ---------------------------------------
let ratsX = [];
let	ratsY = [];
let humansX = 15;
let humansY = [20,21,22,23,24,25,26,27,28,29,30,31,32];
let totalRats = 0;
let ratGoal = 7;
const BOTTOM_ROW = 20;
let finishedGame1 = false;

// Image loading function
// Called when image loads successfully
// [data] parameter will contain imageData
let myLoader;

myLoader = function ( imageData ) {

	// Blit the image to the grid at 0, 0

	PS.imageBlit( imageData, 0, 0 );
};

const tickRats = function () {
	"use strict";
	var len, i, x, y;

	// The length of the RAIN.DropsX array is the current number of drops

	len = ratsX.length; // number of drops

	// Loop through each active raindrop
	// NOTE: We can't use a for/next loop in this case,
	// because we need to dynamically modify the index variable [i]
	// Javascript doesn't allow this in for/next loops

	i = 0;
	while ( i < len )
	{
		// get current position of raindrop

		x = ratsX[ i ];
		y = ratsY[ i ];

		// If bead is above last row, erase it and redraw one bead lower

		if ( y > BOTTOM_ROW )
		{
			// erase the existing drop

			PS.color(x, y, PS.color( 0, 0));

			// add 1 to y position

			y -= 1;

			// update its y position in the array

			ratsY[ i ] = y;

			// Has drop reached the bottom row yet?

			if ( y > BOTTOM_ROW ) // nope
			{
				// Repaint the drop one bead lower

				PS.color( x, y, PS.COLOR_GRAY);
			}

			// point index to next drop

			i += 1;
		}
		else{
			ratsX.splice( i, 1 );
			ratsY.splice( i, 1 );

			len -= 1;
		}

	  }
};

//spawns the humans
const humans = function () {

	"use strict";
	var len, i, x, y;

	// The length of the RAIN.DropsX array is the current number of drops

	len = 1; // number of drops

	// Loop through each active raindrop
	// NOTE: We can't use a for/next loop in this case,
	// because we need to dynamically modify the index variable [i]
	// Javascript doesn't allow this in for/next loops

	i = 0;
	while ( i < len )
	{
		// get current position of raindrop

		x = humansX;
		y = humansY[ i ];

		// If bead is above last row, erase it and redraw one bead lower

		if ( y < 32)
		{
			// erase the existing drop

			PS.color(x, y, PS.color( 0, 0));

			PS.color(15, 20, PS.COLOR_BLACK);

			// add 1 to y position

			y += 1;

			// update its y position in the array

			humansY[ i ] = y;

			// Has drop reached the bottom row yet?

			if ( y < 32) // nope
			{
				// Repaint the drop one bead lower

				PS.color( x, y, { rgb : 0xFFD8CF });
			}

			// point index to next drop

			i += 1;
		}

		// Bead has already been splashed, so remove it from animation list

		else
		{

			// Arrays are now one element smaller, so update the array length variable
			// But leave the index variable [i] alone!
			// It's already pointing at the next drop

			len -= 1;
		}
	}


};

//loads the infestation minigame
const loadGame1 = function(){
	PS.gridSize( 32, 32 );
	PS.border( PS.ALL, PS.ALL, 0 ); // no borders
	PS.imageLoad( "images/House1.bmp", myLoader );
	PS.statusText( "Click to Infest." );

	PS.timerStart( 6, tickRats );
};





//FLUTE CODE ------------------------------------------------
var sequenceMade=[];
var sequenceUser=[];
let level = 0;
let waiting;
let fluteGoal = 7;

let win = false;
let gameover = false;

//background music
//Music channels
let music_home = null; // home music



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
					PS.audioPlay( "ocarinaGreen", { path : "audio/"} );
					PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );
					PS.color( x, y, PS.COLOR_GREEN );
					break;
				//Red
				case 1:
					x = 6;
					y = 2;
					PS.audioPlay( "ocarinaRed", { path : "audio/"} );
					PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );
					PS.color( x, y, PS.COLOR_RED );
					break;
				//Yellow
				case 2:
					x = 9;
					y = 2;
					PS.audioPlay( "ocarinaYellow", { path : "audio/"} );
					PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );
					PS.color( x, y, PS.COLOR_YELLOW );
					break;
				//Blue
				case 3:
					x = 11;
					y = 2;
					PS.audioPlay( "ocarinaBlue", { path : "audio/"} );
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
	PS.statusText( "CLICK grey bead to continue." );
	sequenceUser=[];
	nextLevel();
	waiting = true;
};

//checks if the sequence that the player put in is correct or not
function checkSequence(indexOfArray) {

	if(sequenceUser[indexOfArray] === sequenceMade[indexOfArray]){

		if(sequenceMade.length === sequenceUser.length) {
			//Correct Sequence
			if(level == fluteGoal){
				PS.statusText( "You Win! Press SPACE." );
				win = true;
				PS.dbEvent( DB, "Win? Flute Game", "Won" );
				PS.dbEvent( DB, "LevelNum", level);
			}else{
				nextSequence();
			}
		}
	} else {
		//What happens when you fail
		PS.statusText( "Gameover! Press SPACE." );
		gameover = true;
		PS.dbEvent( DB, "Win?", "Gameover" );
		PS.dbEvent( DB, "LevelNum", level);
	}
};

//Let's the player play again on a gameover
const playAgain = function () {
	level = 0;
	sequenceMade=[];
	gameover = false;
	nextSequence();
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

	if((!waiting)&&(!gameover)&&(!win)){
		sequenceUser.push(0);

		PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );

		PS.color( x, y, PS.COLOR_GREEN );

		PS.audioPlay( "ocarinaGreen", { path : "audio/"} );

		checkSequence(sequenceUser.length-1);
	}

};

//When the player clicks on the red button
const click_red = function () {
	//coordinates
	let x = 6;
	let y = 2;

	if((!waiting)&&(!gameover)&&(!win)){
		sequenceUser.push(1);

		PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );

		PS.color( x, y, PS.COLOR_RED );

		PS.audioPlay( "ocarinaRed", { path : "audio/"} );

		checkSequence(sequenceUser.length-1);
	}

};

//When the player clicks on the yellow button
const click_yellow = function () {
	//coordinates
	let x = 9;
	let y = 2;

	if((!waiting)&&(!gameover)&&(!win)){
		sequenceUser.push(2);

		PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );

		PS.color( x, y, PS.COLOR_YELLOW );

		PS.audioPlay( "ocarinaYellow", { path : "audio/"} );

		checkSequence(sequenceUser.length-1);
	}

};

//When the player clicks on the blue button
const click_blue = function () {
	//coordinates
	let x = 11;
	let y = 2;

	if((!waiting)&&(!gameover)&&(!win)){
		sequenceUser.push(3);

		PS.fade( x, y, 30, { rgb : PS.COLOR_WHITE } );

		PS.color( x, y, PS.COLOR_BLUE );

		PS.audioPlay( "ocarinaBlue", { path : "audio/"} );

		checkSequence(sequenceUser.length-1);
	}

};


let music_now = null; // stores ID of what's currently playing

//Function to change the music being played
const change_music = function ( snd ) {
	if ( !snd || !music_now ) {
		return; // prevents breakage if sounds aren't loaded yet
	}

	PS.audioStop( music_now ); // stop whatever is playing

	let play = snd; // assume this is the next sound to play

	// If this button's sound is already playing, switch to home music instead

	if ( snd === music_now ) {
		play = music_home;
	}

	PS.audioPlayChannel( play );
	music_now = play;
};

//loads the flute game
const loadGame2 = function(){
	game1 = false;
	game2 = true;

	PS.gridSize( 15, 4 );
	PS.border( PS.ALL, PS.ALL, 0 ); // no borders
	PS.imageLoad( "images/recorder.bmp", myLoader );

	initButton( BUTTON_GREEN, click_green );
	initButton( BUTTON_RED, click_red );
	initButton( BUTTON_YELLOW, click_yellow );
	initButton( BUTTON_BLUE, click_blue );

	nextSequence();
	PS.statusText( "CLICK grey bead to start." );

};



//RATS CODE -------------------------------------------------------------
const _GRID_X = 31; // width of grid; should be an ODD number <= 31
const _GRID_Y = 31; // height of grid; should be an ODD number <= 31
const _MAX_X = _GRID_X - 2; // x-limit of head position
const _MAX_Y = _GRID_Y - 2; // y-limit of head position
const _FPS = 8; // number of ticks per animation frame; 6 = 10 fps)

const _PLANE_HEAD = 3; // grid plane of head sprite (above tail sprites)
const _PLANE_TAIL = 2; // grid plane of tail sprites

const _COLOR_TEXT = PS.COLOR_BLACK;
const _COLOR_HEAD = PS.COLOR_GREEN;
const _COLOR_TAIL = PS.COLOR_GRAY;
const _COLOR_WALL = PS.COLOR_BLACK;
const _COLOR_BG = PS.COLOR_GRAY_LIGHT;
const _COLOR_DEATH = PS.COLOR_RED;

const _SOUND_START = "fx_swoosh"; // start sound
const _SOUND_DEATH = "fx_wilhelm"; // death sound

// VARIABLES

let _running = false; // true if animation should run
let _dead = false; // true if player is dead
let _timer_id = ""; // stores timer id

// Head starts at center of grid

let _head_x; // current x-pos of head
let _head_y; // current y-pos of head
let _prev_x; // previous x-pos of head
let _prev_y; // previous y-pos of head

let _dir_x = 0; // x-direction of head (0 = left, 1 = right)
let _dir_y = 0; // y-direction of head (0 = up, 1 = down)

let _tail = []; // array to store tail elements

let _head_id = ""; // id of head sprite
let _free_id = ""; // id of free element

let _old_free = ""; // id of last free element
let _old_tail = [];

// FUNCTIONS

// Called if head hits wall or any tail element

const _death = function () {
	_running = false; // stop animation
	_dead = true; // because DEATH

	// Hide free element

	PS.spriteShow( _free_id, false );
	_old_free = _free_id;

	// Hide all tail elements

	_tail.forEach( function ( element ) {
		PS.spriteShow( element.id, false );
		_old_tail.push( element.id ); // save id
	} );

	// // Remove free element
	//
	// PS.spriteDelete( _free_id );
	//
	// // Remove all tail elements
	//
	// _tail.forEach( function ( element ) {
	// 	PS.spriteDelete( element.id );
	// } );

	PS.dbEvent( DB, "Rats Collected", _tail.length);
	_tail.length = 0; // empty array

	PS.spriteSolidColor( _head_id, _COLOR_DEATH );
	PS.audioPlay( _SOUND_DEATH );
	PS.statusText( "Lost 'em! Any key to restart." );


	PS.dbSend( DB, USERS);
};

const _new_game = function () {
	// PS.debugClear();

	// Delete sprites from previous game, if any

	if ( _old_free ) {
		PS.spriteDelete( _old_free );
	}
	_old_free = null;

	_old_tail.forEach( function ( element ) {
		PS.spriteDelete( element );
	} );
	_old_tail = [];

	_dead = false; // not dead yet
	_dir_x = _dir_y = 0; // but don't move yet

	// Move head to center of grid

	_prev_x = _head_x = Math.floor( _GRID_X / 2 ) - 1;
	_prev_x = _head_y = Math.floor( _GRID_Y / 2 ) - 1;
	PS.spriteMove( _head_id, _head_x, _head_y );

	PS.spriteSolidColor( _head_id, _COLOR_HEAD ); // alive color

	_new_free(); // create first free element

	PS.statusText( "Use WASD/arrow keys to collect rats!" );
};

// Add free sprite to tail

const _add_tail = function ( id ) {
	let x, y;

	PS.audioPlay( "rat", { path : "audio/"} );

	// If tail is present, use previous location of last element

	let len = _tail.length;
	if ( len > 0 ) {
		let _element = _tail[ len - 1 ]; // get last tail element
		x = _element.ox;
		y = _element.oy;
	}

	// Otherwise use previous location of head

	else {
		x = _prev_x;
		y = _prev_y;
	}

	PS.spriteMove( id, x, y ); // move sprite to new location

	// Add new element to tail array

	_tail.push( {
		id : id, // id of sprite
		x : x, // x-pos of sprite
		y : y, // y-pos of sprite
		ox : x, // previous x-pos
		oy : y // previous y-pos
	} );

	PS.statusText( "You have " + _tail.length + " total rats!" );
	_new_free();
};

// Return true if a bead at x1, y1 will overlap or be adjacent to
// a bead at x2, x1

const _overlap = function ( x1, y1, x2, y2 ) {
	let delta;

	if ( x1 > x2 ) {
		delta = x1 - x2;
	}
	else {
		delta = x2 - x1;
	}

	if ( delta < 2 ) {
		if ( y1 > y2 ) {
			delta = y1 - y2;
		}
		else {
			delta = y2 - y1;
		}

		if ( delta < 2 ) {
			return true;
		}
	}

	return false;
};

// Creates a new free element
// Positions it at a random location that is not at
// the current location of head or any tail element,
// and not beside the head, tail or any wall

const _new_free = function () {
	let x, y;
	let illegal = true;

	// This loop tries different random locations
	// until it finds a legal one

	while ( illegal ) {

		// Generate a candidate position not adjacent to any wall

		x = PS.random( _GRID_X - 4 ) + 1;
		y = PS.random( _GRID_Y - 4 ) + 1;

		// Is this position adjacent to or overlapping the head?

		illegal = _overlap( x, y, _head_x, _head_y );

		// If not, is this position adjacent to or overlapping any tail element?

		if ( !illegal ) {
			let len = _tail.length;
			for ( let i = 0; i < len; i += 1 ) {
				let element = _tail[ i ];
				illegal = illegal || _overlap( x, y, element.x, element.y );
			}
		}
	}

	_free_id = PS.spriteSolid( 1, 1 );
	// PS.debug( "New free: " + _free_id + "!\n" );
	PS.spritePlane( _free_id, _PLANE_TAIL );
	PS.spriteSolidColor( _free_id, _COLOR_TAIL );
	PS.spriteMove( _free_id, x, y );
};

// Called when not-dead player presses a WASD or arrow key
// x = 0 (left) or 1 (right)
// y = 0 (up) or 1 (down)

const _steer = function ( x, y ) {
	_running = true; // enables animation
	_dir_x = x;
	_dir_y = y;
};

// Timer function to drive animation

const _tick = function () {
	if ( !_running || _dead ) {
		return;
	}

	_prev_x = _head_x; // save current x-pos
	_prev_y = _head_y; // and y-pos

	_head_x += _dir_x; // new x-pos
	_head_y += _dir_y; // new y-pos

	PS.spriteMove( _head_id, _head_x, _head_y ); // this could kill!
	if ( _dead ) {
		return;
	}

	// If new position is adjacent to wall, DEATH!

	if ( ( _head_x === 1 ) || ( _head_x === _MAX_X) || ( _head_y === 1 ) || ( _head_y === _MAX_Y ) ) {
		_death();
	}

	// Otherwise move all tail elements

	else {
		let len = _tail.length;
		let px = _prev_x;
		let py = _prev_y;
		for ( let i = 0; i < len; i += 1 ) {
			let element = _tail[ i ];
			element.ox = element.x;
			element.oy = element.y;
			element.x = px;
			element.y = py;
			PS.spriteMove( element.id, px, py );
			px = element.ox;
			py = element.oy;
		}
	}
};


//loads the rat game
const loadGame3 = function(){
	game1 = false;
	game2 = false;
	game3 = true;
	PS.gridSize( _GRID_X, _GRID_Y );
	PS.gridColor( _COLOR_BG );
	PS.imageLoad( "images/MouseGameBackGround.bmp", myLoader );
	PS.border( PS.ALL, PS.ALL, 0 ); // hide borders
	PS.statusColor( _COLOR_TEXT );

	PS.audioPlay( "FluteSong", { path : "audio/",loop : true } )


	// Draw top and bottom walls

	let bottom = _GRID_Y - 1;
	for ( let i = 0; i < _GRID_X; i += 1 ) {
		PS.color( i, 0, _COLOR_WALL );
		PS.color( i, bottom, _COLOR_WALL );
	}

	// Draw left and right walls

	let right = _GRID_X - 1;
	for ( let i = 1; i < bottom; i += 1 ) {
		PS.color( 0, i, _COLOR_WALL );
		PS.color( right, i, _COLOR_WALL );
	}

	// Create head sprite and assign plane

	_head_id = PS.spriteSolid( 1, 1 );
	PS.spritePlane( _head_id, _PLANE_HEAD );

	// This collision function will add the free element to the tail
	// if the head overlaps it
	// or kill the player if it overlaps its own tail

	PS.spriteCollide( _head_id, function ( s1, p1, s2, p2, type ) {
		if ( _running && ( s1 === _head_id ) && ( type === PS.SPRITE_OVERLAP ) ) {
			// PS.debug( "s1 = " + s1 + ", s2 = " + s2 + "\n" );
			if ( s2 === _free_id ) {
				// PS.debug( "Capture!\n" );
				_add_tail( _free_id );
			}
			else {
				_death();
			}
		}
	} );

	_new_game(); // set up initial game

	_timer_id = PS.timerStart( _FPS, _tick );
}



//PS.INIT ---------------------------------------
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

	//Load all the audio
	PS.audioLoad( "fx_wilhelm" );
	PS.audioLoad( "fx_swoosh" );

	//Load other audio
	PS.audioLoad( "ocarinaGreen", { path : "audio/"} );
	PS.audioLoad( "ocarinaRed", { path : "audio/"} );
	PS.audioLoad( "ocarinaYellow", { path : "audio/"} );
	PS.audioLoad( "ocarinaBlue", { path : "audio/"} );
	PS.audioLoad( "rat", { path : "audio/"} );

	//Load Background Music
	PS.audioLoad( "FluteSong", {
		path : "audio/",
		loop : true,
		onLoad : function ( data ) {
			music_home = data.channel; // save the channel ID
			music_now = music_home; // and remember that it's running
		}
	} );



	const onLogin = function ( id, username ) {
		if ( username === PS.ERROR ) {
			PS.statusText( "Login failed; aborting." );
			return; // aborts game startup
		}

		user = username; // save collected username
		PS.statusText( "Hello, " + user + "!" );

		// Final game startup code goes here

	};
	loadGame1();

	// Collect user credentials, init database
	// NOTE: To disable DB operations during development,
	// change the value of .active to false

	// nextSequence();
	// PS.statusText( "CLICK grey bead to start." );

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

	if(game1){
		//human runs out of the house
		if((totalRats > ratGoal)&&(!finishedGame1)) {
			PS.timerStart( 6, humans);
			PS.imageLoad( "images/House1i.bmp", myLoader );
			PS.audioPlay( "fx_wilhelm" );
			finishedGame1 = true;
			PS.dbEvent( DB, "Game1 Complete?", finishedGame1);
			PS.statusText( "Infestation Successful. SPACE to continue." );
		}

		if (( y > BOTTOM_ROW )&&(!finishedGame1))
		{
			totalRats += 1;
			// Add initial X and Y positions of raindrop to animation list
			PS.dbEvent( DB, "TotalInfestationRats", totalRats);

			ratsX.push( x );
			ratsY.push( y );

			PS.color( x, y, PS.COLOR_GRAY ); // set the color
			PS.audioPlay( "rat", { path : "audio/"} );
		}
	}

	if((game2)&&(waiting == true)){
		if((x == 2) &&(y == 1)){

				PS.statusText( "Repeat the Song." );
				playSequence();
				waiting = false;
		}
	}
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

	if(game1){
		if((finishedGame1)&& (key == 32)){
			loadGame2();
		}
	}

	if(game2){
		if((win)&& (key == 32)){
			loadGame3();
		}
		if((gameover)&& (key == 32)){
			playAgain();
		}

	}


};

PS.keyDown = function( key, shift, ctrl, options ) {
	// If player is dead, any key will restart

	if(game3){
		if ( _dead ) {
			PS.audioPlay( _SOUND_START );
			_new_game();
			return;
		}

		switch ( key ) {
			case PS.KEY_ARROW_UP:
			case 119: // lower-case w
			case 87: { // upper-case W
				_steer( 0, -1 );
				break;
			}
			case PS.KEY_ARROW_DOWN:
			case 115: // lower-case s
			case 83: { // upper-case S
				_steer( 0, 1 );
				break;
			}
			case PS.KEY_ARROW_LEFT:
			case 97: // lower-case a
			case 65: { // upper-case A
				_steer( -1, 0 );
				break;
			}
			case PS.KEY_ARROW_RIGHT:
			case 100: // lower-case d
			case 68: { // upper-case D
				_steer( 1, 0 );
				break;
			}
		}
	}

};








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
const DB = "BunnySim";
//const USERS = ["lpuzey","adhiggins"];
const USERS = "lpuzey";

let total_clicks = 0; //the number of times a person clicks

let user;

let curIm;

let age = "Baby";

let brush = 1;
let food = 1;
let bath = 1;

let myLoader;

// Image loading function
// Called when image loads successfully
// [data] parameter will contain imageData

myLoader = function ( imageData ) {

    // Blit the image to the grid at 0, 0

    PS.imageBlit( imageData, 0, 0 );
};


const RATE = 6;
const FPS = 60 / RATE;

let countdown = 10; // I changed from 30 to 60
let frame = FPS ; // Decremented on every tick() call; used to update countdown

let id_timer; // timer id

const tick = function () {

    // *BM*
    // Update frame count, change countdown display after each second.

    frame -= 1;
    if ( frame <= 0 ) {
        frame = FPS; // reset

        // Decrement countdown timer, end game if TIMEOUT value is reached.

        countdown -= 1;
        if ( countdown <= 0 ) {
            //PS.statusText( "You ran out of time!" );
            if(age == "Adult"){
                if(curIm == "Normal"){
                    PS.imageLoad( "images/BunnySad.bmp", myLoader );
                    curIm = "Sad";
                    countdown = 10;
                }
                if(curIm == "Happy"){
                    PS.imageLoad( "images/BunnyNormal.bmp", myLoader );
                    curIm = "Normal";
                    countdown = 10;
                }
            }else{
                if(curIm == "Normal"){
                    PS.imageLoad( "images/BabyBunnySad.bmp", myLoader );
                    curIm = "Sad";
                    countdown = 10;
                }
                if(curIm == "Happy"){
                    PS.imageLoad( "images/BabyBunnyNormal.bmp", myLoader );
                    curIm = "Normal";
                    countdown = 10;
                }
            }
            // PS.dbEvent( DB, "clicks", total_clicks );
            // PS.dbEvent( DB, "timeout", true ); // record the timeout event
        }

         //PS.statusText( countdown ); // display number of seconds remaining
    }
}

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

	// PS.gridSize( 8, 8 );

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

	// PS.statusText( "Game" );

	// Add any other initialization code you need here.


    PS.gridSize( 32, 32 ); // set initial size
    PS.border( PS.ALL, PS.ALL, 0 ); // no borders

    // Load image in default format (4)

    PS.imageLoad( "images/BabyBunnyNormal.bmp", myLoader );
    curIm = "Normal";


    //PS.dbInit( DB );


    PS.statusText( "Click on the Bunny to pet him" );
    
    PS.audioLoad( "fx_squish" );
    PS.audioLoad( "fx_swoosh" );
    PS.audioLoad( "fx_tada" );
    PS.audioLoad( "fx_drip2" );



    const onLogin = function ( id, username ) {
        if ( username === PS.ERROR ) {
            PS.statusText( "Login failed; aborting." );
            return; // aborts game startup
        }

        id_timer = PS.timerStart( RATE, tick );

        user = username; // save collected username
        PS.statusText( "Hello, " + user + "!" );
        id_timer = PS.timerStart( RATE, tick );

        // Final game startup code goes here
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
    total_clicks += 1;
    if(total_clicks == 50){
        age = "Adult";
        PS.imageLoad( "images/BunnyHappy.bmp", myLoader );
        countdown = 10;
        PS.statusText( "YAY! Your bunny has become an adult!" );
        curIm = "Happy";
        PS.audioPlay( "fx_tada" );
        PS.dbEvent( DB, "State", curIm );
        PS.dbEvent( DB, "Age", age );
        PS.dbEvent( DB, "clicks", total_clicks );
        PS.dbSend( DB, USERS);
    }




    //Use the adult images if the bunny is an adult
    if(age == "Adult"){
        //Adult Brush Button (Green)
        if((x == 3)&&(y == 1)){
            //If the image is already the brush image
            if(curIm == "Brush"){
                //switch to the homescreen
                PS.imageLoad( "images/BunnyHappy.bmp", myLoader );
                countdown = 10;
                PS.statusText( "Click on the Bunny to pet him" );
                curIm = "Happy";
            //Else switch the image to the brush image
            }else{
                PS.imageLoad( "images/BunnyBrush1.bmp", myLoader );
                curIm = "Brush";
                brush = 1;
                PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Brush. Click Button Again to Exit." );
            }
        }
        //Adult Food Button (Red)
        if((x == 15)&&(y == 1)){
            //If the image is already the food image
            if(curIm == "Food"){
                //switch to the homescreen
                PS.imageLoad( "images/BunnyHappy.bmp", myLoader );
                countdown = 10;
                PS.statusText( "Click on the Bunny to pet him" );
                curIm = "Happy";
             //Else switch the image to the food image
            }else{
                PS.imageLoad( "images/BunnyFood.bmp", myLoader );
                curIm = "Food";
                PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Feed. Click Button Again to Exit." );
            }
        }
        //Adult Bath Button (Blue)
        if((x == 28)&&(y == 1)){
            //If the image is already the bath image
            if(curIm == "Bath"){
                PS.imageLoad( "images/BunnyHappy.bmp", myLoader );
                countdown = 10;
                PS.statusText( "Click on the Bunny to pet him" );
                curIm = "Happy";
            //Else switch the image to the food image
            }else{
                PS.imageLoad( "images/BunnyBath.bmp", myLoader );
                curIm = "Bath";
                bath = 1;
                // PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Bathe. Click Button Again to Exit." );
            }
        }
        //Adult, if player is not clicking one of the buttons
        //If the image is sad, switch to normal
        else if(curIm == "Sad"){
            PS.imageLoad( "images/BunnyNormal.bmp", myLoader );
            curIm = "Normal";
            PS.dbEvent( DB, "State", curIm );
            countdown = 10;
        }
        //If the image is normal, switch to happy
        else if(curIm == "Normal"){
            PS.imageLoad( "images/BunnyHappy.bmp", myLoader );
            curIm = "Happy";
            PS.dbEvent( DB, "State", curIm );
            countdown = 15;
        }
        //If the image is brush
        else if(curIm == "Brush"){
            //Switch to brush image 1
            if(brush == 1){
                PS.imageLoad( "images/BunnyBrush1.bmp", myLoader );
                brush = 2;
                PS.audioPlay( "fx_swoosh" );

                //Switch to brush image 2
            }else{
                PS.imageLoad( "images/BunnyBrush2.bmp", myLoader );
                brush = 1;
                PS.audioPlay( "fx_swoosh" );

            }
        }
        //If the image is food
        else if(curIm == "Food"){
            //Switch to brush 1
            if(food == 1){
                PS.imageLoad( "images/BunnyFood.bmp", myLoader );
                food = 2;
                PS.audioPlay( "fx_squish" );
                // PS.debug( "one" + food);
            }
            else if(food == 2){
                PS.imageLoad( "images/BunnyFood.bmp", myLoader );
                food = 3;
                PS.audioPlay( "fx_squish" );
                // PS.debug( "two" + food);
            }
            else if(food == 3){
                PS.imageLoad( "images/BunnyFood.bmp", myLoader );
                food = 4;
                PS.audioPlay( "fx_squish" );
                // PS.debug( "three" + food);
            }
            else if(food == 4){
                PS.imageLoad( "images/BunnyFood.bmp", myLoader );
                food = 5;
                PS.audioPlay( "fx_squish" );
                // PS.debug( "four" + food);
            }else if(food == 5){
                PS.imageLoad( "images/BunnyFood.bmp", myLoader );
                food = 1;
                PS.audioPlay( "fx_squish" );
                // PS.debug( "five" + food);
            }
        }
        //If the image is Bath
        else if(curIm == "Bath"){
            //Switch to brush 1
            if(bath == 1){
                PS.imageLoad( "images/BunnyBath.bmp", myLoader );
                bath = 2;
                PS.audioPlay( "fx_drip2" );
                //Switch to brush 2
            }else{
                PS.imageLoad( "images/BunnyBath.bmp", myLoader );
                bath = 1;
                PS.audioPlay( "fx_drip2" );
            }
        }
    }


    //Age is equal to baby
    else{
        //Baby Brush Button (Green)
        if((x == 3)&&(y == 1)){
            //If the image is already the brush image
            if(curIm == "Brush"){
                PS.imageLoad( "images/BabyBunnyHappy.bmp", myLoader );
                countdown = 10;
                PS.statusText( "Click on the Bunny to pet him" );
                curIm = "Happy";

                //Else switch the image to the brush image
            }else{
                PS.imageLoad( "images/BabyBunnyBrush1.bmp", myLoader );
                curIm = "Brush";
                brush = 1;
                PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Brush. Click Button Again to Exit." );
            }
        }
        //Baby Food Button (Red)
        if((x == 15)&&(y == 1)){
            //If the image is already the food image
            if(curIm == "Food"){
                PS.imageLoad( "images/BabyBunnyHappy.bmp", myLoader );
                countdown = 10;
                PS.statusText( "Click on the Bunny to pet him" );
                curIm = "Happy";
            //Else switch the image to the food image
            }else{
                PS.imageLoad( "images/BabyBunnyFood1.bmp", myLoader );
                curIm = "Food";
                food = 1;
                PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Feed. Click Button Again to Exit." );
            }
        }
        //Baby Bath Button (Blue)
        if((x == 28)&&(y == 1)){
            //If the image is already the bath image
            if(curIm == "Bath"){
                PS.imageLoad( "images/BabyBunnyHappy.bmp", myLoader );
                countdown = 10;
                PS.statusText( "Click on the Bunny to pet him" );
                curIm = "Happy";
            //Else switch the image to the food image
            }else{
                PS.imageLoad( "images/BabyBunnyBath.bmp", myLoader );
                curIm = "Bath";
                bath = 1;
                 PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Bathe. Click Button Again to Exit." );
            }
        }
        //Baby, if player is not clicking one of the buttons
        //If the image is sad, switch to normal
        else if(curIm == "Sad"){
            PS.imageLoad( "images/BabyBunnyNormal.bmp", myLoader );
            curIm = "Normal";
            // PS.dbEvent( DB, "State", curIm );
            countdown = 10;
        }
        //If the image is normal, switch to happy
        else if(curIm == "Normal"){
            PS.imageLoad( "images/BabyBunnyHappy.bmp", myLoader );
            curIm = "Happy";
            PS.dbEvent( DB, "State", curIm );
            countdown = 15;
        }
        //If the image is brush
        else if(curIm == "Brush"){
            //Switch to brush 1
            if(brush == 1){
                PS.imageLoad( "images/BabyBunnyBrush1.bmp", myLoader );
                brush = 2;
                PS.audioPlay( "fx_swoosh" );
            //Switch to brush 2
            }else{
                PS.imageLoad( "images/BabyBunnyBrush2.bmp", myLoader );
                brush = 1;
                PS.audioPlay( "fx_swoosh" );
            }
        }
        //If the image is food
        else if(curIm == "Food"){
            //Switch to brush 1
            if(food == 1){
                PS.imageLoad( "images/BabyBunnyFood1.bmp", myLoader );
                food = 2;
                PS.audioPlay( "fx_squish" );
                // PS.debug( "one" + food);
            }
            else if(food == 2){
                PS.imageLoad( "images/BabyBunnyFood2.bmp", myLoader );
                food = 3;
                PS.audioPlay( "fx_squish" );
                // PS.debug( "two" + food);
            }
            else if(food == 3){
                PS.imageLoad( "images/BabyBunnyFood3.bmp", myLoader );
                food = 4;
                PS.audioPlay( "fx_squish" );
                // PS.debug( "three" + food);
            }
            else if(food == 4){
                PS.imageLoad( "images/BabyBunnyFood4.bmp", myLoader );
                food = 5;
                PS.audioPlay( "fx_squish" );
                // PS.debug( "four" + food);
            }else if(food == 5){
                PS.imageLoad( "images/BabyBunnyFood5.bmp", myLoader );
                food = 1;
                PS.audioPlay( "fx_squish" );
                // PS.debug( "five" + food);
            }
        }
        //If the image is Bath
        else if(curIm == "Bath"){
            //Switch to brush 1
            if(bath == 1){
                PS.imageLoad( "images/BabyBunnyBath.bmp", myLoader );
                bath = 2;
                PS.audioPlay( "fx_drip2" );
                //Switch to brush 2
            }else{
                PS.imageLoad( "images/BabyBunnyBath.bmp", myLoader );
                bath = 1;
                PS.audioPlay( "fx_drip2" );
            }
        }
    }



    // PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );
    //  PS.debug( "PS.touch() @ " + curIm );

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

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

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


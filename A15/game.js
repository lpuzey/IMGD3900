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


//Background Music from Bensound.com

const DB = "BunnySim";
//const USERS = ["lpuzey","adhiggins"];
//const USERS = "lpuzey";

let total_clicks = 0; //the number of times a person clicks

let user;

let curIm;

let age = "Baby";

let brush = 1;
let food = 1;
let bath = 1;

let brushClicks = 0;
let foodClicks = 0;
let bathClicks = 0;


let music_home = null; // home music
let music_food = null; // button 1 (food)
let music_brush = null; // button 2 (brush)
let music_bath = null; // button 3 (bath)

let music_now = null; // stores ID of what's currently playing

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

//Brush Button Coordinates
const BUTTON_BRUSH = [
    [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 0, 1 ],
    [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ],
    [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ],
    [ 4, 2 ], [ 5, 2 ], [ 1, 3 ], [ 2, 3 ],
    [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 6, 3 ]
];

//Food Button Coordinates
const BUTTON_FOOD = [
    [ 17, 0 ], [ 18, 0 ], [ 15, 1 ], [ 16, 1 ],
    [ 17, 1 ], [ 18, 1 ], [ 19, 1 ], [ 14, 2 ],
    [ 15, 2 ], [ 16, 2 ], [ 17, 2 ], [ 14, 3 ],
    [ 15, 3 ], [ 16, 3 ], [ 17, 3 ], [ 14, 4 ],
    [ 15, 4 ]
];

//Bath Button Coordinates
const BUTTON_BATH = [
    [ 27, 0 ], [ 28, 0 ], [ 29, 0 ], [ 30, 0 ],[ 31, 0 ],
    [ 27, 1 ], [ 28, 1 ], [ 29, 1 ], [ 30, 1 ],[ 31, 1 ],
    [ 27, 2 ], [ 28, 2 ], [ 29, 2 ], [ 30, 2 ],[ 31, 2 ],
    [ 27, 3 ], [ 28, 3 ], [ 29, 3 ], [ 30, 3 ],[ 31, 3 ],
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

//The brush button is clicked
const click_brush = function () {
    change_music( music_brush );
    if(age == "Adult"){
        //Adult Brush Button (Green)
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
                // PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Brush. Click Button Again to Exit." );

            }
        }
    //Bunny is a baby
    else{
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
                // PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Brush. Click Button Again to Exit." );
            }
        }

    };

//The food button is clicked
const click_food = function () {
    if(brushClicks >= 10){
        change_music( music_food );
        if(age == "Adult"){
            //If the image is already the food image
            if(curIm == "Food"){
                //switch to the homescreen
                PS.imageLoad( "images/BunnyHappy.bmp", myLoader );
                countdown = 10;
                PS.statusText( "Click on the Bunny to pet him" );
                curIm = "Happy";
                //Else switch the image to the food image
            }else{
                PS.imageLoad( "images/BunnyFood1.bmp", myLoader );
                curIm = "Food";
                food = 1;
                // PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Feed. Click Button Again to Exit." );
            }
        }
        //Bunny is a baby
        else{
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
                // PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Feed. Click Button Again to Exit." );
            }
        }
    }
    else{
        PS.statusText( "Keep Brushing to Unlock Feeding." );
        // PS.dbEvent( DB, "BrushClicks", brushClicks );
    }

};

//The bath button is clicked
const click_bath = function () {
    if(foodClicks >= 20){
        change_music( music_bath );
        if(age == "Adult"){
            //If the image is already the bath image
            if(curIm == "Bath"){
                PS.imageLoad( "images/BunnyHappy.bmp", myLoader );
                countdown = 10;
                PS.statusText( "Click on the Bunny to pet him" );
                curIm = "Happy";
                //Else switch the image to the food image
            }else{
                PS.imageLoad( "images/BunnyBath1.bmp", myLoader );
                curIm = "Bath";
                bath = 1;
                // PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Bathe. Click Button Again to Exit." );
            }
        }
        //Bunny is a baby
        else{
            //If the image is already the bath image
            if(curIm == "Bath"){
                PS.imageLoad( "images/BabyBunnyHappy.bmp", myLoader );
                countdown = 10;
                PS.statusText( "Click on the Bunny to pet him" );
                curIm = "Happy";
                //Else switch the image to the food image
            }else{
                PS.imageLoad( "images/BabyBunnyBath1.bmp", myLoader );
                curIm = "Bath";
                bath = 1;
                // PS.dbEvent( DB, "State", curIm );
                PS.statusText( "Click to Bathe. Click Button Again to Exit." );
            }
        }
    }
    else{
        PS.statusText( "Keep Feeding to Unlock Bathing." );
        // PS.dbEvent( DB, "FoodClicks", foodClicks );
    }

};



// Image loading function
// Called when image loads successfully
// [data] parameter will contain imageData
let myLoader;

myLoader = function ( imageData ) {

    // Blit the image to the grid at 0, 0

    PS.imageBlit( imageData, 0, 0 );
};



const RATE = 6;
const FPS = 60 / RATE;

let countdown = 10; // I changed from 30 to 60
let frame = FPS ; // Decremented on every tick() call; used to update countdown

let id_timer; // timer id

let idle = 1;

const tick = function () {

    // *BM*
    // Update frame count, change countdown display after each second.

    frame -= 1;
    if ( frame <= 0 ) {
        frame = FPS; // reset

        // Decrement countdown timer, end game if TIMEOUT value is reached.

        countdown -= 1;
        if ( countdown == 0 ) {
            //PS.statusText( "You ran out of time!" );
            if(age == "Adult"){
                if(curIm == "Normal"){
                    PS.imageLoad( "images/BunnySad1.bmp", myLoader );
                    curIm = "Sad";
                    countdown = 10;
                    idle = 2;
                }
                if(curIm == "Happy"){
                    PS.imageLoad( "images/BunnyNormal1.bmp", myLoader );
                    curIm = "Normal";
                    countdown = 10;
                    idle = 2;
                }

            }
            //Bunny is a baby
            else{
                if(curIm == "Normal"){
                    PS.imageLoad( "images/BabyBunnySad1.bmp", myLoader );
                    curIm = "Sad";
                    countdown = 10;
                    idle = 2;
                }
                if(curIm == "Happy"){
                    PS.imageLoad( "images/BabyBunnyNormal1.bmp", myLoader );
                    curIm = "Normal";
                    countdown = 10;
                    idle = 2;
                }
            }

            // PS.dbEvent( DB, "clicks", total_clicks );
            // PS.dbEvent( DB, "timeout", true ); // record the timeout event
        }
        else{
            if(age == "Adult"){
                if(curIm == "Normal"){
                    if(idle == 1){
                        PS.imageLoad( "images/BunnyNormal1.bmp", myLoader );
                        idle = 2
                    }else{
                        PS.imageLoad( "images/BunnyNormal2.bmp", myLoader );
                        idle = 1
                    }

                }
                if(curIm == "Sad"){
                    if(idle == 1){
                        PS.imageLoad( "images/BunnySad1.bmp", myLoader );
                        idle = 2
                    }else{
                        PS.imageLoad( "images/BunnySad2.bmp", myLoader );
                        idle = 1
                    }
                }
                if(curIm == "Happy"){
                    if(idle == 1){
                        PS.imageLoad( "images/BunnyHappy1.bmp", myLoader );
                        idle = 2
                    }else{
                        PS.imageLoad( "images/BunnyHappy2.bmp", myLoader );
                        idle = 1
                    }
                }
            }
            //Bunny is a baby
            else{
                if(curIm == "Normal"){
                    if(idle == 1){
                        PS.imageLoad( "images/BabyBunnyNormal1.bmp", myLoader );
                        idle = 2
                    }else{
                        PS.imageLoad( "images/BabyBunnyNormal2.bmp", myLoader );
                        idle = 1
                    }

                }
                if(curIm == "Sad"){
                    if(idle == 1){
                        PS.imageLoad( "images/BabyBunnySad1.bmp", myLoader );
                        idle = 2
                    }else{
                        PS.imageLoad( "images/BabyBunnySad2.bmp", myLoader );
                        idle = 1
                    }
                }
                if(curIm == "Happy"){
                    if(idle == 1){
                        PS.imageLoad( "images/BabyBunnyHappy1.bmp", myLoader );
                        idle = 2
                    }else{
                        PS.imageLoad( "images/BabyBunnyHappy2.bmp", myLoader );
                        idle = 1
                    }
                }

            }
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


    // Now we load the four music files and obtain their channel IDs

    PS.audioLoad( "HomeMsc", {
        path : "audio/",
        loop : true,
        autoplay : true, // starts playback immediately when loaded
        onLoad : function ( data ) {
            music_home = data.channel; // save the channel ID
            music_now = music_home; // and remember that it's running
        }
    } );

    PS.audioLoad( "FoodMsc", {
        path : "audio/",
        loop : true,
        onLoad : function ( data ) {
            music_food = data.channel; // save the channel ID
        }
    } );

    PS.audioLoad( "BrushMsc", {
        path : "audio/",
        loop : true,
        onLoad : function ( data ) {
            music_brush = data.channel; // save the channel ID
        }
    } );

    PS.audioLoad( "BathMsc", {
        path : "audio/",
        loop : true,
        onLoad : function ( data ) {
            music_bath = data.channel; // save the channel ID
        }
    } );

    initButton( BUTTON_FOOD, click_food );
    initButton( BUTTON_BRUSH, click_brush );
    initButton( BUTTON_BATH, click_bath );



    // const onLogin = function ( id, username ) {
    //     if ( username === PS.ERROR ) {
    //         PS.statusText( "Login failed; aborting." );
    //         return; // aborts game startup
    //     }
    //
    //     user = username; // save collected username
    //     PS.statusText( "Hello, " + user + "!" );
    //
    //     // Final game startup code goes here
    //     id_timer = PS.timerStart( RATE, tick );
    //     change_music( music_home );
    //
    // };

    // Collect user credentials, init database
    // NOTE: To disable DB operations during development,
    // change the value of .active to false


    // PS.dbLogin( DB, onLogin, { active : true } );

    id_timer = PS.timerStart( RATE, tick );
    change_music( music_home );



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
    if((bathClicks == 15)&& (age != "Adult")){
        age = "Adult";
        PS.imageLoad( "images/BunnyHappy.bmp", myLoader );
        countdown = 10;
        PS.statusText( "YAY! Your bunny has become an adult!" );
        curIm = "Happy";
        PS.audioPlay( "fx_tada" );

        brushClicks = 0;
        foodClicks = 0;

        // PS.dbEvent( DB, "State", curIm );
        // PS.dbEvent( DB, "Age", age );
        // PS.dbEvent( DB, "clicks", total_clicks );
        // PS.dbSend( DB, USERS);
    }



    //Use the adult images if the bunny is an adult
    if(age == "Adult") {
        //Adult, if player is not clicking one of the buttons
        //If the image is sad, switch to normal
        if (curIm == "Sad") {
            PS.imageLoad("images/BunnyNormal1.bmp", myLoader);
            curIm = "Normal";
            // PS.dbEvent( DB, "State", curIm );
            countdown = 10;
        }
        //If the image is normal, switch to happy
        else if (curIm == "Normal") {
            PS.imageLoad("images/BunnyHappy1.bmp", myLoader);
            curIm = "Happy";
            // PS.dbEvent( DB, "State", curIm );
            countdown = 15;
        }
        //If the image is brush
        else if (curIm == "Brush") {
            //Switch to brush image 1
            if (brush == 1) {
                PS.imageLoad("images/BunnyBrush1.bmp", myLoader);
                brush = 2;
                PS.audioPlay("fx_swoosh");
                brushClicks += 1;

                //Switch to brush image 2
            } else {
                PS.imageLoad("images/BunnyBrush2.bmp", myLoader);
                brush = 1;
                PS.audioPlay("fx_swoosh");
                brushClicks += 1;

            }
        }
        //If the image is food
        else if (curIm == "Food") {
            //Switch to brush 1
            if (food == 1) {
                PS.imageLoad("images/BunnyFood1.bmp", myLoader);
                food = 2;
                PS.audioPlay("fx_squish");
                foodClicks += 1;
                // PS.debug( "one" + food);
            } else if (food == 2) {
                PS.imageLoad("images/BunnyFood2.bmp", myLoader);
                food = 3;
                PS.audioPlay("fx_squish");
                foodClicks += 1;
                // PS.debug( "two" + food);
            } else if (food == 3) {
                PS.imageLoad("images/BunnyFood3.bmp", myLoader);
                food = 4;
                PS.audioPlay("fx_squish");
                foodClicks += 1;
                // PS.debug( "three" + food);
            } else if (food == 4) {
                PS.imageLoad("images/BunnyFood4.bmp", myLoader);
                food = 5;
                PS.audioPlay("fx_squish");
                foodClicks += 1;
                // PS.debug( "four" + food);
            } else if (food == 5) {
                PS.imageLoad("images/BunnyFood5.bmp", myLoader);
                food = 1;
                PS.audioPlay("fx_squish");
                foodClicks += 1;
                // PS.debug( "five" + food);
            }
        }
        //If the image is Bath
        else if(curIm == "Bath"){
            //Switch to brush 1
            if(bath == 1){
                PS.imageLoad( "images/BunnyBath1.bmp", myLoader );
                bath = 2;
                PS.audioPlay( "fx_drip2" );
                bathClicks += 1;
                //Switch to brush 2
            }
            else if(bath == 2){
                PS.imageLoad( "images/BunnyBath2.bmp", myLoader );
                bath = 3;
                PS.audioPlay( "fx_drip2" );
                bathClicks += 1;
            }
            else if(bath == 3){
                PS.imageLoad( "images/BunnyBath3.bmp", myLoader );
                bath = 4;
                PS.audioPlay( "fx_drip2" );
                bathClicks += 1;
            }
            else if(bath == 4){
                PS.imageLoad( "images/BunnyBath4.bmp", myLoader );
                bath = 5;
                PS.audioPlay( "fx_drip2" );
                bathClicks += 1;
            }
            else if(bath == 5){
                PS.imageLoad( "images/BunnyBath5.bmp", myLoader );
                bath = 1;
                PS.audioPlay( "fx_drip2" );
                bathClicks += 1;
            }
        }
    }


    //Age is equal to baby
    else{
        //Baby, if player is not clicking one of the buttons
        //If the image is sad, switch to normal
         if(curIm == "Sad"){
            PS.imageLoad( "images/BabyBunnyNormal1.bmp", myLoader );
            curIm = "Normal";
            // PS.dbEvent( DB, "State", curIm );
            countdown = 10;
        }
        //If the image is normal, switch to happy
        else if(curIm == "Normal"){
            PS.imageLoad( "images/BabyBunnyHappy1.bmp", myLoader );
            curIm = "Happy";
            // PS.dbEvent( DB, "State", curIm );
            countdown = 15;
        }
        //If the image is brush
        else if(curIm == "Brush"){
            //Switch to brush 1
            if(brush == 1){
                PS.imageLoad( "images/BabyBunnyBrush1.bmp", myLoader );
                brush = 2;
                PS.audioPlay( "fx_swoosh" );
                brushClicks += 1;

            //Switch to brush 2
            }else{
                PS.imageLoad( "images/BabyBunnyBrush2.bmp", myLoader );
                brush = 1;
                PS.audioPlay( "fx_swoosh" );
                brushClicks += 1;
            }
        }
        //If the image is food
        else if(curIm == "Food"){
            //Switch to brush 1
            if(food == 1){
                PS.imageLoad( "images/BabyBunnyFood1.bmp", myLoader );
                food = 2;
                PS.audioPlay( "fx_squish" );
                foodClicks += 1;
                // PS.debug( "one" + food);
            }
            else if(food == 2){
                PS.imageLoad( "images/BabyBunnyFood2.bmp", myLoader );
                food = 3;
                PS.audioPlay( "fx_squish" );
                foodClicks += 1;
                // PS.debug( "two" + food);
            }
            else if(food == 3){
                PS.imageLoad( "images/BabyBunnyFood3.bmp", myLoader );
                food = 4;
                PS.audioPlay( "fx_squish" );
                foodClicks += 1;
                // PS.debug( "three" + food);
            }
            else if(food == 4){
                PS.imageLoad( "images/BabyBunnyFood4.bmp", myLoader );
                food = 5;
                PS.audioPlay( "fx_squish" );
                foodClicks += 1;
                // PS.debug( "four" + food);
            }else if(food == 5){
                PS.imageLoad( "images/BabyBunnyFood5.bmp", myLoader );
                food = 1;
                PS.audioPlay( "fx_squish" );
                foodClicks += 1;
                // PS.debug( "five" + food);
            }
        }
        //If the image is Bath
        else if(curIm == "Bath"){
            //Switch to brush 1
            if(bath == 1){
                PS.imageLoad( "images/BabyBunnyBath1.bmp", myLoader );
                bath = 2;
                PS.audioPlay( "fx_drip2" );
                bathClicks += 1;
                //Switch to brush 2
            }
            else if(bath == 2){
                PS.imageLoad( "images/BabyBunnyBath2.bmp", myLoader );
                bath = 3;
                PS.audioPlay( "fx_drip2" );
                bathClicks += 1;
            }
            else if(bath == 3){
                PS.imageLoad( "images/BabyBunnyBath3.bmp", myLoader );
                bath = 4;
                PS.audioPlay( "fx_drip2" );
                bathClicks += 1;
            }
            else if(bath == 4){
                PS.imageLoad( "images/BabyBunnyBath4.bmp", myLoader );
                bath = 5;
                PS.audioPlay( "fx_drip2" );
                bathClicks += 1;
            }
            else if(bath == 5){
                PS.imageLoad( "images/BabyBunnyBath5.bmp", myLoader );
                bath = 1;
                PS.audioPlay( "fx_drip2" );
                bathClicks += 1;
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


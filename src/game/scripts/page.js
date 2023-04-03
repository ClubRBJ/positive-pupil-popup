// ===================== Fall 2022 EECS 493 Assignment 3 =====================
// This starter code provides a structure and helper functions for implementing
// the game functionality. It is a suggestion meant to help you, and you are not
// required to use all parts of it. You can (and should) add additional functions
// as needed or change existing functions.

// ==================================================
// ============ Page Scoped Globals Here ============
// ==================================================

// Div Handlers
let game_window;
let game_screen;
let onScreenAsteroid;
let players_first_game = true;
let playerAlive = true;
let asteroidInterval;
let scoreInterval;
let playerInterval;
let spaceship;
let gameVolume = 50;

// Difficulty Helpers'
let difficulty = "normal";  
let astProjectileSpeed = 3;        // easy: 1, norm: 3, hard: 5
let astSpawnRate = 800;            // default: 800 for normal


// Game Timing Rates
let shield_spawn_rate = 15000;
let portal_spawn_rate = 20000;
let refresh_rate = 15;
let dissapear_rate = 5000;
let death_screen_rate = 2000;

// Game Object Helpers
let danger = 20;
let currentAsteroid = 1;
let AST_OBJECT_REFRESH_RATE = 15;
let maxPersonPosX = 1218;
let maxPersonPosY = 658;
let PERSON_SPEED = 5;                // Speed of the person
let vaccineOccurrence = 20000;       // Vaccine spawns every 20 seconds
let vaccineGone = 5000;              // Vaccine disappears in 5 seconds
let maskOccurrence = 15000;          // Masks spawn every 15 seconds
let maskGone = 5000;                 // Mask disappears in 5 seconds
let game_delay = 3000;    
let hasShield = false;           // Delay in miliseconds: 3000 = 3 seconds
let asteriod_speed_inc = 1.2;
let level_inc = 1;
let score_inc = 40;
let danger_inc = 2;

// Movement Helpers
var LEFT = false;
var RIGHT = false;
var UP = false;
var DOWN = false;
var touched = false;

// ==============================================
// ============ Functional Code Here ============
// ==============================================




// Main
$(document).ready(function () {
  // ====== Startup ====== 
  game_window = $('.game-window');
  game_screen = $("#actual_game");
  onScreenAsteroid = $('.curAstroid');
  onScreenPortal = $("#curPortal");
  onScreenShield = $("#curShield");
  onScreenPlayer = $("#curPlayer");
  rocket = $("#rocket_img");


  // Event Listeners
  document.getElementById('play_button').addEventListener("click", beginGame);
  document.getElementById('settings_menu').addEventListener("click", function() { 
    gameSettings(true);
  });
  document.getElementById('settings_close_button').addEventListener("click", function() { 
    gameSettings(false);
  });
  document.getElementById('tutorial_button').addEventListener("click", beginGame);
  document.getElementById('game_over_button').addEventListener("click", gameRestart);




  $("#slider").val(50); // set the default valume to 5
  $("#slider").on('input', function () {
    $(".vol_input").html("<b>Volume: </b>" + $(this).val()); 
    gameVolume = $(this).val();
  });

  // changes the selected difficulty level
  $(".difficulty").click(function() {
    let easy = $('#easy');
    let normal = $('#normal');
    let hard = $('#hard');
    easy.toggleClass('chosen_difficulty', $(this).is(easy));
    normal.toggleClass('chosen_difficulty', $(this).is(normal));
    hard.toggleClass('chosen_difficulty', $(this).is(hard));
    difficulty = $(this).attr('id'); // https://www.w3schools.com/jquery/html_attr.asp
  });
});

function beginGame() {
  $('#main_menu').hide();
  $('#tutorial').hide();
  $('.game-window').css({'background-image': 'unset'});

  if (players_first_game) {
    $('#tutorial').show();
    game_window.css({'background-color': 'gainsboro'});
    players_first_game = false;
  } else {
    splashScreen();
  }
}

function gameRestart() {
  // $('#main_menu').show();
  $('#main_buttons').show();
  $('#game_over_menu').hide();
}

function gameSettings(show) {
  if (show) {
    $('#settings').show();
  } 
  else $('#settings').hide();
}

function gameOver() {
  setTimeout(() => {
    rocket.attr("src", "src/player/player.gif");
    $('#actual_game').hide();
    $('#main_menu').show(); // shows the same main menu background as in the start
    $('#main_buttons').hide(); // hides the beginning menu buttons 
    $('.game-window').css({'background-image': 'url("./src/grass-still.png'}); 
    $('#game_over_menu').show(); // will display the end game message
    $('#final_score').html(score);
    $('#final_level').html(level);
  }, death_screen_rate);
}

function splashScreen() {
  score = 0;
  level = 1;

  switch (difficulty) { // sets the values given a selected difficulty. 
	case "easy":
		astProjectileSpeed = 1;
    astSpawnRate = 1000;
    danger = 10;
		break;
	case "normal":
		astProjectileSpeed = 3;
    astSpawnRate = 800;
    danger = 20;
		break;
	case "hard":
		astProjectileSpeed = 5;
    astSpawnRate = 600;
    danger = 30;
		break
	}

  // for the game sounds and their volume level
  $('audio')
		.each(function () {
			this.volume = $('#slider').val() / 100
		});

  $('#score_num').html(score);
	$('#danger_num').html(danger);
	$('#level_num').html(level);

  $('#actual_game').show(); // show actual_game HTML and CSS
  game_window.css({
		'background-color': 'white'
	});

  setTimeout(() => {
    $('#splash_screen').hide();
		startGame();
	}, game_delay);
}

function startGame() {
  asteroidInterval = setInterval(spawn, astSpawnRate);
  scoreInterval = setInterval(() => $('#score_num').html(score += 40), 500);
  playerInterval = setInterval(rocketMove, 15);
  portalInterval = setInterval(portalSpawn, portal_spawn_rate);
  shieldInterval = setInterval(shieldSpawn, shield_spawn_rate);
  asteroidCollisionInterval = setInterval(asteroidCollision, refresh_rate);
  
}

function portalSpawn() {
  onScreenPortal.html("<img class='game_object' src='src/sheep.png'/>");
  onScreenPortal.css('left', getRandomNumber(0, 1218));
  onScreenPortal.css('top', getRandomNumber(0, 658));

  // check if the player comes in contact with the portal
  portalCollisionInterval = setInterval(portalCollision, refresh_rate);

  setTimeout(() => {
    onScreenPortal.empty();
    clearInterval(portalCollisionInterval)
  }, dissapear_rate)
}

function portalCollision() {
  if (isColliding(rocket, onScreenPortal)) {
    var audio = new Audio('src/audio/collect.mp3');
    portalVol = parseFloat(gameVolume)/100;
    audio.volume  = portalVol;
    audio.play();
    clearInterval(portalCollisionInterval);
    onScreenPortal.empty();
    level += 1;
    astProjectileSpeed *= 1.2;
    danger += 2;
    $('#danger_num').html(danger);
    $('#level_num').html(level)
  }
}

function shieldSpawn() {
  onScreenShield.html("<img class='game_object' src='src/red_cape.png'/>");
  onScreenShield.css('left', getRandomNumber(0, 1218));
  onScreenShield.css('top', getRandomNumber(0, 658));

  shieldCollisiontInterval = setInterval(shieldCollision, refresh_rate);

  setTimeout(() => {
    onScreenShield.empty();
    clearInterval(shieldCollisiontInterval)
  }, dissapear_rate)
}

function shieldCollision() {
  if (isColliding(rocket, onScreenShield)) {
    var audio = new Audio('src/audio/collect.mp3');
    shieldVol = parseFloat(gameVolume)/100;
    audio.volume  = shieldVol;
    audio.play();
    clearInterval(shieldCollisiontInterval);
    onScreenShield.empty();
    hasShield = true
  }
}

function asteroidCollision() {
  // got the id from the asteroid class grabbing the asteroids children
  $('[id^=a-]').each(function () {
      if (isColliding(rocket, $(this))) {
        if (hasShield) {
          hasShield = false;
          $(this).remove()
        } else {
          endGame();
        }
      }
    })
}

// function is called when the player dies 
function endGame() {
  rocket.attr("src", "src/player/player_touched.gif");
  var audio = new Audio('src/audio/die.mp3');
  deathVol = parseFloat(gameVolume)/100;
  audio.volume  = deathVol;
  audio.play();
  clearInterval(shieldInterval);
  clearInterval(portalInterval);
  clearInterval(playerInterval);
  clearInterval(asteroidInterval);
  clearInterval(scoreInterval)
  $('[id^=a-]').each(function () {
      $(this).remove()
    })
  gameOver();
}

function rocketMove() {
  if (LEFT) {
    var newPosition = parseInt(rocket.css("left")) - PERSON_SPEED;

    if (newPosition < 0) {
      newPosition = 0;
    } 
    rocket.css("left", newPosition);

    if (hasShield) {
      rocket.attr("src", "src/player/cowboy_left_cape.png");
      
    } 
    else {
      rocket.attr("src", "src/player/cowboy_left.png");
    }
  }
  else if (UP) {
    var newPosition = parseInt(rocket.css("top")) - PERSON_SPEED;

    if (newPosition < 0) {
      newPosition = 0;
    } 
    rocket.css("top", newPosition);

    // if (hasShield) {
    //   rocket.attr("src","src/player/player_shielded_up.gif");
    // } 
    // else {
    //   rocket.attr("src", "src/player/player_up.gif");
    // }
  }
  else if (RIGHT) {
    var newPosition = parseInt(rocket.css("left")) + PERSON_SPEED;

    if (newPosition > 1218) {
      newPosition = 1218;
    } 
    rocket.css("left", newPosition);

    if (hasShield) {
      rocket.attr("src", "src/player/cowboy_right_cape.png");
    } 
    else {
      rocket.attr("src", "src/player/cowboy_right.png");
    }
  }
  else if (DOWN) {
    var newPosition = parseInt(rocket.css("top")) + PERSON_SPEED;

    if (newPosition > 658 ) {
      newPosition = 658;
    } 
    rocket.css("top", newPosition);

    // if (hasShield) {
    //   rocket.attr("src", "src/player/player_shielded_down.gif");
    // } 
    // else {
    //   rocket.attr("src", "src/player/player_down.gif");
    // }
  } 
  // else {
  //   if (hasShield) {
  //     rocket.attr("src", "src/player/cowboy_left_cape.png");
  //   } 
  //   rocket.attr("src", "src/player/cowboy_left.png");
  // }

}

// Keydown event handler
document.onkeydown = function (e) {
  if (e.key == 'ArrowLeft') LEFT = true;
  if (e.key == 'ArrowRight') RIGHT = true;
  if (e.key == 'ArrowUp') UP = true;
  if (e.key == 'ArrowDown') DOWN = true;
}

// Keyup event handler
document.onkeyup = function (e) {
  if (e.key == 'ArrowLeft') LEFT = false;
  if (e.key == 'ArrowRight') RIGHT = false;
  if (e.key == 'ArrowUp') UP = false;
  if (e.key == 'ArrowDown') DOWN = false;
}

// Starter Code for randomly generating and moving an asteroid on screenonScreenPlayer
// Feel free to use and add additional methods to this class
class Asteroid {
  // constructs an Asteroid object
  constructor() {
      /*------------------------Public Member Variables------------------------*/
      // create a new Asteroid div and append it to DOM so it can be modified later
      // let objectString = "<div id = 'a-" + currentAsteroid + "' class = 'curAstroid' > <img src = 'src/asteroid.png'/></div>";
      // onScreenAsteroid.append(objectString);

      let imageSource = Math.random() < 0.5 ? "src/running-bull-left.png" : "src/running-bull-right.png";
      let objectString = "<div id='a-" + currentAsteroid + "'class = 'curAstroid' '><img src ='" + imageSource + "'/></div>";
      onScreenAsteroid.append(objectString);

      // select id of this Asteroid
      this.id = $('#a-' + currentAsteroid);
      currentAsteroid++; // ensure each Asteroid has its own id
      // current x, y position of this Asteroid
      this.cur_x = 0; // number of pixels from right
      this.cur_y = 0; // number of pixels from top

      /*------------------------Private Member Variables------------------------*/
      // member variables for how to move the Asteroid
      this.x_dest = 0;
      this.y_dest = 0;
      // member variables indicating when the Asteroid has reached the boarder
      this.hide_axis = 'x';
      this.hide_after = 0;
      this.sign_of_switch = 'neg';
      // spawn an Asteroid at a random location on a random side of the board
      this.#spawnAsteroid();
  }

  // Requires: called by the user
  // Modifies:
  // Effects: return true if current Asteroid has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
      if(this.hide_axis == 'x'){
          if(this.sign_of_switch == 'pos'){
              if(this.cur_x > this.hide_after){
                  return true;
              }                    
          }
          else{
              if(this.cur_x < this.hide_after){
                  return true;
              }          
          }
      }
      else {
          if(this.sign_of_switch == 'pos'){
              if(this.cur_y > this.hide_after){
                  return true;
              }                    
          }
          else{
              if(this.cur_y < this.hide_after){
                  return true;
              }          
          }
      }
      return false;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Asteroid 1 unit in its designated direction
  updatePosition() {
      // ensures all asteroids travel at current level's speed
      this.cur_y += this.y_dest * astProjectileSpeed;
      this.cur_x += this.x_dest * astProjectileSpeed;
      // update asteroid's css position
      this.id.css('top', this.cur_y);
      this.id.css('right', this.cur_x);
  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Asteroid
  //          all asteroids travel at the same speed
  #spawnAsteroid() {
      // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS
      let x = getRandomNumber(0, 1280);
      let y = getRandomNumber(0, 720);
      let floor = 784;
      let ceiling = -64;
      let left = 1344;
      let right = -64;
      let major_axis = Math.floor(getRandomNumber(0, 2));
      let minor_aix =  Math.floor(getRandomNumber(0, 2));
      let num_ticks;

      if(major_axis == 0 && minor_aix == 0){
          this.cur_y = floor;
          this.cur_x = x;
          let bottomOfScreen = game_screen.height();
          num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

          this.x_dest = (game_screen.width() - x);
          this.x_dest = (this.x_dest - x)/num_ticks + getRandomNumber(-.5,.5);
          this.y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
          this.hide_axis = 'y';
          this.hide_after = -64;
          this.sign_of_switch = 'neg';
      }
      if(major_axis == 0 && minor_aix == 1){
          this.cur_y = ceiling;
          this.cur_x = x;
          let bottomOfScreen = game_screen.height();
          num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

          this.x_dest = (game_screen.width() - x);
          this.x_dest = (this.x_dest - x)/num_ticks + getRandomNumber(-.5,.5);
          this.y_dest = astProjectileSpeed + getRandomNumber(0, .5);
          this.hide_axis = 'y';
          this.hide_after = 784;
          this.sign_of_switch = 'pos';
      }
      if(major_axis == 1 && minor_aix == 0) {
          this.cur_y = y;
          this.cur_x = left;
          let bottomOfScreen = game_screen.width();
          num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

          this.x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
          this.y_dest = (game_screen.height() - y);
          this.y_dest = (this.y_dest - y)/num_ticks + getRandomNumber(-.5,.5);
          this.hide_axis = 'x';
          this.hide_after = -64;
          this.sign_of_switch = 'neg';
      }
      if(major_axis == 1 && minor_aix == 1){
          this.cur_y = y;
          this.cur_x = right;
          let bottomOfScreen = game_screen.width();
          num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

          this.x_dest = astProjectileSpeed + getRandomNumber(0, .5);
          this.y_dest = (game_screen.height() - y);
          this.y_dest = (this.y_dest - y)/num_ticks + getRandomNumber(-.5,.5);
          this.hide_axis = 'x';
          this.hide_after = 1344;
          this.sign_of_switch = 'pos';
      }
      // show this Asteroid's initial position on screen
      this.id.css("top", this.cur_y);
      this.id.css("right", this.cur_x);
      // normalize the speed s.t. all Asteroids travel at the same speed
      let speed = Math.sqrt((this.x_dest)*(this.x_dest) + (this.y_dest)*(this.y_dest));
      this.x_dest = this.x_dest / speed;
      this.y_dest = this.y_dest / speed;
  }
}

// Spawns an asteroid travelling from one border to another
function spawn() {
  let asteroid = new Asteroid();
  setTimeout(spawn_helper(asteroid), 0);
}

function spawn_helper(asteroid) {
  let astermovement = setInterval(function () {
    // update asteroid position on screen
    asteroid.updatePosition();

    // determine whether asteroid has reached its end position, i.e., outside the game border
    if (asteroid.hasReachedEnd()) {
      asteroid.id.remove();
      clearInterval(astermovement);
    }
  }, AST_OBJECT_REFRESH_RATE);
}

//===================================================

// ==============================================
// =========== Utility Functions Here ===========
// ==============================================

// Are two elements currently colliding?
function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}

// Will two elements collide soon?
// Input: Two elements, upcoming change in position for the moving element
function willCollide(o1, o2, o1_xChange, o1_yChange) {
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

// Are two elements colliding or will they collide soon?
// Input: Two elements, upcoming change in position for the moving element
// Use example: isOrWillCollide(paradeFloat2, person, FLOAT_SPEED, 0)
function isOrWillCollide(o1, o2, o1_xChange, o1_yChange) {
  const o1D = {
    'left': o1.offset().left + o1_xChange,
    'right': o1.offset().left + o1.width() + o1_xChange,
    'top': o1.offset().top + o1_yChange,
    'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = {
    'left': o2.offset().left,
    'right': o2.offset().left + o2.width(),
    'top': o2.offset().top,
    'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
    // collision detected!
    return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}

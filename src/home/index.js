// Define global variables
const PLAY_GAME_BUTTON = 'play-game';
const ACTIVITY_BUTTON = 'activity';

/**
 * This function disables the "play game" and "activity" buttons
 * and changes their background color to gray.
 */
function disableButtons() {
    const playGameButton = document.getElementById(PLAY_GAME_BUTTON);
    playGameButton.setAttribute('disabled', 'disabled');
    playGameButton.style.backgroundColor = '#808080';
    const activityButton = document.getElementById(ACTIVITY_BUTTON);
    activityButton.setAttribute('disabled', 'disabled');
    activityButton.style.backgroundColor = '#808080';
}

/**
 * This function is called when the "play game" button is clicked.
 * It opens the game in a new window and disables the buttons.
 */
function playGame() {
    // Open the game in a new window.
    let openWindow = window.open("../game/index.html", "mywindow","location=1,toolbar=1,menubar=1,resizable=1,width=1500,height=1000");
    
    // Disable the "play game" and "activity" buttons.
    disableButtons();

    setTimeout(() => {
        openWindow.close();
    }, 5000);
}

/**
 * This function is called when the "activity" button is clicked.
 * It opens the "bored" API in a new window and disables the uttons.
 */
function showBoredAPI() {
    // Open the "bored" API in a new window.
    let openWindow = window.open("../bored-api/index.html", "mywindow","location=1,toolbar=1,menubar=1,resizable=1,width=1000,height=250");
    // Disable the "play game" and "activity" buttons.
    disableButtons();

    setTimeout(() => {
        openWindow.close();
    }, 5000);
}

// Add event listeners to the "play game" and "activity" buttons.
document.getElementById(PLAY_GAME_BUTTON).addEventListener("click", playGame);
document.getElementById(ACTIVITY_BUTTON).addEventListener("click", showBoredAPI);

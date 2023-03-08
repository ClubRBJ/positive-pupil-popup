/**
 * The `submitDate` variable holds the date and time that the assignment was submitted.
 * The `dueDate` variable holds the date and time that the assignment is due.
 * The `curTime` variable holds the current date and time.
 * The `isSubmitted` variable holds a boolean value indicating whether the assignment has been submitted.
 */
let submitDate;
let dueDate;
let curTime;
let isSubmitted = false;

/**
 * Set this to `true` to enable console logs for debugging purposes.
 */
const DEBUG_MODE = false;

/**
 * This function is called every 3 seconds to update the values of `submitDate`, `dueDate`,
 * `curTime`, and `isSubmitted` based on the current HTML elements on the page.
 */
setInterval(() => {
    // Get the time elements from the HTML.
    const timeElements = document.getElementsByTagName('time');
    
    // Set the `dueDate` variable to the value of the first time element.
    dueDate = timeElements[0].attributes.datetime.nodeValue;
    if (DEBUG_MODE) console.log("Due Date: ", dueDate);

    // Set the `submitDate` variable to the value of the second time element.
    submitDate = timeElements[1].attributes.datetime.nodeValue;
    if (DEBUG_MODE) console.log("Submit Date: ", submitDate);

    // Set the `isSubmitted` variable to `true` if the second time element's inner text starts with "Submitted".
    isSubmitted = (timeElements[1].firstChild.innerText.startsWith('Submitted'));
    
    // Set the `curTime` variable to the current date and time.
    curTime = new Date().toISOString();
    if (DEBUG_MODE) console.log("Current Time and Date: ", curTime);
}, 3000);



setInterval(() => {
    // Automatic popup handling
    isSubmitted = (isSubmitted === "S");
    console.log("Boolean Submitted ", isSubmitted);

    // first thing to fix is get the popup to activate once isSubmitted is true

    if (isSubmitted) {
        // Send a message to the background script to open the popup
        chrome.runtime.sendMessage({action: "openPopup"});
    }


}, 5000);


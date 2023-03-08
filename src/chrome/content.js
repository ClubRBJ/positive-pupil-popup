

// /**
//  * Set this to `true` to enable console logs for debugging purposes.
//  */
 const DEBUG_MODE = false;


SHOWING_POPUP = false;

/**
 *  This function will determine if a valid submit occured
 */
function validSubmit() {

    // Get the time elements from the HTML.
    const timeElements = document.getElementsByTagName('time');
    
    // Due date
    const dueDate = timeElements[0].attributes.datetime.nodeValue;
    if (DEBUG_MODE) console.log("Due Date: ", dueDate);
    // Submit date
    const submitDate = timeElements[1].attributes.datetime.nodeValue;
    if (DEBUG_MODE) console.log("Submit Date: ", submitDate);
    // Current time
    const curTime = new Date().toISOString();
    if (DEBUG_MODE) console.log("Current Time and Date: ", curTime);


    // Determine if the assignment was submitted after the due date
    isSubmitted = timeElements[1].firstChild.innerText[0] === "S";
    
    // TODO: more checks to determine if a valid submit occured

    // Return the boolean value of `isSubmitted`
    return isSubmitted;
};


setInterval(() => {
    // Automatic popup handling

    // Check if the assignment was submitted
    const isSubmitted = validSubmit();


    console.log("Boolean Submitted ", isSubmitted);

    // first thing to fix is get the popup to activate once isSubmitted is true

    if (isSubmitted) {
        // Send a message to the background script to open the popup
        chrome.runtime.sendMessage({action: "openPopup"});
        // Catch and log the error if the popup fails to open
        if (SHOWING_POPUP === true) {
            return;
        }
        try {
            (async () => {
                const response = await chrome.runtime.sendMessage({data: "openTab"});
                // do something with response here, not outside the function
                console.log(response);
                SHOWING_POPUP = true;
            })();
        } catch (error) {
            console.error('Failed to open popup:', error);
        }
    }


}, 5000);


// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ?
//                     "from a content script:" + sender.tab.url :
//                     "from the Helloextension");
//         // if request.data is not null, log it
//         if (request.data) {
//             console.log(request.data);
//         }
//     }
// );

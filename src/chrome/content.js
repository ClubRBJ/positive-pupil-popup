

// /**
//  * Set this to `true` to enable console logs for debugging purposes.
//  */
 const DEBUG_MODE = true;


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
    // this should be in a try block
    const submitDate = new Date(timeElements[1].attributes.datetime.nodeValue);

    if (DEBUG_MODE) console.log("Submit Date: ", submitDate);
    // Current time
    const curTime = new Date();
    if (DEBUG_MODE) console.log("Current Time and Date: ", curTime.toISOString());


    // Determine if the assignment was submitted after the due date
    let willOpen = timeElements[1].firstChild.innerText[0] === "S";
    
    // TODO: more checks to determine if a valid submit occured

    // calculate the time conversion. Will open if the current time - submission time == 5 minutes (300000 milliseconds)
    // curTime =  2023-03-10T20:57:42.596Z
    // submmitTime = 2023-03-10T20:53:16.000Z
    const timeDifference = curTime - submitDate;
    if (DEBUG_MODE) console.log('Time difference: ', timeDifference);

    if (willOpen && timeDifference > 300000) {
        if (DEBUG_MODE) console.log('The time difference is more than 5 minutes.');
        willOpen = false;
    } else {
        if (DEBUG_MODE) console.log('The time difference is less than 5 minutes.');
    }

    // Return the boolean value of `willOpen`
    return willOpen;
};


setInterval(() => {
    // Automatic popup handling

    // Check if the assignment was submitted
    const willOpen = validSubmit();


    console.log("Boolean Submitted ", willOpen);

    // first thing to fix is get the popup to activate once willOpen is true

    if (willOpen) {
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

            setTimeout(() => {
                (async () => {
                    const response = await chrome.runtime.sendMessage({data: "closeTab"});
                    // do something with response here, not outside the function
                    console.log(response);
                })();
            }, 10000);


        } catch (error) {
            console.error('Failed to open popup:', error);
        }
    }


}, 1000);


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

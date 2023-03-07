let submitDate;
let dueDate;
let curTime;
let boolSubmit = false;

setInterval(() => {
    const timeElement = document.getElementsByTagName('time');
    console.log("Time Data Array", timeElement);

    dueDate = timeElement[0].attributes.datetime.nodeValue;
    console.log("Due Date: ", dueDate);

    submitDate = timeElement[1].attributes.datetime.nodeValue;
    console.log("Submit Date: ", submitDate);

    boolSubmit = timeElement[1].firstChild.innerText[0];

    curTime = new Date();
    curTime = curTime.toISOString();
    console.log("Current Time and Date: ", curTime);
}, 3000);


setInterval(() => {
    // Automatic popup handling
    boolSubmit = (boolSubmit === "S");
    console.log("Boolean Submitted ", boolSubmit);

    // first thing to fix is get the popup to activate once boolSubmit is true

    if (boolSubmit) {
        // Send a message to the background script to open the popup
        chrome.runtime.sendMessage({action: "openPopup"});
    }


}, 5000);


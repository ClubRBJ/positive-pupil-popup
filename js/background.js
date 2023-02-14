chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        file: 'button.js'
    });
    chrome.tabs.insertCSS({
        file: 'button.css'
    });
    chrome.tabs.executeScript({
        code: "document.body.insertAdjacentHTML('beforeend', '<div id=\"change-text\">hi</div>');"
    });
});
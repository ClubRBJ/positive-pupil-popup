


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    
    if (request.data === "openTab") {
      const url = chrome.runtime.getURL('src/home/index.html');
      chrome.tabs.create({url: url});
      sendResponse({data: 'created tab'});
    }
    if (request.data === "closeTab") {
      chrome.tabs.getCurrent(function(tab) {
        chrome.tabs.remove(tab.id, function() { });
      });
      // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      //   var currTab = tabs[0];
      //   if (currTab)  // Sanity check
      //     chrome.tabs.
      //  
      // });
    }
    else {
      sendResponse({request});
    }
  }
);


// function sendMessageToContentScript() {
//   (async () => {
//     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//     const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
//     // do something with response here, not outside the function
//     console.log(response);
//   })();
// }

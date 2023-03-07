chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("Message received: ", message);
    if (message.action === "openPopup") {
      chrome.action.openPopup();
      sendResponse({ message: "Popup opened" });
    }
  });
  
  
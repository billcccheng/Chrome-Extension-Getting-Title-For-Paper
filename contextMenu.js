chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var text = request.source;
    if(text != 'not found')
      copyToClipBoard(request.source); //This is where we show the message
    else
      alert("Error");
  }
});

function run() {
  var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "CopyNote";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
  run();
};

// function copyToClipBoard(text) {
//   prompt("Copy to clipboard:\n"+text);
//   copied = text.createTextRange();
//   copied.execCommand("Copy");
// }

function copyToClipBoard(text) {
  prompt("Ctrl+C or Cmd+C to Copy\n"+text, text)
}
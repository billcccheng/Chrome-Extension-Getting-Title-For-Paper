// chrome.runtime.onMessage.addListener(function(request, sender) {
//   if (request.action == "getSourced") {
//     text = request.source; //This is where we show the message
//     message.innerText = text;
//   }
// });

function runPlugin() {
  var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
     alert('There was an error injecting script : \n' + chrome.runtime.lastError.message);
    }
  });

}

window.onload = runPlugin();
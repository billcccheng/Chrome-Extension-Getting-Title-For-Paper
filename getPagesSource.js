// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);
////$('meta[name=citation_doi]').attr("content");
function DOMtoString(document_root) {
    var metas = document_root.getElementsByTagName('meta'); 

    for (var i=0; i<metas.length; i++) { 
      if (metas[i].getAttribute("name") == "citation_title") {
          var selected_text = getSelectionText() 
          return selected_text+'\n['+metas[i].getAttribute("content")+']'; 
      } 
    }
    return "not found";
}
function getSelectionText(){
    var selectedText = ""
    if (window.getSelection){ // all modern browsers and IE9+
        selectedText = window.getSelection().toString()
    }
    return selectedText;
}

document.addEventListener('mouseup', function(){
    var thetext = getSelectionText()
    if (thetext.length > 0){ // check there's some text selected
        console.log(thetext) // logs whatever textual content the user has selected on the page
    }
}, false)

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
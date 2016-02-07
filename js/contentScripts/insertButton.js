
var propertyList = document.getElementById('rowForcustomfield_15002'),
    clientName,
    button = document.createElement("button"),
    text = document.createTextNode("Get client info");

    /*Set the id attribute of the button so we can reference it with a click
      event handler*/
    button.setAttribute('id', 'getClientInfo');
    button.appendChild(text);
    propertyList.appendChild(button);


var injectedButton = jQuery('button#getClientInfo');

/* listen for clicks on injectedButton. When clicked, scrape content and store in clientName */
injectedButton.click(function() {
  //Scrape the client name off of the Jira ticket page
  clientName = jQuery('div#customfield_15002-val').text().trim();
  //Send the message with the scraped content to background.js
  chrome.runtime.sendMessage(
  {
    type: 'getClientInfo',
    client: clientName
  }, function(response){
    /* Receive response from background.js with client information stored in response object as a property
       called html with the value statusHTML, which includes all the built up content from the API call */
      injectedButton.append(response.html);
      return true;
  } //End callback function of sendMessage()
) //End chrome.runtime.sendMessage()
}); //End click handler



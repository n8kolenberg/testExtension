/*
    background.js
*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    /* Once the button is clicked, insertButton.js sends a message object 
       with the clientName as a value of the client property which will 
       be used in the getClientInfo() function*/
    if (request.type == 'getClientInfo') {
      getClientInfo(request, sender, sendResponse);
     } //End if statement
      
      /*Declare getClientInfo function that uses Ajax to get information from client
        and stores it in statusHTML variable, which is sent back to insertButton.js 
        as part of the response object */
    function getClientInfo() {
      jQuery.ajax({
        url: "https://frdcdltsdev001/tools/watson/ajax_wiz.php?w=getinfo&q=" + request.client, //request object coming from inject.js with client value being clientName
        dataType: "JSON",
        type: "GET"
        })
        .done(function(response){
          console.log(response);
          var statusHTML = "<ul>";
          if(response) {
            jQuery.each(response.value, function(i, value) {
              /* -->> This is where we'll build up the information
              of the client, which will be displayed <<-- */
              statusHTML += "<li>Client Name: "+ value.advertisername +"</li>";
              statusHTML += "<li>Client ID: "+ value.advertiserid +"</li>";
              statusHTML += "<li>Partner Name: "+ value.partnername +"</li>";
              statusHTML += "<li>Partner ID: "+ value.partnerid +"</li>";
              statusHTML += "<li>Live: "+ value.live +"</li>";
              statusHTML += "<li>URL: "+ value.url +"</li>";
            }); //End $.each()
            statusHTML += "</ul>";
            console.log(statusHTML);
          } else {
            statusHTML += "<li>Woops! Looks like we couldn't find this advertiser</li>";
            statusHTML += "</ul>";
            console.log(statusHTML);
          }//End if statement
          //This is where we send statusHTML back to insertButton.js
          sendResponse({html: statusHTML});
        }); //End done and ajax call
      }; // end getClientInfo() function declaration
      return true;

  }//End chrome.runtime.onMessage.addListener callback function

); //End chrome.runtime.onMessage.addListener

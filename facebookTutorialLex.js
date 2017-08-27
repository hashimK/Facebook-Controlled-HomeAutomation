var https = require('https');
'use strict';
var options = {
  "host": "facebooktutorial-6e2fa.firebaseio.com",
  "path": "/.json",
  "method": "PATCH",
  "headers": { 
    "Content-Type" : "application/json",
  }
}
     
    // Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
    function close(sessionAttributes, fulfillmentState, message) {
        return {
            sessionAttributes,
            dialogAction: {
                type: 'Close',
                fulfillmentState,
                message,
            },
        };
    }
     
    // --------------- Events -----------------------
     
    function dispatch(intentRequest, callback) {
        console.log('request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}');
        const sessionAttributes = intentRequest.sessionAttributes;
        var body = "";

        if(intentRequest.currentIntent.name==="LightOn")
        {
            body = JSON.stringify({
                                        light: "on"
                                        });
             https.request(options, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                const speech="Light switched on"
                callback(close(sessionAttributes, 'Fulfilled',
        {'contentType': 'PlainText', 'content':  speech }));
                
                })
            }).end(body);
        }
        else if(intentRequest.currentIntent.name==="FanOn")
        {
             body = JSON.stringify({
                                        fan: "on"
                                        });
             https.request(options, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                const speech="Fan switched on"
                callback(close(sessionAttributes, 'Fulfilled',
        {'contentType': 'PlainText', 'content':  speech }));
                
                })
            }).end(body);
        }
         else if(intentRequest.currentIntent.name==="FanOff")
        {
            body = JSON.stringify({
                                        fan: "off"
                                        });
             https.request(options, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                const speech="Fan switched off"
                callback(close(sessionAttributes, 'Fulfilled',
        {'contentType': 'PlainText', 'content':  speech }));
                
                })
            }).end(body);
        }   
        else if(intentRequest.currentIntent.name==="LightOff")
        {
            body = JSON.stringify({
                                        light: "off"
                                        });
             https.request(options, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                const speech="Light switched off"
                callback(close(sessionAttributes, 'Fulfilled',
        {'contentType': 'PlainText', 'content':  speech }));
                
                })
            }).end(body);
        }              
  }
     
    // --------------- Main handler -----------------------
     
    // Route the incoming request based on intent.
    // The JSON body of the request is provided in the event slot.
    exports.handler = (event, context, callback) => {
        try {
            dispatch(event,
                (response) => {
                    callback(null, response);
                });
        } catch (err) {
            callback(err);
        }
    };
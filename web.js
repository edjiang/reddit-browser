// TWILIO AUTH
// Create a module here '/ignore_secrets/twilio_auth.js' (this directory will be ignored by git)
// Add this script to that file:
// var twilio_auth = {
// 	TWILIO_ACCOUNT_SID: "YOUR_TWILIO_ACCOUNT_SID",
// 	TWILIO_AUTH_TOKEN: "YOUR_TWILIO_AUTH_TOKEN"
// };
// module.exports.twilio_account_sid = function () {
//   return twilio_auth.TWILIO_ACCOUNT_SID
// };
// module.exports.twilio_auth_token = function () {
//   return twilio_auth.TWILIO_AUTH_TOKEN
// };
// 
// Replace with your Twilio account SID and auth token
// 
var client = require('twilio')( (require('./ignore_secrets/twilio_auth.js').twilio_account_sid()) , (require('./ignore_secrets/twilio_auth.js').twilio_auth_token()) );



var express = require('express');
var app = express();
var restler = require('restler');


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.all('/', function(request, response) {
    restler.get('http://reddit.com/.json').on('complete', function(reddit) {
        var titles = "<Response><Sms>Top Five Reddit Posts:</Sms> ",j = 1;
        for(var i=0; i<5; i++) {
            titles += "<Sms> • “" + reddit.data.children[i].data.title + "” (http://reddit.com" + reddit.data.children[i].data.permalink + ") </Sms>";
            j++
        }
        titles += "</Response>";
        response.send(titles);
    });
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})

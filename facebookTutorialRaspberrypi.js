var five = require("johnny-five");
var Raspi = require("raspi-io");
var firebase = require("firebase");
var light="";
var fan="";
var board = new five.Board({
  io: new Raspi()
});
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCIxxxxxxxxxxxxxxxxx-XX",
    authDomain: "facebooktutorial-6e2fa.firebaseapp.com",
    databaseURL: "https://facebooktutorial-6e2fa.firebaseio.com",
    projectId: "facebooktutorial-6e2fa",
    storageBucket: "facebooktutorial-6e2fa.appspot.com",
    messagingSenderId: "241866206835"
  };
firebase.initializeApp(config);

board.on("ready", function() {
  var lightButton = new five.Button("P1-35");
  var lightRelay = new five.Led("P1-36");
  var fanButton = new five.Button("P1-37");
  var fanRelay = new five.Led("P1-38");
lightButton.on("press",function(){
if(light==="off")
{
light="on";
lightRelay.on();
firebase.database().ref().child('light').set("on");
}
else if(light==="on")
{
light="off";
lightRelay.off();
firebase.database().ref().child('light').set("off");
}
console.log(light);
})
lightButton.on("release",function(){
if(light==="off")
{
light="on";
lightRelay.on();
firebase.database().ref().child('light').set("on");
}
else if(light==="on")
{
light="off";
lightRelay.off();
firebase.database().ref().child('light').set("off");
}
console.log(light);
})

fanButton.on("press",function(){
if(fan==="off")
{
fan="on";
fanRelay.on();
firebase.database().ref().child('fan').set("on");
}
else if(fan==="on")
{
fan="off";
fanRelay.off();
firebase.database().ref().child('fan').set("off");
}
console.log(fan);
})
fanButton.on("release",function(){
if(fan==="off")
{
fan="on";
fanRelay.on();
firebase.database().ref().child('fan').set("on");
}
else if(fan==="on")
{
fan="off";
fanRelay.off();
firebase.database().ref().child('fan').set("off");
}
console.log(fan);
})

var dbRef=firebase.database().ref();
  dbRef.on('value',function (snap) {
    light=snap.val().light;
if(light==="off")
{
lightRelay.off();
}
else
{
lightRelay.on();
}
  });
var dbRef2=firebase.database().ref();
  dbRef2.on('value',function (snap) {
    fan=snap.val().fan;
if(fan==="off")
{
fanRelay.off();
}
else
{
fanRelay.on();
}
  });
});

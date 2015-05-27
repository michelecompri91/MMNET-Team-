// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){}; 

Alloy.Collections.question = Alloy.createCollection("question");
Alloy.Collections.answer = Alloy.createCollection("answer");

Alloy.Globals.URL_QUESTION = "http://smartsociety.u-hopper.com/task/ask";
Alloy.Globals.URL_REFRESH = "http://smartsociety.u-hopper.com/task/ask?device_id=" + Titanium.Platform.id;
Alloy.Globals.devId = Titanium.Platform.id;
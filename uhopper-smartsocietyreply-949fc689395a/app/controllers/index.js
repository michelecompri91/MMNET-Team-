exports.baseController = "base";

var gcm = require('net.iamyellow.gcmjs');

var pendingData = gcm.data;
if (pendingData && pendingData !== null) {
	// if we're here is because user has clicked on the notification
	// and we set extras for the intent 
	// and the app WAS NOT running
	// (don't worry, we'll see more of this later)
	Ti.API.info('******* data (started) ' + JSON.stringify(pendingData));
}

gcm.registerForPushNotifications({
	success: function (ev) {
		// on successful registration
		Ti.API.info('******* success, ' + ev.deviceToken);
	},
	error: function (ev) {
		// when an error occurs
		Ti.API.info('******* error, ' + ev.error);
	},
	callback: function () {
		// when a gcm notification is received WHEN the app IS IN FOREGROUND
		alert('hellow yellow!');
	},
	unregister: function (ev) {
		// on unregister 
		Ti.API.info('******* unregister, ' + ev.deviceToken);
	},
	data: function (data) {
		// if we're here is because user has clicked on the notification
		// and we set extras in the intent 
		// and the app WAS RUNNING (=> RESUMED)
		// (again don't worry, we'll see more of this later)
		Ti.API.info('******* data (resumed) ' + JSON.stringify(data));
	}
});

// in order to unregister:
// require('net.iamyellow.gcmjs').unregister();


function doClick(e) {
    alert($.label.text);
}

$.v_action_bar.getView('v_action_bar').addEventListener('onButtonClick', function(data){ 
	// alert(data.id);
	openWindow(Alloy.createController('settings').getView());
});


$.v_footer.getView('v_footer').addEventListener('onButtonClick', function(data){ 
	scrollToTheWriteView(data.id);
});

$.b_event.addEventListener("updateTab", function(data){ 
	$.v_footer.getView('v_footer').fireEvent('setActiveButton', {"id": data.id});
	scrollToTheWriteView(data.id);
});



$.index.addEventListener('open', function(e){
	Ti.API.info("INDEX OPEN EVENT"); 
	setIndexObj($.b_event);
	registerForNotification(); 
	// checkForPendingIntent();
});



function scrollToTheWriteView(id){
	if(id === "b_accepted_questions"){
		$.sv.scrollToView(1);
	}else if(id === "b_questions"){
		$.sv.scrollToView(0);
	}else if(id === "b_history"){
		$.sv.scrollToView(2);
	}
}

function setIndexObj(obj){
	$.ls_questions.getView().fireEvent('setIndexObj', {"obj": obj});
	$.ls_accepted_questions.getView().fireEvent('setIndexObj', {"obj": obj});
	$.ls_history.getView().fireEvent('setIndexObj', {"obj": obj});
}

function checkForPendingIntent(){
	var platformTools = require('bencoding.android.tools').createPlatform();
	var isInForeground = platformTools.isInForeground();
	if(isInForeground){
		Ti.API.info("CHECK INTENT");
		var activity = Ti.Android.currentActivity;
		var intent = activity.intent;
		Ti.API.info(JSON.stringify(intent));
		
		if (intent.hasExtra('ntfId')) {
			Ti.API.info("*******found ntfID");
			// alert("found " + intent.getIntgExtra());
		}
		if (intent.hasExtra('payload')) { 
			Ti.API.info("*******found " + intent.getStringExtra('payload'));
			dbHelper.addQuestion(intent.getStringExtra('payload'));
		}
	}
}

function registerForNotification(){
	var gcm = require('net.iamyellow.gcmjs');
	var dbHelper = require('dbHelper');
	
	var pendingData = gcm.data;
	if (pendingData && pendingData !== null) {
		// if we're here is because user has clicked on the notification
		// and we set extras for the intent 
		// and the app WAS NOT running 
		Ti.API.info('******* data (started) ' + JSON.stringify(pendingData));
		// dbHelper.addQuestion(pendingData.payload);
	}
	
	gcm.registerForPushNotifications({
		success: function (ev) {  
			Alloy.Globals.gcm = ev.deviceToken;
			Ti.API.info('******* success, ' + ev.deviceToken);
		},
		error: function (ev) { 
			Ti.API.info('******* error, ' + ev.error);
		},
		callback: function (data) { 
			// alert(JSON.stringify(data));
			dbHelper.addQuestion(data.message);
			// Ti.API.info(data);
			// Ti.API.info(JSON.stringify(data.message));
		},
		unregister: function (ev) { 
			Ti.API.info('******* unregister, ' + ev.deviceToken);
		},
		data: function (data) {
			// if we're here is because user has clicked on the notification
			// and we set extras in the intent 
			// and the app WAS RUNNING (=> RESUMED) 
			Ti.API.info('******* data (resumed) ' + JSON.stringify(data));
			dbHelper.addQuestion(data.payload);
			// alert(data.payload);
		}
	});
	
	
	
}
 


$.index.open();

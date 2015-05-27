Alloy.Globals.openWindows = [];

openWindow = function(win, animate){ 
	var last_win_id = Alloy.Globals.openWindows[Alloy.Globals.openWindows.length-1];
	Ti.API.info(win.id + "   " + last_win_id);
	if(last_win_id === win.id){
		Ti.API.info(" ###########################################################");
		Ti.API.info(" ######## This window is already open, nothing to do! ######");
		Ti.API.info(" ###########################################################"); 
	}
	else{
		win.open({animated:false});
		Alloy.Globals.openWindows.push(win.id);
	} 
	
	win.addEventListener('close', function(){
		Ti.API.info('Got close event for window ' );
		Alloy.Globals.openWindows.pop();
	});
};

close = function(win){
	win.close({animated: false});
};



online = function(){
	return Titanium.Network.online;
};

formatDate = function(timestamp){
	var date = new Date(parseFloat(timestamp));
	var monthDict = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	return ( date.getDate() + " " + 
			monthDict[date.getMonth()+1] + " " + 
			date.getFullYear() + "   " + 
			date.getHours() + ":" +
			date.getMinutes() ) ;
};
 

destroyDbAccess= function(){
	$.destroy();
};


showToast = function(msg){
	var toast = Ti.UI.createNotification({
	    message: msg,
	    duration: Ti.UI.NOTIFICATION_DURATION_LONG
	});
	toast.show();
};

Alloy.Globals.openWindows = [];

openWindow = function(win, animate){ 
	var last_win_id = Alloy.Globals.openWindows[Alloy.Globals.openWindows.length-1];
	Ti.API.info(win.id + "   " + last_win_id);
	// if(last_win_id === win.id){
		// Ti.API.info(" ###########################################################");
		// Ti.API.info(" ######## This window is already open, nothing to do! ######");
		// Ti.API.info(" ###########################################################"); 
	// }
	// else{
		win.open({animated:false});
		// Alloy.Globals.openWindows.push(win.id);
	// } 
	
	win.addEventListener('close', function(){
		Ti.API.info('Got close event for window ' );
		// Alloy.Globals.openWindows.pop();
		$.destroy();
	});
};

close = function(win){
	win.close({animated: false});
};
 


formatDate = function(timestamp){
	var date = new Date(parseFloat(timestamp)); 
	var monthDict = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	return ( date.getDate() + " " + 
			monthDict[date.getMonth()] + " " + 
			date.getFullYear() + "   " + 
			date.getHours() + ":" +
			date.getMinutes() ) ;
};


refresh= function(){
	var popup = Alloy.createController("popup_loader").getView();
    popup.open();
	var api = require("api");
	api.refresh({}, {
		onSuccess: function(e){ 
			var dbHelper = require("dbHelper");
			dbHelper.addQuestion(e);
			popup.close();
		},
		onError: function(e){
			alert("error occured");
			popup.close();
		}
	});
};

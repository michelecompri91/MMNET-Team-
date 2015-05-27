

exports.replyQuestion = function(data, callback){
	__httpRequest('POST', Alloy.Globals.URL, data, callback);
};



exports.setParameters = function(url, id){
	Alloy.Globals.URL = url;
	Alloy.Globals.devId = id;
};




function __httpRequest(method, url, postData, callback){
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setRequestHeader( "Content-Type", "application/json" );
	var tries = tries || 0;
	
	xhr.open(method, url);
	
	xhr.onload = function(e) {
		Ti.API.info("ON LOAD: " + JSON.stringify(e));
		var items = {};
		if(this.responseText != null){
			try { items = JSON.parse(this.responseText); } catch (e){}
		}
		log("=======>"+JSON.stringify(items));
		callback.onSuccess(items);
	};
	
	xhr.onerror = function(e) {
		callback.onError(e);
	};
	
	if (Titanium.Network.online) {
		xhr.send(postData);
    } else {
        alert(Alloy.Globals.no_internet_error);
		if (callback.error) { callback.onError(); }
    };
	
}



//============================================================
//============== DEBUG FUNCTION ==============================
//============================================================
function log(msg){
	Ti.API.info("=== DEBUG API ===");
	Ti.API.info(msg);
}

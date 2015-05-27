


exports.askQuestion = function(data, callback){
	__httpRequest('POST', Alloy.Globals.URL_QUESTION, data, callback);
};

exports.refresh = function(data, callback){
	__httpRequest('GET', Alloy.Globals.URL_REFRESH, data, callback);
};


exports.setParameters = function(url, id){
	Alloy.Globals.URL = url;
	Alloy.Globals.devId = id;
};




function __httpRequest(method, url, postData, callback){
	log(JSON.stringify(postData));
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setRequestHeader( "Content-Type", "application/json" );
	var tries = tries || 0;
	
	xhr.open(method, url);
	
	xhr.onload = function(e) {
		log("=======>"+this.responseText);
		var items = null;
		try { items = JSON.parse(this.responseText); } catch (e){log("ERROR!!");}
		log("=======>"+JSON.stringify(items));
		callback.onSuccess((items == null ? this.responseText : items));
	};
	
	xhr.onerror = function(e) {
		log("=======>"+JSON.stringify(e));
		callback.onError("Error");
	};
	
	if (Titanium.Network.online) {
		xhr.send(postData);
    } else {
        alert(Alloy.Globals.no_internet_error);
		if (callback.error) { callback.onError(); }
    };
	
}



var data = [
        {
            "question": "Is it working again?",
            "type": "DIRECT",
            "request_id ": "5be72d20-6998-11e4-8d7e-7a7919345aff",
            "timestamp ": 1415706382581,
            "answer ": [
                {
                    "peer ": "4",
                    "content": "How old are you?",
                    "timestamp ": 1415706376357
                }
            ],
            "status ": "COMPLETED"
        },
        {
            "question": "Is it working?",
            "type": "DIRECT",
            "request_id ": "58293ac0-6998-11e4-8d7e-7a7919345aff",
            "timestamp ": 1415706376357,
            "status ": "CREATED"
        }
    ];



//============================================================
//============== DEBUG FUNCTION ==============================
//============================================================
function log(msg){
	Ti.API.info("=== DEBUG API ===");
	Ti.API.info(msg);
}

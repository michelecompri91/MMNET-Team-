var obj_event = null;
var path_img;


function doClick(e){
	alert("TODO");
}



exports.setData = function(question, date){ 
	// obj_event = obj;
	$.lbl_question.text = question;
	$.lbl_date_time.text = date;
	
	DownL_Image();
};


$.v_action_bar.getView('v_action_bar').addEventListener('onButtonClick', function(data){ 
	if(data.id == "b_refresh"){
		refresh();
	}else{
		openWindow(Alloy.createController('settings').getView());
	}
});



$.v_footer.getView('v_footer').addEventListener('onButtonClick', function(data){ 
	 setActiveTab(data.id);
});


$.v_footer.getView('v_footer').fireEvent('setActiveButton', {"id": "b_questions"});


$.b_event.addEventListener("updateTab", function(data){
	setActiveTab(data.id);
});



function setActiveTab(id){
	if(id === "b_questions"){ 
	 	close($.win_detail_question);
	 }
	 else if(id === "b_history"){
	 	if(obj_event != null){
	 		obj_event.fireEvent("updateTab", {"id": id});
	 	}
	 	close($.win_detail_question);
	 }
	 else if(id === "b_add"){
	 	var win_ask = Alloy.createController("ask_new");
		win_ask.setData($.b_event);
		openWindow(win_ask.getView());
	 }
}

;

$.win_detail_question.addEventListener('android:back', function (e) {
  close($.win_detail_question);
});

function DownL_Image(){

	var xhr = Titanium.Network.createHTTPClient({
	onload: function() {
 // first, grab a "handle" to the file where you'll store the downloaded data
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'mygraphic.png');
		f.write(this.responseData); // write to the file
		Ti.App.fireEvent('graphic_downloaded', {filepath:f.nativePath});
	},
	timeout: 10000
});


Ti.API.info("percorso passato da lbl_indirizzo:"+path_img);
xhr.open('GET',"http://i.imgur.com/xigIkvV.jpg");
xhr.send();
Ti.App.addEventListener('graphic_downloaded', function(e) {
 // you don't have to fire an event like this, but perhaps multiple components will
 // want to know when the image has been downloaded and saved
	Ti.API.info("percorso passato da eventlister:"+e.filepath);
	$.imw_image.image = e.filepath;
});
	
}

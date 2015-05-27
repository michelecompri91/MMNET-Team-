var obj_event = null;
var id_question = null;
var model_question = {};
var col = Alloy.Collections.question;
var path_img;
var stop_wait=false;

exports.setData = function(data, obj){  
	$.lbl_question.text = data.lbl_question.text;
	$.lbl_date_time.text = data.lbl_date_time.text;
	$.lbl_indirizzo.text = data.lbl_indirizzo.text;
	path_img = data.lbl_indirizzo.text;
	id_question = data.id_question;
	obj_event = obj; 
};


function doClick(e){
	if(e.source.id == "v_delete"){
		alert("TODO");
	}else{
		$.scrollableV.scrollToView(1);
		$.reply.getView('sv').fireEvent('setIdQuestion', {"model": model_question}); 
	}
}


$.reply.getView('sv').addEventListener('reply_success', function(){
	model_question.set({'status' : "REPLY"}); 
	model_question.save(); 
	Alloy.Collections.question.add(model_question);
	showToast("Successfully replied. Question moved to replied list.");
	close($.win_detail_questions);
});


$.v_footer.getView('v_footer').addEventListener('onButtonClick', function(data){ 
	if(data.id == "b_accepted_questions"){
		close($.win_detail_questions);
	}else {
		if(obj_event != null){  
	 		obj_event.fireEvent("updateTab", {"id": data.id});
	 	}
	 	close($.win_detail_questions);
	}
});


$.win_detail_questions.addEventListener("open", function(e){ 
	$.v_footer.getView('v_footer').fireEvent('setActiveButton', {"id": "b_accepted_questions"});
	
	col.fetch({query:'SELECT * FROM question WHERE id="' + id_question + '"'}); 
	model_question = col.at(0); 
	DownL_Image();
	//Wait_Loading();
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

path_img = path_img.split('http://');
path_img=path_img[1];
Ti.API.info("percorso passato da lbl_indirizzo:"+path_img);
xhr.open('GET',path_img);
xhr.send();
Ti.App.addEventListener('graphic_downloaded', function(e) {
 // you don't have to fire an event like this, but perhaps multiple components will
 // want to know when the image has been downloaded and saved
	Ti.API.info("percorso passato da eventlister:"+e.filepath);
	$.imw_image.image = e.filepath;
	stop_wait = true;
	
});
	
}

function Wait_Loading(){
	
	var i=0;
	Ti.API.info("stampa stop_wait in wait load:"+stop_wait);
	while(stop_wait!=true)
	{
		setTimeout(function(){
	  if(i==3)
	  {
	  	$.wait_load.text="";
	  	i=0;
	  }
	  else
	  {
	  	$.wait_load.text=$.wait_load.text+".";
	  	i++;
	  }	
	 },2000);
		
	}
	$.wait_load.text="";
}

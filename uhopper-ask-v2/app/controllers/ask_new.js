var obj_event = null;
var resizedImage =null;
var Image_Imgur_Andress=null;
var testo=null;
var percorso;

function image_Load(e) 
{
	
	
	Ti.Media.openPhotoGallery({
        success:function(event) {                   
 
        resizedImage = event.media.imageAsResized(200, 200);
            //thumb---
            $.img_ask.setImage(resizedImage);
            $.img_ask.show();   
            //--------
        resizedImage=Ti.Utils.base64encode(event.media).toString();
        }
       
   });
   $.win_ask.open();
};

function Split()
{
	var splittato = testo.split('"');
	for(var i=0; i<splittato.length;i++)
    {
    	console.log(splittato[i].toString());
    	var n=splittato[i].search("imgur");
    	if(n>0)
    	{
    		percorso=splittato[i].toString();
    	}
    }	
   //   percorso=percorso.replace('\/','/');
   //alert(percorso);
   
}

function SendImgur(e){
	
	 var url = "https://api.imgur.com/3/upload";
     var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
       data:{
       	type: 'base64',
       },
     onload : function(e) {
         Ti.API.info("Received link of image: " + this.responseText);
         testo=this.responseText;
         Split();
        // alert('success');
        Ti.API.info("successo invio imgur");
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
          Image_Imgur_Andress="emp";
       //  alert('error');
     },
     //timeout : 100000  // in milliseconds
 });
 // Prepare the connection.
 
 var ID_CLIENT ="78d45be3ffa4295";   // id del mio account su imgur
 client.open("POST",url);
 client.setRequestHeader("Authorization", "Client-ID "+ ID_CLIENT);
 client.setRequestHeader("Content-Type","application/json;charset=UTF-8"); //"application/json"
 // Send the request.
 client.send(JSON.stringify(resizedImage));
}

function myUrlDecode(string) {
    //var c = 0;
    var entities = ['%21', '%2A', '%27', '%28', '%29', '%3B', '%3A', '%40', '%26', '%3D', '%2B', '%24', '%2C', '%2F', '%3F', '%25', '%23', '%5B', '%5D','%5C'];
    var replacements = ['!', '*', "'", "(", ")", ";", ":", "@", "&", "=", "+", "$", ",", "/", "?", "%", "#", "[", "]",""];
    var rg;
    for (var i = 0;i<entities.length;i++) {
         rg = new RegExp(entities[i],"g");
        string = string.replace(rg,replacements[i]);
    }
    return string;
}

function doClick(e){
	if($.txt_msg.value && $.txt_msg.value.length > 0){
		var popup = Alloy.createController("popup_loader").getView();
    	popup.open();
		var api = require("api"); 
		
		SendImgur();
	    
	    console.log("percorso immagine prima del wait: "+percorso);
	    
	    setTimeout(function()//while (percorso!=null)
	    {
	    
	    percorso = myUrlDecode(encodeURIComponent(percorso));	
		console.log("percorso immagine dopo wait: "+percorso);
		
		var data = {"device_id": Alloy.Globals.devId, "question": $.txt_msg.value+" &&& "+percorso, "type": "direct"};
		
		api.askQuestion(JSON.stringify(data), {
			onSuccess: function(res){ 
				data["request_id"] = res;
				data["status"] = "CREATED";
				data["timestamp"] = "" + (new Date().getTime());
				var dbHelper = require('dbHelper');
				dbHelper.addQuestion([data]);
				// alert("Question added!");
				close($.win_ask);
				popup.close();
				
				if(obj_event != null){
					obj_event.fireEvent("updateTab", {"id": "b_questions"});
				}
			},
			onError: function(res){
				popup.close();
				alert("Riprova!!");
			}
		});
		},40000);
	}else{
		alert("Question is empty!");
	}
}


exports.setData = function(obj){
	obj_event = obj;
};
 
$.v_action_bar.getView('v_action_bar').addEventListener('onButtonClick', function(data){ 
	alert(data.id);
});

$.v_footer.getView('v_footer').addEventListener('onButtonClick', function(data){ 
	if(data.id !== "b_add"){
		if(obj_event != null){
			Ti.API.info("ASK NEW " + JSON.stringify(obj_event));
			obj_event.fireEvent("updateTab", {"id": data.id});
		}
		close($.win_ask);
	}
});


$.v_footer.getView('v_footer').fireEvent('setActiveButton', {"id": "b_add"});


$.win_ask.addEventListener('android:back', function (e) {
	if(obj_event != null){
		Ti.API.info("ASK NEW " + JSON.stringify(obj_event));
		obj_event.fireEvent("updateTab", {"id": "b_questions"});
	}
  close($.win_ask);
});

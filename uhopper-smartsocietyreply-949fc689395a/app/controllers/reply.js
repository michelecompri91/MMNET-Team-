var model_question = null;

function doClick(e){  
	if($.txt_msg.value.length > 0){ 
		var api = require("api"); 
		Ti.API.info("************SONO IN REPLY.js***************+");
		var data = {
				   "content": $.txt_msg.value,
				   "type": model_question.get("type"),
				   "subtype": "answer",
				   "sender": model_question.get("sender"),
				   "conversation": model_question.get("conversation"),
				   "language": model_question.get("language"),
				   "securityToken": model_question.get("securityToken")
	 			};
		var popup = Alloy.createController("popup_loader").getView();
    	popup.open();
    	
		api.replyQuestion(JSON.stringify(data), { 
			onSuccess: function(e){
				$.sv.fireEvent("reply_success", {});
				popup.close(); 
				
				Ti.API.info(JSON.stringify(data));
				
				var dbHelper = require("dbHelper");
				dbHelper.addAnswerToQuestion(data.conversation, data.content, new Date().getTime());
			},
			onError: function(e){
				popup.close();
				alert("error");
			}
		});
	}else{
		alert("You should write something to reply.");
	}
}


$.sv.addEventListener('setIdQuestion', function(e){
	model_question = e.model;
});

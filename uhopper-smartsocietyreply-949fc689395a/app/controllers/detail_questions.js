var obj_event = null;
var id_question = null;
var model_question = {};

var col = Alloy.Collections.question;

function doClick(e){
	Ti.API.info(e.source.id);
	if(e.source.id == "v_refuse"){
		if(obj_event != null){
			// obj_event.fireEvent('update', {"id": id_question});
			alert("TODO");
			// close($.win_detail_questions);
		}
	}else if(e.source.id == "v_accept"){ 
		model_question.set({'status' : "ACCEPTED"}); 
		model_question.save(); 
		col.add(model_question);
		showToast("Question moved on accepted list");
		close($.win_detail_questions); 
	}else if(e.source.id == "v_reply"){
		model_question.set({'status' : "ACCEPTED"}); 
		model_question.save(); 
		Alloy.Collections.question.add(model_question);
		
		$.scrollableV.scrollToView(1); 
		$.reply.getView('sv').fireEvent('setIdQuestion', {"model": model_question});
	}
}

exports.setData = function(data, obj){  
	$.lbl_question.text = data.lbl_question.text;
	$.lbl_date_time.text = data.lbl_date_time.text;
	$.lbl_indirizzo.text = data.lbl_indirizzo.text;
	id_question = data.id_question;
	obj_event = obj; 
	Ti.API.info("replaceeeee"+data.lbl_indirizzo.text.replace(" ",""));
	  $.imw_image.image=data.lbl_indirizzo.text.replace(" ","");
};


$.reply.getView('sv').addEventListener('reply_success', function(){
	model_question.set({'status' : "REPLY"}); 
	model_question.save(); 
	col.add(model_question);
	showToast("Successfully replied. Question moved to replied list.");
	close($.win_detail_questions);
});


$.v_footer.getView('v_footer').addEventListener('onButtonClick', function(data){ 
	if(data.id == "b_questions"){
		close($.win_detail_questions);
	}else {
		if(obj_event != null){  
	 		obj_event.fireEvent("updateTab", {"id": data.id});
	 	}
	 	close($.win_detail_questions);
	}
});


$.win_detail_questions.addEventListener('open', function(e){	
	col.fetch({query:'SELECT * FROM question WHERE id="' + id_question + '"'}); 
	model_question = col.at(0); 
});


$.win_detail_questions.open();

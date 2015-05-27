var obj_event = null;

function doClick(e){
	alert("TODO");
}



exports.setData = function(obj, data){ 
	obj_event = obj;
	$.lbl_question.text = data.lbl_question.text;
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


$.v_footer.getView('v_footer').fireEvent('setActiveButton', {"id": "b_history"});


$.b_event.addEventListener("updateTab", function(data){
	setActiveTab(data.id);
});



function setActiveTab(id){
	if(id === "b_history"){ 
	 	close($.win_detail_history_ko);
	 }
	 else if(id === "b_questions"){
	 	if(obj_event != null){
	 		obj_event.fireEvent("updateTab", {"id": id});
	 	}
	 	close($.win_detail_history_ko);
	 }
	 else if(id === "b_add"){
	 	var win_ask = Alloy.createController("ask_new");
		win_ask.setData($.b_event);
		openWindow(win_ask.getView());
	 }
}



$.win_detail_history_ko.addEventListener('android:back', function (e) {
  close($.win_detail_history_ko);
});

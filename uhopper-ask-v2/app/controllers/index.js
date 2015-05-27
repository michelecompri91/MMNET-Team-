exports.baseController = "base";




function doClick(e) {
    alert($.label.text);
}


$.v_action_bar.getView('v_action_bar').addEventListener('onButtonClick', function(data){ 
	Ti.API.info(data.id);
	if(data.id == "b_refresh"){
		refresh();
	}else{
		openWindow(Alloy.createController('settings').getView());
	} 
});



$.v_footer.getView('v_footer').addEventListener('onButtonClick', function(data){ 
	if(data.id === "b_add"){
		var win_ask = Alloy.createController("ask_new");
		win_ask.setData($.b_event);
		openWindow(win_ask.getView());
	}else if(data.id === "b_questions"){
		$.sv.scrollToView(0);
	}else if(data.id === "b_history"){
		$.sv.scrollToView(1);
	}
});


$.b_event.addEventListener("updateTab", function(data){
	if(data.id === "b_questions"){
		$.sv.scrollToView(0);
		$.v_footer.getView('v_footer').fireEvent('setActiveButton', {"id": "b_questions"});
	}else if(data.id === "b_history"){
		$.sv.scrollToView(1);
		$.v_footer.getView('v_footer').fireEvent('setActiveButton', {"id": "b_history"});
	}
});


$.index.addEventListener('open', function(e){ 
	$.ls_questions.getView("listView").fireEvent("setObj", {"obj": $.b_event});
	$.ls_history.getView("listView").fireEvent("setObj", {"obj": $.b_event});
});


$.index.open(); 

var obj_event = null;
var id_question = null;
var activeTab = "b_history";
var path_img;


function doClick(e){
	alert(activeTab);
}



exports.setData = function(obj, data, tabName){ 
	obj_event = obj;
//	var Splittato=data.lbl_question.text.split('&&&');
	$.lbl_question.text = data.lbl_question.text;
	$.lbl_date_time.text = data.lbl_date_time.text;
	path_img = data.lbl_indirizzo.text;
	activeTab = tabName;
    Ti.API.info("paaaaaathhhhh:"+path_img.replace(" ",""));
    $.imw_image.image=path_img.replace(" ","");
	id_question = data["id_question"];
};

$.v_action_bar.getView('v_action_bar').addEventListener('onButtonClick', function(data){ 
	if(data.id == "b_refresh"){
		refresh();
		setTimeout(function(){
			if(id_question != null){
				Ti.API.info("Call show anser");
				showAnswer();
			}
		}, 1000);
	}else{
		openWindow(Alloy.createController('settings').getView());
	}
});


$.v_footer.getView('v_footer').addEventListener('onButtonClick', function(data){ 
	Ti.API.info(data.id);
	setActiveTab(data.id);
});
 
$.b_event.addEventListener("updateTab", function(data){
	setActiveTab(data.id);
});



function setActiveTab(id){
	if(id === "b_history"){ 
		if(obj_event != null){
	 		obj_event.fireEvent("updateTab", {"id": id});
	 	}
	 	close($.win_detail_history_ok);
	 }
	 else if(id === "b_questions"){
	 	if(obj_event != null){
	 		obj_event.fireEvent("updateTab", {"id": id});
	 	}
	 	close($.win_detail_history_ok);
	 }
	 else if(id === "b_add"){
	 	var win_ask = Alloy.createController("ask_new");
		win_ask.setData($.b_event);
		openWindow(win_ask.getView());
	 }
}


function showAnswer(){
	var dbHelper = require("dbHelper");
	var answers = dbHelper.getAnswerForQuestion(id_question); 
	
	var table_data = [];
	var label = null;
	var answer = null;
	var devider = null;
	var row = null;
	
	if(answers.length == 0){
		$.v_positive_answer.visible = false;
		$.lbl_tag_answer.visible = false;
		$.v_devider.visible = false;
		$.tbl_answers.visible = false;
	}else{
		$.v_positive_answer.visible = true;
		$.lbl_tag_answer.visible = true;
		$.v_devider.visible = true;
		$.tbl_answers.visible = true;
		
		if(activeTab == "b_questions"){
			activeTab = "b_history";
			$.v_footer.getView('v_footer').fireEvent('setActiveButton', {"id": activeTab});
		}
	}
	 
	for(var i=0; i<answers.length; i++){
		answer = answers.at(i);
		
		label = Ti.UI.createLabel({
			left: "10dp",
			right: "10dp", 
			// height: "60dp",
			text: answer.get("content"),
			font:{
				fontSize: "18dp",
				fontFamily: "Nunito-Regular"
			},
			color: "#acacac",
			autoLink:Titanium.UI.Android.LINKIFY_ALL
		});
		
		row = Ti.UI.createTableViewRow({
			    backgroundSelectedColor:'white',
			    height:"100dp"
			  }); 
		
		row.add(label);
		table_data.push(row);  
	}
	
	$.tbl_answers.data = table_data;
	
}


$.win_detail_history_ok.addEventListener('android:back', function (e) {
  close($.win_detail_history_ok);
});


$.win_detail_history_ok.addEventListener("open", function(e){ 
	$.v_footer.getView('v_footer').fireEvent('setActiveButton', {"id": activeTab});
	if(id_question != null){
		showAnswer();
	}
	
});
$.win_detail_history_ok.addEventListener("close", function(e){
	$.destroy();
});

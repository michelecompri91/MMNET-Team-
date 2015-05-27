var obj_event = null;

var id_question = null;

function doClick(e){
	alert("TODO");
}



exports.setData = function(obj, data){ 
	Ti.API.info(JSON.stringify(data));
	obj_event = obj;
	$.lbl_question.text = data.lbl_question.text;
	$.lbl_indirizzo.text = data.lbl_indirizzo.text;
	id_question = data["id_question"];
};


$.v_footer.getView('v_footer').addEventListener('onButtonClick', function(data){ 
	if(data.id == "b_history"){
		close($.win_detail_history);
	}else {
		if(obj_event != null){  
	 		obj_event.fireEvent("updateTab", {"id": data.id});
	 	}
	 	close($.win_detail_history);
	}
});


function showAnswer(){
	var dbHelper = require("dbHelper");
	var answers = dbHelper.getAnswerForQuestion(id_question); 
	Ti.API.info("id_question: " + id_question);
	Ti.API.info("answers: " + JSON.stringify(answers));
	
	var table_data = [];
	var label = null;
	var answer = null;
	var devider = null;
	var row = null;
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
			    height:"80dp"
			  }); 
		
		row.add(label);
		table_data.push(row);  
	}
	
	$.tbl_answers.data = table_data;
	
}


$.win_detail_history.addEventListener('android:back', function (e) {
  close($.win_detail_history);
});


$.win_detail_history.addEventListener("open", function(e){ 
	$.v_footer.getView('v_footer').fireEvent('setActiveButton', {"id": "b_history"});
	
	if(id_question != null){
		showAnswer();
	}
});
$.win_detail_history.addEventListener("close", function(e){
	$.destroy();
});






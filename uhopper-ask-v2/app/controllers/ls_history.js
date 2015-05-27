var obj_event = null; 

var coll_question = Alloy.Collections.question; 
coll_question.fetch({query:'SELECT * FROM question WHERE status = "COMPLETED" ORDER BY timestamp DESC'});


var section = Ti.UI.createListSection({items: insertIntoRow()}); 
$.listView.sections = [section];



coll_question.on('add', function(e){
	Ti.API.info("COLLLECTION ADD EVENT");
	coll_question.fetch({query:'SELECT * FROM question WHERE status = "COMPLETED" ORDER BY timestamp DESC'});
	section = Ti.UI.createListSection({items: insertIntoRow()}); 
	$.listView.sections = [section];
});
 


function insertIntoRow(){
	var data = [];
	for(var i=0; i<coll_question.length; i++){ 
		var Splittato = coll_question.at(i).get("content").split('&&&');
		data.push({ 
			"id_question": coll_question.at(i).get("id"),
			"v_container": {"backgroundColor": (i%2 == 0) ? "#efefef": "white"},
			"lbl_question": {"text": Splittato[0]},
			"lbl_date_time": {"text": formatDate(coll_question.at(i).get("timestamp"))},
		    "lbl_indirizzo":{"text": Splittato[1]}
		});
	}
	return data;
}



$.listView.addEventListener('itemclick', function(e){ 
	var item = e.section.getItemAt(e.itemIndex);  
	var controller = Alloy.createController('detail_history_ok');
	controller.setData(obj_event, item, "b_history");
	openWindow(controller.getView());
});
 

$.listView.addEventListener("setObj", function(data){
	obj_event = data.obj;
});
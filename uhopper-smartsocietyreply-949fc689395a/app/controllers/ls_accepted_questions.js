var indexObj = null;

var coll_question = Alloy.Collections.question; 
coll_question.fetch({query:"SELECT * FROM question WHERE status = 'ACCEPTED' ORDER BY timestamp DESC"});
 
var section = Ti.UI.createListSection({items: insertIntoRow(coll_question)}); 
$.listView.sections = [section];

coll_question.on('add', function(e){ 
	Ti.API.info("lsAppcepted ADD  " +"COLLLECTION ADD EVENT");
	Ti.API.info("lsAppcepted ADD  " +JSON.stringify(e));
	coll_question.fetch({query:"SELECT * FROM question WHERE status = 'ACCEPTED' ORDER BY timestamp DESC"});
	Ti.API.info("lsAppcepted ADD  " +JSON.stringify(coll_question));
	section = Ti.UI.createListSection({items: insertIntoRow(coll_question)}); 
	$.listView.sections = [section];
});
coll_question.on('change', function(e){
	Ti.API.info("lsAppcepted change" +"COLLLECTION ADD EVENT");
	coll_question.fetch({query:"SELECT * FROM question WHERE status = 'ACCEPTED' ORDER BY timestamp DESC"});
	section = Ti.UI.createListSection({items: insertIntoRow(coll_question)}); 
	$.listView.sections = [section];
});

 

function insertIntoRow(collection){
	var data = [];
	for(var i=0; i<collection.length; i++){ 
		Ti.API.info("lsAppcepted " + JSON.stringify(collection.at(i)));
		var splittato = coll_question.at(i).get("content").split('&&&');
		data.push({ 
			"id_question": collection.at(i).get("id"),
			"v_container":{"backgroundColor": (i%2 == 0) ? "#efefef": "white"},
			"lbl_question":{"text": splittato[0] },//collection.at(i).get("content")},
			"lbl_indirizzo":{"text": splittato[1] },
			"lbl_date_time":{"text": formatDate(collection.at(i).get("timestamp"))}
		});
	}
	return data;
}
 

$.listView.addEventListener('itemclick', function(e){ 
	var item = e.section.getItemAt(e.itemIndex); 
	var controller = Alloy.createController('detail_accepted_questions');
	controller.setData(item, indexObj);
	openWindow(controller.getView());
});


$.listView.addEventListener('setIndexObj', function(e){  
	indexObj = e.obj;
});

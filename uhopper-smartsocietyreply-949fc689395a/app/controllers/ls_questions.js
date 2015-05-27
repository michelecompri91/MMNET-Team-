var indexObj = null;
var indirizzo;

var coll_question = Alloy.Collections.question; 
coll_question.fetch({query:"SELECT * FROM question WHERE status = 'PENDING' ORDER BY timestamp DESC"});
 
var section = Ti.UI.createListSection({items: insertIntoRow()}); 
$.listView.sections = [section];

coll_question.on('add', function(e){
	Ti.API.info("lsQuestion " +"COLLLECTION ADD EVENT");
	coll_question.fetch({query:"SELECT * FROM question WHERE status = 'PENDING' ORDER BY timestamp DESC"});
	section = Ti.UI.createListSection({items: insertIntoRow()}); 
	$.listView.sections = [section];
});
 



function insertIntoRow(){
	var data = [];
	for(var i=0; i<coll_question.length; i++){ 
		Ti.API.info("lsQuestion " +JSON.stringify(coll_question.at(i)));
		var splittato = coll_question.at(i).get("content").split('&&&');
		indirizzo=splittato[1];
		data.push({  
			"id_question": coll_question.at(i).get("id"),
			"v_container":{"backgroundColor": (i%2 == 0) ? "#efefef": "white"},
			"lbl_question":{"text": splittato[0] },//coll_question.at(i).get("content")},
			"lbl_indirizzo":{"text": splittato[1] },
			"lbl_date_time":{"text": formatDate(coll_question.at(i).get("timestamp"))}
		});
	}
	return data;
}
 

$.listView.addEventListener('itemclick', function(e){  
	var item = e.section.getItemAt(e.itemIndex);  
	var controller = Alloy.createController('detail_questions');
	controller.setData(item, indexObj);
	openWindow(controller.getView());
});

$.listView.addEventListener('setIndexObj', function(e){  
	indexObj = e.obj;
});

 












var obj_event = null; 
var indirizzo;


var coll_question = Alloy.Collections.question; 
coll_question.fetch({query:'SELECT * FROM question WHERE status = "CREATED" ORDER BY timestamp DESC'});


var section = Ti.UI.createListSection({items: insertIntoRow()}); 
$.listView.sections = [section];



coll_question.on('add', function(e){
	Ti.API.info("COLLLECTION ADD EVENT");
	coll_question.fetch({query:'SELECT * FROM question WHERE status = "CREATED" ORDER BY timestamp DESC'});
	section = Ti.UI.createListSection({items: insertIntoRow()}); 
	$.listView.sections = [section];
});
 
function Carica_img(){
	
	 var ind=" http://i.imgur.com/";//QmpgbjW.jpg"
	 var immagine = splittato[1].split('\/');
	 ind = ind+immagine[2];
	 Ti.API.info(ind);
	// Titanium.Platform.openURL(ind);
}


function insertIntoRow(){
	var data = [];
	for(var i=0; i<coll_question.length; i++){ 
		var splittato = coll_question.at(i).get("content").split('&&&');
		indirizzo=splittato[1];
		data.push({ 
			"id_question": coll_question.at(i).get("id"),
			"v_container":{"backgroundColor": (i%2 == 0) ? "#efefef": "white"},
			"lbl_question":{"text": splittato[0] },//coll_question.at(i).get("content")	
			"lbl_indirizzo":{"text": splittato[1] },
			"lbl_date_time":{"text": formatDate(coll_question.at(i).get("timestamp"))}			
		});
	}
	//Ti.API.info("SSSSSTAMPO DATA DA ls_question: "+data["lbl_percorso"]);
	return data;
}

 


$.listView.addEventListener('itemclick', function(e){ 
	console.log("SELEZIONO ITEM");
	var item = e.section.getItemAt(e.itemIndex); 
	console.log(item); 
	var controller = Alloy.createController('detail_history_ok');
	// controller.setData(item.lbl_question.text, item.lbl_date_time.text);
	controller.setData(obj_event, item, "b_questions");
	openWindow(controller.getView());
});

 


$.listView.addEventListener("setObj", function(data){ 
	obj_event = data.obj;
});



/*var obj_event = null; 

var coll_question = Alloy.Collections.question; 
coll_question.fetch({query:'SELECT * FROM question WHERE status = "CREATED" ORDER BY timestamp DESC'});


var section = Ti.UI.createListSection({items: insertIntoRow()}); 
$.listView.sections = [section];



coll_question.on('add', function(e){
	Ti.API.info("COLLLECTION ADD EVENT");
	coll_question.fetch({query:'SELECT * FROM question WHERE status = "CREATED" ORDER BY timestamp DESC'});
	section = Ti.UI.createListSection({items: insertIntoRow()}); 
	$.listView.sections = [section];
});
 


function insertIntoRow(){
	var data = [];
	for(var i=0; i<coll_question.length; i++){ 
		
		data.push({ 
			"id_question": coll_question.at(i).get("id"),
			"v_container":{"backgroundColor": (i%2 == 0) ? "#efefef": "white"},
			"lbl_question":{"text": coll_question.at(i).get("content")},
			"lbl_date_time":{"text": formatDate(coll_question.at(i).get("timestamp"))}
		});
	}
	return data;
}

 


$.listView.addEventListener('itemclick', function(e){ 
	var item = e.section.getItemAt(e.itemIndex);  
	var controller = Alloy.createController('detail_history_ok');
	// controller.setData(item.lbl_question.text, item.lbl_date_time.text);
	controller.setData(obj_event, item, "b_questions");
	openWindow(controller.getView());
});

 


$.listView.addEventListener("setObj", function(data){ 
	obj_event = data.obj;
});*/

exports.addQuestion = function(data){
	// var question_collection = Alloy.createCollection('question');
	var question = null; 
	for(var i in data){    
		question = Alloy.createModel('question', 
						{'content': data[i]["question"], 
						'timestamp': data[i]["timestamp"],
						'type': data[i]["type"],
						'id': data[i]["request_id"],
						'status': data[i]["status"]});
						 
		if(data[i]["answer"]){
			var answerModel = null;
			var answer = null;
			for(var j=0; j<data[i]["answer"].length; j++){
				answer = data[i]["answer"][j];
				answerModel = Alloy.createModel('answer', 
								{
									"id": data[i]["request_id"] + answer["timestamp"],
									"content": answer["content"],
									"timestamp": answer["timestamp"],
									"id_question": data[i]["request_id"],
									"peer": answer["peer"]
								});
				
				answerModel.save();
				Alloy.Collections.answer.add(answer);
			}
		}
		
		
		question.save(); 
		Alloy.Collections.question.add(question);
	} 
	
};


exports.getAnswerForQuestion = function(id){
	var coll_question = Alloy.Collections.question; 
	coll_question.fetch({query:'SELECT * FROM answer WHERE id_question = "' + id +'"'});
	
	return coll_question;
};

exports.refreshDatabase = function(data){
	//delete all
	//add data
};



function log(tag, msg){
	Ti.API.info("######### " + tag + " #########");
	Ti.API.info(msg);
}

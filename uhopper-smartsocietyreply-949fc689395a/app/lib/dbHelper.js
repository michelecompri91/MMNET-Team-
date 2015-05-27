exports.addQuestion = function(data){ 
	data = JSON.parse(data); 
	var content = JSON.parse(data.content);
	Ti.API.info("addQuestion " + JSON.stringify(data)); 
	var question = Alloy.createModel('question', 
						{'content': content.question, 
						"type": data.type,
						"subtype": data.subtype,
						"sender": data.sender,
						"conversation": data.conversation,
						"language": data.language,
						"securityToken": data.securityToken,
						"id": data.id,
						"timestamp": (content.timestamp == null ? new Date().getTime() : content.timestamp),
						"status": "PENDING"}); 
	question.save(); 
	 
	try{
		var question_collection = Alloy.Collections.question;  
		question_collection.add(question);
	}catch(e){
		Ti.API.info("addQuestion " + JSON.stringify(e));
	}
};

exports.getQuestion = function(data){
	
};

exports.addAnswerToQuestion = function(id, content, timestamp){
	var answer = Alloy.createModel('answer',
					{'peer': "",
					 'content': content,
					 'timestamp': timestamp,
					 'id': id});
	answer.save();
	
	// var answer_collection = Alloy.Collections.answer;
	// answer_collection.add(answer);
};

exports.getAnswerForQuestion = function(idQuestion){
	var coll_question = Alloy.Collections.question; 
	var sql = 'SELECT * FROM answer WHERE id="'+idQuestion+'"' ; 
	coll_question.fetch({query: sql});
	
	return coll_question;
};


exports.saveQuestion = function(data){
	Ti.API.info("saveQuestion " + data.content);
	data = JSON.parse(data); 
	var db = Ti.Database.open("db");
	   
	// try{ 
		var sql = "INSERT INTO Question (id, content, type, subtype, sender, " + 
				  "conversation, language, securityToken) " + 
				  "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		
		db.execute(sql, data.id,
						data.content,
						data.type,
						data.subtype,
						data.sender,
						data.conversation.x,
						data.language,
						data.securityToken);
	// }catch(error){
		// Ti.API.info("Error saveOffers: " + error); 
	// }
 
	
	db.close();
	
};
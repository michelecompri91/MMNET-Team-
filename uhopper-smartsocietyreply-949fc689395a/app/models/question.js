exports.definition = {
	config: {
		columns: {
			"id": "TEXT PRIMARY KEY",
		    "content": "TEXT",
		    "type": "TEXT",
		    "subtype": "TEXT",
		    "sender": "TEXT",
		    "conversation": "TEXT",
		    "language": "TEXT",
		    "securityToken": "TEXT",
		    "id": "REAL PRIMARY KEY",
		    "timestamp": "TEXT",
		    "status": "TEXT" //PENDING ACCEPTED REPLIED
		},
		adapter: {
			type: "sql",
			collection_name: "question",
			idAttribute:'id',
			db_name:'db'
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};
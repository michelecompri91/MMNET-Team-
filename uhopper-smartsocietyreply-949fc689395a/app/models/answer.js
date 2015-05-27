exports.definition = {
	config: {
		columns: {
		    "peer": "TEXT",
		    "content": "TEXT",
		    "timestamp": "TEXT", 
		    "id": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "answer",
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
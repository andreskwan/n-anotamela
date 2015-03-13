var logger       = require('../../../lib/logger/logger.js');
var articleModel = require('./schema/articleSchema.js');

var Article = function (conf){
	conf = conf || {};
	//inicializacion del modelo
	this.model = articleModel;
};

Article.prototype.save = function (data, callback){
	// debugger;
	 // debugger;	
	 logger.info("Article.prototype.save");
	 logger.info("data:", data);
	this.model.findOneAndUpdate({
		title      : data.title,
		description: data.description,
		type       : data.type,
		body       : data.body
	}
	,data
	//options
	,{upsert:true})//creates a new document if it doesn't exist
	//returns a callback
	.exec(function (err, doc){
		//callback al controlador por que ya llego el objeto
		callback(doc);
	});
};
Article.prototype.getDB = function (query, callback){
	// debugger;
	this.model.find(query)
	.exec(function (err, doc){
		//callback al controlador 
		callback(doc);
	});
};

module.exports = Article;
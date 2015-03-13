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
	// logger.info("MODEL - SAVE - Article.prototype.save");
	// logger.info("MODEL - SAVE - data:", data);
	// A.findOneAndUpdate(conditions, update, options)
	this.model.findOneAndUpdate({
		title      : data.title,
		description: data.description,
		type       : data.type,
		body       : data.body
	},
	data,
	//options
	{upsert:true})//creates a new document if it doesn't exist
	//returns a callback
	.exec(function (err, doc){
		//callback al controlador por que ya llego el objeto
		callback(doc);
	});
};
Article.prototype.get = function (query, callback){
	// debugger;
	// logger.info("MODEL - GET - query: ",query);
	//aqui deberia cambiar este objeto y solo dejar el query
	//de esta manera es mas plural, puedo buscar por otros criterios
	var obj = {"_id":query};
	// logger.info("MODEL - GET - data:", data);
	this.model.find(obj)
	.exec(function (err, doc){
		// logger.info("MODEL - GET - doc: ",doc);
		//callback al controlador
		if (err) logger.info("REST - GET - error",err);
		callback(doc);
	});
};
Article.prototype.put = function (data, callback){
	// debugger;
	// logger.info("MODEL - PUT - query: ",data);
	// logger.info("MODEL - PUT - data._id:",data._id);
	this.model.findByIdAndUpdate(data._id,
		{$set : {
			title      : data.title,
			description: data.description,
			type       : data.type,
			body       : data.body
		}},
		{upsert:false}
	)
	//returns a callback
	.exec(function (err, doc){
		// debugger;
		//callback al controlador por que ya llego el objeto
		callback(doc);
	});
};

Article.prototype.delete = function (id, callback){
	// debugger;
	// logger.info("MODEL - PUT - query: ",data);
	// logger.info("MODEL - DELETE - data._id:",data._id);
	this.model.findByIdAndRemove(id)
	//returns a callback
	.exec(function (err, doc){
		// debugger;
		//callback al controlador por que ya llego el objeto
		// logger.info("MODEL - DELETE - doc: ",doc);
		callback(doc);
	});
};

module.exports = Article;
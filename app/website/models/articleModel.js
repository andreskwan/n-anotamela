var logger       = require('../../../lib/logger/logger.js');
var articleModel = require('./schema/articleSchema.js');

var Article = function (conf){
	conf = conf || {};
	this.model = articleModel;
}

Article.prototype.saveDB = function (data, callback){
	// debugger;
	this.model.findOneAndUpdate({
		title  : data.title,
		slug   : data.slug,
		content: data.content
	},data,{upsert:true})
	.exec(function (err, doc){
		//callback al controlador 
		callback(doc);
	});
}
Article.prototype.getDB = function (query, callback){
	// debugger;
	this.model.find(query)
	.exec(function (err, doc){
		//callback al controlador 
		callback(doc);
	});
}

module.exports = Article;
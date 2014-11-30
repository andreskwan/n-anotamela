var logger      = require('../../../lib/logger/logger.js');

var Article = function (conf){
	conf = conf || {};
}

Article.prototype.add = function (res, object){
	// debugger;
	res.render('article_add', object);
}

Article.prototype.edit = function (res, object){
	// debugger;
	res.render('article_edit', object);
}

Article.prototype.list = function (res, object){
	// debugger;
	res.render('article_list', object);
}

module.exports = Article;
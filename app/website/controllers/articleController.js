var logger      = require('../../../lib/logger/logger.js');

var Article = function (conf){
	conf = conf || {};
	this.response = function() {
		//accediendo al prototipo
		this[conf.funcionalidad] (conf.req, conf.res, conf.next);
		//funcionalidad invocada desde el browser
		logger.info("conf.funcionalidad   : ",conf.funcionalidad);
	}
}

Article.prototype.post_data = function (req, res, next){
	res.render('article_list', {nombre:"post_data"});
}

Article.prototype.get_add = function (req, res, next){
	//aqui creo que deberia ser POST
	res.render('article_list', {nombre:"get_add"});
}

Article.prototype.get_list = function (req, res, next){
	res.render('article_list', {nombre:"get_list"});
}

Article.prototype.get_edit_data = function (req, res, next){
	//aqui creo que deberia ser PUT
	res.render('article_list', {nombre:"get_edit_data"});
}
module.exports = Article;
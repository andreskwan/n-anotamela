var logger      = require('../../../lib/logger/logger.js');
var ArticleView = require('../views/articleView.js');


var Article = function (conf){
	conf      = conf || {};
	this.view = new ArticleView();
	this.response = function() {
		//accediendo al prototipo
		this[conf.funcionalidad] (conf.req, conf.res, conf.next);
		//funcionalidad invocada desde el browser
		logger.info("conf.funcionalidad   : ",conf.funcionalidad);
	}
}

Article.prototype.post_save = function (req, res, next){
	debugger;
	// res.render('article_save', {nombre:"post_save_data"});

}

Article.prototype.get_add = function (req, res, next){
	//aqui creo que deberia ser POST
	// res.render('article_add', {nombre:"get_add"});
	// debugger;
	var object = {nombre:"get_add"};
	this.view.add(res, object);
}

Article.prototype.get_list = function (req, res, next){
	// res.render('article_list', {nombre:"get_list"});
	var object = {nombre:"get_list"};
	this.view.list(res, object);
}

Article.prototype.get_edit_data = function (req, res, next){
	//aqui creo que deberia ser PUT
	// res.render('article_list', {nombre:"get_edit_data"});
	var object = {nombre:"get_edit_data"};
	this.view.edit(res, object);
}
module.exports = Article;
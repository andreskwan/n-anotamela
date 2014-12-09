var logger       = require('../../../lib/logger/logger.js');
var ArticleView  = require('../views/articleView.js');
var ArticleModel = require('../models/articleModel.js');

var Article = function (conf){
	conf        = conf || {};
	this.view   = new ArticleView();
	this.model  = new ArticleModel();
	this.response = function() {
		//accediendo al prototipo
		this[conf.funcionalidad] (conf.req, conf.res, conf.next);
		//funcionalidad invocada desde el browser
		// logger.info("conf.funcionalidad   : ",conf.funcionalidad);
	}
}

Article.prototype.post_save = function (req, res, next){
	debugger;
	//para ver que llama a articleModel.save()
	// res.render('article_save', {nombre:"post_save_data"});
	this.model.save(req.body, function (doc) {
		// debugger;
		//para ver lo que trae el callback doc
		// res.render(article_save);// + doc.slug);
		// Article.view.save(res, doc);
		//I don't have access to this.view
		res.redirect('/article/see/'+doc.slug);
	});
}

Article.prototype.get_see_data = function (req, res, next){
	//aqui creo que deberia ser PUT
	// res.render('article_list', {nombre:"get_edit_data"});
	var object = {};
	//same as blocks 
	//need a reference to self 
	var self   = this;
	this.model.get({slug:req.params.data}, function (doc){
		object.article = doc[0];
		// debugger;
		self.view.see(res, object);
	});
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
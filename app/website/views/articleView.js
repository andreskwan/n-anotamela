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

Article.prototype.save = function (res, object){
	// debugger;
	res.render('article_save', object);
}

Article.prototype.see = function (res, object){
	// debugger;
	res.render('article_see', object);
}
//CKHeaven
Article.prototype.coctel = function (res, object){
	// debugger;
	res.render('article_coctel', object);
}
Article.prototype.zapatos = function (res, object){
	// debugger;
	res.render('article_zapatos', object);
}
Article.prototype.calle = function (res, object){
	// debugger;
	res.render('article_calle', object);
}
Article.prototype.accesorios = function (res, object){
	// debugger;
	res.render('article_accesorios', object);
}
module.exports = Article;
var Article = function (conf){
	conf = conf || {};
}

Article.prototype.post_data = function (req, res, next){
	res.response('vista list');
}

Article.prototype.get_add = function (req, res, next){
	res.response('vista add');
}

Article.prototype.get_list = function (req, res, next){
	res.response('vista list');
}

Article.prototype.get_edit_data = function (req, res, next){
	res.response('vista add');
}
module.exports = Article;
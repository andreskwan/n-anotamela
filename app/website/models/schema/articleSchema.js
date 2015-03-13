var logger   = require('../../../../lib/logger/logger.js');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var articleSchema = new Schema({
	title      : {type:String, require:true},
	description: {type:String, require:true},
	type       : {type:String},
	body       : {type:String}
});


articleSchema.methods.blablabla = function (){
	// debugger;
	this.title = this.title + '-bla bla bla';
	return this.title;
};

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
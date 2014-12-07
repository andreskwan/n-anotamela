var logger   = require('../../../../lib/logger/logger.js');
var mongoose = require('mongoose');
var conf     = require('../../../../conf.json');
var Schema   = mongoose.Schema;

mongoose.connect('mongodb://localhost/'+'Article');

var articleSchema = new Schema({
	title  : {type:String, require:true},
	slug   : {type:String, require:true},
	content: {type:String}
})
var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
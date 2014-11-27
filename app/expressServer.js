var express     = require('express'); 
var middlewares = require('./middlewares/admin.js');
var cons		= require('consolidate');
var RESTnotas   = require('../lib/notas');
//creando el objeto
var ExpressServer = function (config){
	//si vacio, es un objeto vacio
	config = config || {};
	//creo instancia
	this.server = express();
	//middlewares
	for (var middleware in middlewares){
		this.server.use(middlewares[middleware]);
	}
	/**
	*	template engine - Swig
	*/
	//
	//define engine
	this.server.engine('html', cons.swig);
	//como template de vista use html y asi asocia a swig
	this.server.set('view engine', 'html');
	//donde estan los html?
	this.server.set('views', __dirname + '/website/views/templates');
	/**
	*	routes
	*/
	//Model REST 
	this.server.use(RESTnotas);
	//view
	this.server.get('/article/save', function (req, res, next){
		// debugger;
		res.render('article_save', {nombre:"Andres"});
	});
	//view
	this.server.get('/article/list', function (req, res, next){
		// debugger;
		res.render('article_list', { });
	});
}; 

module.exports = ExpressServer;
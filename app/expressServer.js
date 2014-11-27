//dev enviroment
var env         = process.env.NODE_ENV || 'production';
var express     = require('express'); 
var middlewares = require('./middlewares/admin.js');
// var cons        = require('consolidate');
var logger      = require('../lib/logger/logger.js');
var swig        = require('swig');
//routes
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
	this.server.engine('html', swig.renderFile);
	//como template de vista use html y asi asocia a swig
	this.server.set('view engine', 'html');
	//donde estan los html?
	this.server.set('views', __dirname + '/website/views/templates');
	/**
	*	Dev enviroment configuration
	*/
	if (env == 'development'){
		logger.info('development - env - NO HAY CACHE');
		this.server.set('view cache', false);
		// swig.setDefaults({cache: false, varControls:['[[',']]']});
		swig.setDefaults({cache: false});
	}
	/**
	*	routes
	*/
	//Model REST 
	this.server.use(RESTnotas);

	//puedo crear rutas especificas para articulos
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
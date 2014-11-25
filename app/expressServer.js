var express = require('express'); 
var middlewares = require('./middlewares/admin.js');
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
}; 

module.exports = ExpressServer;
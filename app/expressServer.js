var express = require('express'); 
//creando el objeto
var ExpressServer = function (config){
	//si vacio, es un objeto vacio
	config = config || {};
	//creo instancia
	this.server = express();
}; 

module.exports = ExpressServer;
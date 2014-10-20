/**
* Dependencies
*/
var express = require('express');
var bodyParser = require('body-parser');
var logger     = require('./lib/logger/logger.js');

/**
* Local Variables
*/

//se exporta el servicio - server para que las pruebas lo consuman
var server = module.exports = express();
var port   = process.env.PORT || 3000;

/**	
* Middleware
*/
server.use(bodyParser.json('application/json'));

/**
* Routes
*/
var notas = require('./lib/notas');
server.use(notas);

//to work with supertest
//supertest nos esta usando como modulo?
//o somos el servidor 
//si tengo padre, me estan usando como modulo
if (!module.parent) {
	server.listen(port, function (){
		// logger.info('http	://localhost:'+port);
	});
}else{
	module.exports = server;
}
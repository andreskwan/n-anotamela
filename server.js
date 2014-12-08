/**
* Dependencies
*/
var logger        = require('./lib/logger/logger.js');
var http          = require('http');
var ExpressServer = require('./app/expressServer.js')
var mongoose      = require('mongoose');
var socketIO      = require('./app/socketIO.js');
var conf          = require('./conf.json'); 

/**
* Local Variables
*/
var port    = process.env.PORT || conf.port;
var express = new ExpressServer();
var server  = http.createServer(express.app);
var Io      = new socketIO({server:server});

mongoose.connect('mongodb://'+conf.mongoDB.host+'/'+conf.mongoDB.name);
//to work with supertest
//supertest nos esta usando como modulo?
//o somos el servidor 
//si tengo padre, me estan usando como modulo
if (!module.parent) {
	server.listen(port, function (){
		logger.info('http://localhost:'+port);
	});
}else{
	//se exporta el servicio - app para que las pruebas lo consuman
	module.exports = server;
}
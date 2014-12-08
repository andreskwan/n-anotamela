/**
* Dependencies
*/
var logger        = require('./lib/logger/logger.js');
var ExpressServer = require('./app/expressServer.js')
var mongoose      = require('mongoose');
var conf          = require('./conf.json'); 

/**
* Local Variables
*/
var express  = new ExpressServer();
var port = process.env.PORT || conf.port;

mongoose.connect('mongodb://'+conf.mongoDB.host+'/'+conf.mongoDB.name);
//to work with supertest
//supertest nos esta usando como modulo?
//o somos el servidor 
//si tengo padre, me estan usando como modulo
if (!module.parent) {
	express.app.listen(port, function (){
		logger.info('http://localhost:'+port);
	});
}else{
	//se exporta el servicio - app para que las pruebas lo consuman
	module.exports = express.app;
}
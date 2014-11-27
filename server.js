/**
* Dependencies
*/
var logger        = require('./lib/logger/logger.js');
var ExpressServer = require('./app/expressServer.js')
var conf          = require('./conf.json');

/**
* Local Variables
*/
var app = new ExpressServer();
var port   = process.env.PORT || conf.port;

//to work with supertest
//supertest nos esta usando como modulo?
//o somos el servidor 
//si tengo padre, me estan usando como modulo
if (!module.parent) {
	app.server.listen(port, function (){
		logger.info('http://localhost:'+port);
	});
}else{
	//se exporta el servicio - server para que las pruebas lo consuman
	module.exports = app.server;
}
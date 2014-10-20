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
var db     = {};
/**	
* Middleware
*/
server.use(bodyParser.json('application/json'));

/**
* Routes
*/

//con esto reponderemos a un post hecho a /notas
server.post('/notas', function (req, res){
	//1 recibir lo que nos envian en el POST
	//- para poder analizar esto necesitamos 
	//bodyparser 
	//accessing the body data
	logger.info('POST body.nota', req.body.nota);
	var notaNueva = 	req.body.nota;
	//adding id to the json 
	//no tiene id 
	notaNueva.id = Date.now();
	db[notaNueva.id] = notaNueva;
	logger.info('alamcenado en la db (POST):', db);

	res
	.set('Content-Type','application/json')//delete
	.status(201)
	.send({
			"nota": notaNueva//{
			// 		'title': "Mejorando.la #node-pro",
			// 		"description": "Introduccion a clase",
			// 		"type": "js", // tipo de dato de la nota, permitir highlight and warnings 
			// 		"body": "soy el cuerpo de json",
			// // 		"id":"pepe"
				// }
		}); 
});

//id? significa que es un parametro opcional
server.get('/notas/:id?', function (req, res){
	// logger.info('alamcenado en la db (POST):\n', db);
	logger.info('GET /notas/%s', req.params.id);

	var id = req.params.id;
	//buscar nota existente by id
	var nota = db[id];
	// logger.info("GET db", db);
	logger.info("GET nota", nota);
	if (!nota) {
		res.status(404);
		return res.send('Not Found');
	}
	res
	.json({
		notas:nota
	});
});
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
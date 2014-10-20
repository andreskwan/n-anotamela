var app = require('express')();
var logger     = require('../logger/logger.js');

var db     = {};

//con esto reponderemos a un post hecho a /notas
app.post('/notas', function (req, res){
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
app.get('/notas/:id?', function (req, res){
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

module.exports = app;
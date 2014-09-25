/**
* Dependencies
*/
var express = require('express');

/**
* Local Variables
*/

//se exporta el servicio - server para que las pruebas lo consuman
var server = module.exports = express();
var port   = process.env.PORT || 3000;
/**
* Routes
*/

//con esto reponderemos a un post hecho a /notas
server.post('/notas', function (req, res){
	//1 recibir lo que nos envian en el POST
	//- para poder analizar esto necesitamos 
	//bodyparser 
	res
	.status(201)
	.send({
			"nota": {
					'title': "Mejorando.la #node-pro",
					"description": "Introduccion a clase",
					"type": "js", // tipo de dato de la nota, permitir highlight and warnings 
					"body": "soy el cuerpo de json",
					"id":"pepe"
				}}); 
});

//to work with supertest
//supertest nos esta usando como modulo?
//o somos el servidor 
//si tengo padre, me estan usando como modulo
if (!module.parent) {
	server.listen(port, function (){
		console.log('http://localhost:'+port);
	});
}else{
	module.exports = server;
}
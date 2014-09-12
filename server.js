var express = require('express');
//se exporta el servicio - server para que las pruebas lo consuman
var server = module.exports = express();

server.post('/notas', function (req, res){
	res
	.status(201)
	.json({}); 
});

//to work with supertest
//supertest nos esta usando como modulo?
//o somos el servidor 
//si tengo padre, me estan usando como modulo
if (!module.parent) {
	server.listen(3000, function (){
		console.log('http://localhost:3000');
	});
}else{
	module.exports = server;
}
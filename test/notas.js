//---------------------------
//Supertest
//para hacer solicitud al 
//hace lo mismo que postman 
var request = require('supertest');
var api     = require('../server.js');
//correr pruebas con diferentes host
var host    = process.env.API_TEST_HOST || api;

request = request(host);

//hacer una prueba del recurso notas.js
//esta funcion describe el contexto de la prueba inicial
describe('recurso /notas', function (){
	//La primera prueba sera POST
	describe('POST', function (){
		it('should create a new note', function (done){
			// throw new Error('tengo hambre'); 
			// return true;
			//crear nota nueva
			var data = {
				//"nota": {
					"title": "Mejorando.la #node-pro",
					"description": "Introduccion a clase",
					"type": "js", // tipo de dato de la nota, permitir highlight and warnings 
					"body": "soy el cuerpo de json"
				}
			//};
			//usar supertest para hacer request
			//1 crear solicitud de http enviando data
			request
				.post('/notas')
				//format: usar el encabezado para identificar el recurso 
				//         accept application/json
				.set('Accept', 'application/json')
				//body: nota en json
				.send(data)
				//status code
				//pasar nuestras expectativas
				.expect(201)
				.expect('Content-Type', /application\/json/)
				.end(function (err, res){
					var body = res.body;

					expect(body).to.have.property('nota');

					nota = body.notas;

					expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
					expect(nota).to.have.property('description', 'Introcuccion a clase');
					expect(nota).to.have.property('type', 'js');
					expect(nota).to.have.property('body', 'soy el cuerpo de json');
					expect(nota).to.have.property('id');
					done();
				});
				// .expect('Content-type', /application\/json/)	
				// .end(function (err, res){
				// 	var body = res.body;
				// 	expect(body).to.have.property('nota');
		});
		it.skip('should evaluate async', function (done){
			  //1 codigo 
			  var mejorandola = 'prueba';

			  setTimeout(function (){
			  	mejorandola = 'Andres Kwan';
			  }, 1000);
			  //2 escribir mi expectativa
			  request 
			  .expect(mejorandola)
			  .to
			  .equal('Andres Kwan')
			  .end(done);
		});
	});		
});

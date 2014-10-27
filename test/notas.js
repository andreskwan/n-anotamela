//---------------------------
//Supertest
//para hacer solicitud al 
//hace lo mismo que postman 
var request  = require('supertest-as-promised');
var api      = require('../server.js');
var logger   = require('../lib/logger/logger.js');
// var async = require('async');
//correr pruebas con diferentes host
var host     = process.env.API_TEST_HOST || api;
request      = request(host);

//hacer una prueba del recurso notas.js
//esta funcion describe el contexto de la prueba inicial
describe('recurso /notas', function (){
	//La primera prueba sera POST
	describe('POST', function () {
		it('should return/create a new note', function (done){
			// throw new Error('tengo hambre'); 
			// return true;
			//crear nota nueva
			var data = {
				"nota": {
					"title": "Mejorando.la #node-pro",
					"description": "Introduccion a clase",
					"type": "js", // tipo de dato de la nota, permitir highlight and warnings 
					"body": "soy el cuerpo de json"
				}
			};
			//};
			//usar supertest para hacer request
			//1 crear solicitud de http/POST enviando data
			request.post('/notas')
				//------------------
				//Post - send - create
				//------------------
				//format: usar el encabezado para identificar el recurso 
				//         accept application/json
				.set('Accept', 'application/json')
				//body: nota en json
				.send(data)
				//------------------
				//Resp - from node.js server
				//------------------
				//status code
				//pasar nuestras expectativas
				.expect(201)
				.expect('Content-Type', /application\/json/)
				//callback para evaluar el body
				.end(function (err, res){
					var body = res.body;
					console.log('(TESTING POST) JSON response del server por el POST: \n', body);

					//does the note exist?
					expect(body).to.have.property('nota');
					nota = body.nota;
					expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
					expect(nota).to.have.property('description', 'Introduccion a clase');
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
		//no pasa, no funciona la asynchronia
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
	describe('GET', function() {
		it('deberia obtener una nota existente', function (done) {
			var data = {
				"nota": {
					"title": "Mejorando.la #node-pro",
					"description": "Introduccion a clase",
					"type": "js", // tipo de dato de la nota, permitir highlight and warnings 
					"body": "soy el cuerpo de json"
				}
			};
			var id;
			request.post('/notas')
				.set('Accept', 'application/json')
				.send(data)
				.expect(201)
				.then(function getNota (res){
					id = res.body.nota.id;
					return request.get('/notas/'+id)
					.expect(200)
					.expect('Content-type', /application\/json/)
				}, done)
				.then(function assertions (res){
					var nota = res.body.notas;	

					expect(res.body).to.have.property('notas');
					expect(nota).to.have.property('id', id);
					expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
					expect(nota).to.have.property('description', 'Introduccion a clase');
					expect(nota).to.have.property('type', 'js');
					expect(nota).to.have.property('body', 'soy el cuerpo de json');
					done();
				}, done);
		});
	});
	describe('PUT', function() {
		it('deberia actualizar una nota existente', function (done) {
			var data = {
				"nota": {
					"title": "Mejorando.la #node-pro",
					"description": "Introduccion a clase",
					"type": "js", // tipo de dato de la nota, permitir highlight and warnings 
					"body": "soy el cuerpo de json"
				}
			};
			var id;
				//crear nota
				request.post('/notas')
					.set('Accept', 'application/json')
					.send(data)
					.expect(201)
				//obtener nota
				.then(function getNota (res){
					id = res.body.nota.id;
					logger.info('in getNota');					
					return request.get('/notas/'+id)
					.expect(200)
				}, done)
				//editar nota
				.then(function putNota (res){
					var notaActualizada = res.body.notas;
					notaActualizada.title = "Nota actualizada";
					logger.info('in putNota');
					return request.put('/notas/'+id)
						.send(notaActualizada)
						.expect(200)
						.expect('Content-type', /application\/json/)
				}, done)
				//eveluar que la nota se haya actualizado correctamente
				.then(function assertions (res){
					var notaValidar = res.body.nota;	
					logger.info('in assertions');
					expect(res.body).to.have.property('notas');
					expect(notaValidar).to.have.property('id', id);
					expect(notaValidar).to.have.property('title', 'Nota actualizada');
					expect(notaValidar).to.have.property('description', 'Introduccion a clase');
					expect(notaValidar).to.have.property('type', 'js');
					expect(notaValidar).to.have.property('body', 'soy el cuerpo de json');
					done();
				},done) 
				// (){
				// 	console.log(error in putNota);
		});
	});
});


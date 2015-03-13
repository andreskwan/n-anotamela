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

function createNote(){
	var id;
	var data = {
		nota: {
			"title": "Mejorando.la #node-pro",
			"description": "Introduccion a clase",
			"type": "js", // tipo de dato de la nota, permitir highlight and warnings
			"body": "soy el cuerpo de json"
		}
	};
	return request.post('/notas')
		.set('Accept', 'application/json')
		.send(data)
		.expect(201)
		.then(function getNota (res){
			// this.id = res.body.nota.id;
			this.id = res.body.nota._id;
			// logger.info("BEFORE - res.body",res.body);
		}.bind(this));
};

function createNotes(){
	var id;
	var data1 = {
		nota: {
			"title": "Nota 1",
			"description": "Introduccion a clase",
			"type": "js", // tipo de dato de la nota, permitir highlight and warnings
			"body": "soy el cuerpo de json"
		}
	};
	var data2 = {
		nota: {
			"title": "Nota 2",
			"description": "Introduccion a clase",
			"type": "js", // tipo de dato de la nota, permitir highlight and warnings
			"body": "soy el cuerpo de json"
		}
	};
	request.post('/notas')
		.set('Accept', 'application/json')
		.send(data1)
		.expect(201)
		.end();
	request.post('/notas')
		.set('Accept', 'application/json')
		.send(data2)
		.expect(201)
		.end();
};
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
					//does the note exist?
					expect(body).to.have.property('nota');
					nota = body.nota;
					var _id = body.nota._id;
					// logger.info("_id",_id);
					expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
					expect(nota).to.have.property('description', 'Introduccion a clase');
					expect(nota).to.have.property('type', 'js');
					expect(nota).to.have.property('body', 'soy el cuerpo de json');
					expect(nota).to.have.property('_id');
					done();
				});
				// .expect('Content-type', /application\/json/)
				// .end(function (err, res){
				// 	var body = res.body;
				// 	expect(body).to.have.property('nota');
		});
	});
	describe('GET', function() {
		//Post to create note, no needed bacuse we are going to query
		// the db
		beforeEach(createNote);
		it('deberia obtener una nota existente', function (done) {
			var id = this.id;
			// logger.info("TEST - GET - this.id: ",id);
			return request.get('/notas/'+id)
				.set('Accept', 'application/json')
				.send()
				.expect(200)
				.expect('Content-type', /application\/json/)
			.then(function assertions (res){
				var notas = res.body.notas;
				// logger.info("TEST - GET - res.body.nota",notas['0']);
				// logger.info("TEST - GET - res.body.notas",res.body.notas);
				var nota = notas['0'];
				expect(res.body).to.have.property('notas');
				expect(nota).to.have.property('_id', id);
				expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
				expect(nota).to.have.property('description', 'Introduccion a clase');
				expect(nota).to.have.property('type', 'js');
				expect(nota).to.have.property('body', 'soy el cuerpo de json');
				done();
			}, done);
		});
		it.skip('deberia obtener una lista de todas las notas', function (done){
			createNotes();
			return request.get('/notas/')
				.send()
				.expect(201)
				.expect('Content-type', /application\/json/)
			.then(function assertions (res){
				var nota = res.body;
				// logger.info("res.body:",res.body);
				expect(res.body).to.have.property('notas')
					.and.to.be.an('array')
					.and.to.have.length.above(0);
				done();
			}, done);
		});
	});
	describe('PUT', function() {
		beforeEach(createNote);
		it('deberia actualizar una nota existente', function (done) {
			var _id = this.id;
			// logger.info("TEST - PUT - this.id: ",_id);
			return request.get('/notas/'+_id)
				.set('Accept', 'application/json')
				.send()
				.expect(200)
				.expect('Content-type', /application\/json/)
			//editar nota
			.then(function putNota (res){
				// logger.info('in putNota');
				//get returns notas
				// logger.info('TEST - PUT - res.body: ',res.body);
				// logger.info('TEST - PUT - res.body.notas: ',res.body.notas);
				var notas = res.body.notas;
				var notaActualizada = notas['0'];
				// logger.info("TEST - PUT - Nota original: ", notaActualizada);
				notaActualizada.title = "Nota actualizada Kwan";
				return request.put('/notas/'+_id)
					.send({nota:notaActualizada})
					.expect(200)
					.expect('Content-type', /application\/json/)
			}, done)
			//eveluar que la nota se haya actualizado correctamente
			.then(function assertions (res){
				// logger.info("in assertions");

				var notaValidar = res.body.nota;
				// logger.info('res.body:',res.body);
				// logger.info('notaValidar',notaValidar);
				expect(res.body).to.have.property('nota');
				expect(notaValidar).to.have.property('_id', _id);
				expect(notaValidar).to.have.property('title', 'Nota actualizada Kwan');
				expect(notaValidar).to.have.property('description', 'Introduccion a clase');
				expect(notaValidar).to.have.property('type', 'js');
				expect(notaValidar).to.have.property('body', 'soy el cuerpo de json');
				done();
			}, done)
		});
	});
	describe('DELETE', function() {
		beforeEach(createNote);
		it('deberia borrar una nota existente', function (done){
			var id = this.id;
			return request.delete('/notas/'+id)
			.expect(204)
			// .then(function assertNoteDestroyed(res){
			// 	return request.get('/notas/'+id)
			// 	.expect(400);
			// }, done)
			.then( function (){
				done();
			});
		});
	});
});


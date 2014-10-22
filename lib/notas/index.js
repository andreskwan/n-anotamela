var app = require('express')();
var logger     = require('../logger/logger.js');

var db     = {};

app.route('/notas/:id?')
	.all( function (req, res, next) {
		logger.info(req.method, req.path, req.body);
		res.set('Content-Type', 'application/json');
		next();
	})
	//POST
	.post( function (req, res){
		var notaNueva = 	req.body.nota;
		notaNueva.id = Date.now();
		db[notaNueva.id] = notaNueva;
		res
		.status(201)
		.json({
				"nota": notaNueva
		}); 
	})
	//GET
	.get( function (req, res){
		var id = req.params.id;
		var nota = db[id];
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
var logger = require('../lib/logger/logger.js');
var IO = require('socket.io');

var SocketIO = function (conf) {
	conf = conf || {};
	var io = IO.listen(conf.server);
	// debugger;
	//crear el evento de escucha para conectar los dos extremos
	io.on('connect', function (socket){
		debugger;
		//envia evento
		socket.emit('mejorandola', {hola:"Emit desde el servidor"});

		//recive evento
		socket.on('mejorandolo', function (data) {
			debugger;
			logger.info("socket.on 'mejorandolo': ", data);
		});
	});
}

module.exports = SocketIO; 
var IO = require('socket.io');

var SocketIO = function (conf) {
	conf = conf || {};
	var io = IO.listen(conf.server);

}

module.exports = SocketIO;
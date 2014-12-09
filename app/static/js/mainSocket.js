//Client side JS
//Socket.io from client
//cargar DOM
$(document).ready(function (){
//conectarme al servidor
	window.io = io.connect(); 
	//cuando el cliente se connecte 
	//-este conectado 
	io.on('connect', function (socket){
		console.log('On connect recive del servidor');
		// enviando mensajes al server
		io.emit('mejorandolo', {hola:"Emit desde el browser"});
	});
});
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

document.getElementById('links').onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link, event: event},
        links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
};
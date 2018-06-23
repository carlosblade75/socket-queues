// comando para establecer la comunicación con el servidor

var socket = io();

var label = $('#lblNuevoTicket');

// ON son para escuchar
socket.on('connect', function() {

    console.log('Nuevo ticket conectado al servidor');
});

socket.on('disconnect', function() {

    console.log('Perdimos conexión con el  servidor');
});

socket.on('estadoActual', function(data) {

    label.text(data.actual);
});

$('button').on('click', function() {

    // EMIT para enviar
    socket.emit('siguienteTicket', {}, function(resp) {
        console.log(resp);

        label.text(resp);
    });

});
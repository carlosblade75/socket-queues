// comando para establecer la comunicación con el servidor

var socket = io();

var searchParams = new URLSearchParams(window.location.search);

var label = $('small');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');


$('h1').text('Escritorio ' + escritorio);

// ON son para escuchar
socket.on('connect', function() {

    console.log('Escritorio conectado al servidor');
});

socket.on('disconnect', function() {

    console.log('Perdimos conexión con el  servidor');
});

$('button').on('click', function() {
    // EMIT para enviar
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp.ok === false) {
            label.text('No hay tickets');
            alert('No hay tickets');
        }

        label.text(resp.numero);
    });

});
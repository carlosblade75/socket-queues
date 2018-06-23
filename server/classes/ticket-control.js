const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        // console.log('TicketControl constructor');
        this.ultimo = 0;
        this.hoy = new Date().getDate();

        this.tickets = [];
        this.ultimos4 = [];

        // al ser el  archivo JSON se puede leer asi
        let data = require('../data/data.json');

        if (this.hoy === data.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarConteo();
        }
    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {

        return `Ticket ${ this.ultimo }`;
    }

    getUltimos() {

        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return { ok: false };
        } else {

            console.log('Escritorio... ', escritorio);

            let numeroTicket = this.tickets[0].numero;
            this.tickets.shift(); // con esto eliminamos el primer elemento

            // lo hacemos asi pq en javascript todos los objetos se pasan por referencia
            let atenderTicket = new Ticket(numeroTicket, escritorio);
            this.ultimos4.unshift(atenderTicket); // añade un nuevo elemento al principio del array

            if (this.ultimos4.length > 4) {
                this.ultimos4.splice(-1, 1); // esto borra el último elemento
            }

            this.grabarArchivo();

            return atenderTicket;
        }
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

        console.log('Se ha reinicialidado el sistema');
    }

}

module.exports = {
    TicketControl
}
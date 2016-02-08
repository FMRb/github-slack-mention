'use strict';

const request = require('request');

module.exports = keepalive;

function keepalive(server, baseUrl) {
    server.route({
        method:'GET',
        path: '/ping',
        handler: function (request, reply) {
            console.log('Responding to PING');
            reply('PONG');
        }
    });

    setInterval(function() {
        console.log('Keep alive: ',`${baseUrl}/ping`);
        request.get(`${baseUrl}/ping`);
    }, 60000);
}

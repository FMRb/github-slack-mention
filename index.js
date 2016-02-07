'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: 4567 });

server.route({
    method:'POST',
    path: '/payload',
    handler: function (request, reply) {
        console.log('PAYLOAD: body -> ', request.payload.comment.body);
    }
});

server.start(() => {
    console.log('Server running at: ', server.info.uri);
});

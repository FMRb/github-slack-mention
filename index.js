'use strict';

const slackHook = process.env.SLACK_HOOK || '';
const githubMentionMatch = process.env.GITHUB_MENTION || '';

const Hapi = require('hapi');
const slackBot = require('./lib/slackmentionbot.js');
const keepalive = require('./lib/keepalive.js')

const server = new Hapi.Server();
const port = process.env.PORT || 4567;
server.connection({port: port});

keepalive(server, server.info.uri);
server.route({
    method:'POST',
    path: '/payload',
    handler: function (request, reply) {
        const comment = request.payload.comment;
        console.log(123, request);
        if (containGithubMention(comment.body)) {
            slackBot(slackHook, comment);
        }
        console.log('PAYLOAD: body -> ', comment.body);
        reply('event checked');
    }
});

server.start(() => {
    console.log('Server running at: ', server.info.uri);
});


function containGithubMention(body) {
    return body.indexOf(githubMentionMatch) > -1;
}

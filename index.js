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
        const body = request.payload.comment.body;
        const user = request.payload.user;
        if (containGithubMention(body)) {
            slackBot(slackHook, body, user);
        }
        console.log('PAYLOAD: body -> ', body);
        reply('event checked');
    }
});

server.start(() => {
    console.log('Server running at: ', server.info.uri);
    console.log('Slack hook: ', slackHook);
    console.log('Github mention: ', githubMentionMatch);
});


function containGithubMention(body) {
    return body.indexOf(githubMentionMatch) > -1;
}

'use strict';

const slackHook = process.env.SLACK_HOOK;
const githubMentionMatch = process.env.GITHUB_MENTION;

const Hapi = require('hapi');
const http = require('http');

const server = new Hapi.Server();

server.connection({port: 4567});

server.route({
    method:'POST',
    path: '/payload',
    handler: function (request, reply) {
        const body = request.payload.comment.body;
        const user = request.payload.user;
        if (containGithubMention(body)) {
            sendSlackNotification(body, user);
        }
        console.log('PAYLOAD: body -> ', body);
    }
});

server.start(() => {
    console.log('Server running at: ', server.info.uri);
    console.log('Slack hook: ', slackHook);
    console.log('Github mention: ', githubMentionMatch);
});


function containGithubMention(body) {
    //TODO check match in body GITHUB_MENTION
    return false;
}

function sendSlackNotification() {
    //TODO send slack notification using SLACK_HOOK;
    return;
}

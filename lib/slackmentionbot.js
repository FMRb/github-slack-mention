'use strict';

const request = require('request');

module.exports = slackmentionbot;

const requestOptions = {
    method: 'POST',
    json: true,
    headers: {
        "content-type": "application/json"
    }
};

function slackmentionbot(slackWebhook, comment, user) {
    console.log('Slackbot comment: ', comment);
    console.log('Slackbot hook: ', slackWebhook);
    request.post(slackWebhook, {
        form:{
            payload: buildPayload(comment, user)
        }
    }, function(err, response){
        if (response.body === 'ok') {
            console.log('Notification sent it!');
        }
    })
}

function buildPayload(comment, user) {

    return JSON.stringify({
        text: `Mention: ${comment}`,
        icon_emoji: ':ghost:'
    })
}

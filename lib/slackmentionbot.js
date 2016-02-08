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

function slackmentionbot(slackWebhook, comment) {
    console.log('Slackbot comment: ', comment);
    console.log('Slackbot hook: ', slackWebhook);
    request.post(slackWebhook, {
        form:{
            payload: buildPayload(comment)
        }
    }, function(err, response){
        if (response.body === 'ok') {
            console.log('Notification sent it!');
        }
    })
}

function buildPayload(comment) {
    
    return JSON.stringify({
        text: `Someone needs you help!  <${comment.html_url}|Click here>`,
        icon_emoji: ':ghost:',
        color:'#D00000',
        fields:[
            {
               title:'Mention',
               value: comment.body,
               short:false
            }
         ]

    })
}

#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const { sendEmail } = require('./helpers/email_config')

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        const exchange = 'email-exchange';

        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        channel.assertQueue('email-queue', {
            exclusive: false
        }, function(error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(" [*] Waiting for email messages in %s", q.queue);
            channel.bindQueue(q.queue, exchange, '');

            channel.consume(q.queue, function(msg) {
                if(msg.content) {
                    console.log("[x] received new message!");
                    let email_params = JSON.parse(msg.content)
                    sendEmail({data: {...email_params}})
                        .then(result => console.log(result))
                        .catch(err => console.log(err))
                }
            }, {
                noAck: true
            });
        });
    });
});

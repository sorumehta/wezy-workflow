const amqp = require('amqplib/callback_api');


const enqueueMail = async (emailData) => {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            const exchange = 'email-exchange';

            let msg = JSON.stringify(emailData)
            channel.assertExchange(exchange, 'fanout', {
                durable: false
            });
            channel.publish(exchange, 'email-queue', Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });
        setTimeout(function() {
            connection.close();

        }, 500);
    });
};


module.exports = { enqueueMail }

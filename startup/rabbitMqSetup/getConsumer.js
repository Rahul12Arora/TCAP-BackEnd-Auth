const setupRabbitMQ = require('./Connection');

async function consume(argument) {
    const { channel } = await setupRabbitMQ();

    const queue = 'order_queue';
    await channel.assertQueue(queue);

    console.log('Waiting for messages...');

    try {
        const msg = await channel.get(queue, { noAck: false }); // channel.get returns a Promise
        if (msg) {
            console.log('Received message:', msg.content.toString());
        } else {
            console.log('No messages in queue');
        }
    } catch (err) {
        console.error('Error consuming message:', err);
    }
}

consume();

module.exports = consume;

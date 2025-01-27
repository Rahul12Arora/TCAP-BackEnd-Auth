const setupRabbitMQ = require('./Connection');

async function purgeQueue(){

    const {channel} = await setupRabbitMQ();
    const queue = 'order_queue';

    await channel.deleteQueue(queue)

}

purgeQueue()
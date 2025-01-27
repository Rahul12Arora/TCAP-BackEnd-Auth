const setupRabbitMQ = require('./Connection');

async function produceMessage(argument) {
    const { channel } = await setupRabbitMQ();
    
    // Define queue name
    const QUEUE_NAME = 'order_queue-3';
    
    // Ensure queue exists
    await channel.assertQueue(QUEUE_NAME, {
        // Make the queue survive broker restart
        durable: true,  
        // Allow multiple consumers
        exclusive: false,  
        // Automatically delete queue when no consumers
        autoDelete: false  });
    
    
    // Send message
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({
      orderId: argument,
      items: ['pizza', 'salad'],
      customer: 'John Doe'
    })), { persistent: true });
  }

async function call(){
    for(let i =10;i<20;i++){
        await produceMessage(i);
    }
}

call();

module.exports = produceMessage
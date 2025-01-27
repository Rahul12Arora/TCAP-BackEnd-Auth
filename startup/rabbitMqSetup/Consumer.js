const setupRabbitMQ = require('./Connection');

  async function consume(argument) {
      const {channel} = await setupRabbitMQ();
  
      const queue = 'order_queue-3';
      await channel.assertQueue(queue);
  
      console.log('Waiting for messages...');
      channel.consume(queue, (msg) => {
          console.log('consumer triggered')
          const message = JSON.parse(msg.content.toString());
          console.log('Received:', message);
  
          // channel.ack(msg); // Isko agar karo to queue se ud jayega message
      }, 
      {noAck: false}
    );
  }
  
consume();

module.exports = consume;
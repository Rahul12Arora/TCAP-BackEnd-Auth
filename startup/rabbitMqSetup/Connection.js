const amqp = require('amqplib');

let connection = null;
let channel = null;

async function setupRabbitMQ() {
  try {
    if(channel == null || connection == null){

      // Establish connection
      const connection = await amqp.connect('amqp://localhost');
      
      // Create a channel (lightweight connection)
      const channel = await connection.createChannel();
      
      return { connection, channel };
    }
    return { connection, channel }
  } catch (error) {
    console.error('RabbitMQ Connection Error:', error);
  }
}

module.exports = setupRabbitMQ
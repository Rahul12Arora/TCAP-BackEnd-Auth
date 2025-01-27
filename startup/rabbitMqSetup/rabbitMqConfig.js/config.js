module.exports = {

    DurableQueue : {
        // Make the queue survive broker restart
        durable: true,  
        // Allow multiple consumers
        exclusive: false,  
        // Automatically delete queue when no consumers
        autoDelete: false  }
    ,
    DurableMessages:{
        // Make message survive broker restart
        persistent: true,  
        // Optional message expiration
        expiration: '60000'  
      }
}
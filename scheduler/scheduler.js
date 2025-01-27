const schedule = require('node-schedule');
const producer = require('../startup/rabbitMqSetup/Producer');

async function make(){

}

const job = schedule.scheduleJob('*/1 * * * *', async () => {
        try {
            setTimeout(()=>{
                producer()
            },1000)
        } catch (error) {
        console.error("Error during job execution:", error);
    }
});
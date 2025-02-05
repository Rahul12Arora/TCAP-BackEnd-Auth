const cluster = require("cluster");
const http = require("http");
const express = require("express");
const os = require("os");

const app = express();
// console.log(`top level code executed for the first time for pid ${process.pid}`)

app.get("/", async(req, res) => {
    try {
        console.log(`API hit by worker process: ${process.pid} ${cluster.isMaster}`);
        let count = 0;
        // for(let i=0; i<20000000000; i++){
        //     count++;
        // }
        res.status(200).json(`Api hitted and sending response by worker: ${process.pid} ${count}`);
    } catch (error) {
        console.error("Error -> ", error);
    }
})

// Worker function - this is what will be forked
const workerFunction = () => {
    try {
        // Express server runs in each worker process
        http.createServer(app).listen(8080, ()=> {
            console.log(`Worker ${process.pid} is running on port 8080`)
        })
    } catch (error) {
        console.error("Error -> ", error);
    }
}

// Clustering logic: If this is the master process, fork workers
if(cluster.isMaster){
    const numOfCpus = os.cpus().length; 
    console.log(`Number of CPUs ${numOfCpus}`);
    console.log(`Master process ${process.pid} is running`);

    // Fork workers (one per CPU core)
    for (let i = 0; i < numOfCpus; i++) {
        cluster.fork(); // Forking worker process
    }

    // Listen for worker exit events
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Restart a worker when one dies
    });
}else{
    // If this is a worker process, run the server
    console.log('a new worker function is called because this is not master')
    workerFunction();
}
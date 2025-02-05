const fs = require('fs');
const path = require('path');

// Define the log file paths
const timedLogFilePath = path.join(__dirname, '..', 'apiCount.log');
const totalLogFilePath = path.join(__dirname, '..', 'apiCountTotal.json');

// Create a write stream (append mode)
const logStream = fs.createWriteStream(timedLogFilePath, { flags: 'a+' });

// Function to log messages with timestamps
function logToFile(message) {
  const timestamp = new Date().toLocaleString();
  logStream.write(`${timestamp} - ${message}\n`);
}

const timeToWriteInFile = 1000*60*60;

// API count storage
let inMemoryApiCount = {};

// Middleware to track API usage
const apiLogger = (req, res, next) => {
    try{
        const endpoint = req.path; // Use req.path to get clean API route
        inMemoryApiCount[endpoint] = (inMemoryApiCount[endpoint] || 0) + 1;
    }
    catch(error){
        console.log('error in apiLogger middleware',error)
    }
    next();
};

// Log API hit counts at intervals and reset
setInterval(() => {

    if (Object.keys(inMemoryApiCount).length > 0) {
        logToFile(JSON.stringify(inMemoryApiCount, null, 2)); // Pretty print logs
    }

    fs.readFile(totalLogFilePath, 'utf8', (err, data) => {
        if (err) {
        //   console.log('entering err if')
          console.log("error reading from totalLogFilePath", err);
          fs.writeFile(totalLogFilePath, JSON.stringify(inMemoryApiCount, null, 2), { flag: 'w' }, (err)=>{
            if(err){
                console.log('error creating new file',err)
            }
            else{
                console.log('created new file successfully');
                inMemoryApiCount={}
            }
          })
        } else {
            // console.log('entering data else')
            let jsonData = {} 
            
            if(data){
                jsonData = JSON.parse(data);
            }

            for(const key in inMemoryApiCount){
                // console.log('key is ',key)
                jsonData[key] = (jsonData[key] || 0) + inMemoryApiCount[key];
            }


            fs.writeFile(totalLogFilePath, JSON.stringify(jsonData, null, 2), { flag: 'w' }, (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                }
                else{
                    inMemoryApiCount={}
                }
            });
        }
    });

}, timeToWriteInFile);

// Close file stream on exit
process.on('exit', () => logStream.end());

module.exports = apiLogger;
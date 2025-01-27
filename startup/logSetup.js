const fs = require('fs');
const path = require('path');

// Define the log file path
const logFilePath = path.join(__dirname, '../logFiles/', 'appConsole.log');
const errorLogFilePath = path.join(__dirname, '../logFiles/', 'appError.log');
// console.log('logFilePath is ',logFilePath)
// Create a write stream (append mode)

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
const logStreamE = fs.createWriteStream(errorLogFilePath, { flags: 'a' });
// Function to log messages with timestamps

function logToFile(message) {
  const timestamp = new Date().toISOString();
  logStream.write(`${timestamp} - ${message}\n`);
}

function logToFileE(message) {
  const timestamp = new Date().toISOString();
  logStreamE.write(`${timestamp} - ${message}\n`);
}

// Override console.log
const originalLog = console.log;
console.log = function (...args) {
  const message = args.join(' ');
  logToFile(`INFO: ${message}`); // Write to file
  originalLog.apply(console, args); // Original console.log behavior
};

// Override console.error
const originalError = console.error;
console.error = function (...args) {
  const message = args.join(' ');
  logToFileE(`ERROR: ${message}`); // Write to file
  originalError.apply(console, args); // Original console.error behavior
};
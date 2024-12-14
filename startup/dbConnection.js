const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = "mongodb+srv://rahul012arora:tAL43E364xYa9Wbw@tcap.cgyuo.mongodb.net/?retryWrites=true&w=majority&appName=TCAP";

let database = null;

async function getDatabase() {
    if (!database) {
        try {
            await mongoose.connect(uri, { dbName:"test", useNewUrlParser: true, useUnifiedTopology: true });
            console.log('DB Connected Successfully');
            database = mongoose.connection.db;
        } catch (err) {
            console.error('Error in connection: ' + err);
            throw err;
        }
    }
    return database;
}

module.exports = getDatabase;

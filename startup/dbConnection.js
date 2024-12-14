const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rahul012arora:tAL43E364xYa9Wbw@tcap.cgyuo.mongodb.net/?retryWrites=true&w=majority&appName=TCAP";
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function () {
    mongoose.connect(uri, { useNewUrlParser: true })
        .then(() => console.log('Connected to database '))
        .catch(err => console.error('Error in connection' + err));
}

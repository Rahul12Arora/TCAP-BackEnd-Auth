const getDatabase = require('./dbConnection');

async function listCollections() {
    try {
        const db = await getDatabase();
        const collections = await db.listCollections().toArray();
        console.log('db is',db)
        console.log('db.listCollections().toArray() is',collections)
        // console.log('result is',result)
    } catch (error) {
        console.error('Error listing collections:', error);
    }
}

listCollections();
const getDb = require('./dbConnection');

async function listCollections() {
    try {
        const db = await getDb();
        const collections = await db.listCollections().toArray();
        console.log(collections);
    } catch (error) {
        console.error('Error listing collections:', error);
    }
}

listCollections();
const getDatabase = require('./dbConnection');

async function listCollections() {
    try {
        const db = await getDatabase();
        const collections = await db.listCollections().toArray();
    } catch (error) {
        console.error('Error listing collections:', error);
    }
}

listCollections();
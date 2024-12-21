const getDatabase = require('./dbConnection');

async function listCollections() {
    try {
        const db = await getDatabase();
        const collections = await db.listCollections().toArray();
        console.log('collections are ',collections)
    } catch (error) {
        console.error('Error listing collections:', error);
    }
}

listCollections();
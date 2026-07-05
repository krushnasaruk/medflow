const { MongoMemoryServer } = require('mongodb-memory-server');

async function start() {
  console.log('Starting local in-memory MongoDB server...');
  // Create an in-memory MongoDB instance compatible with both local development and Render (Debian 12+)
  const mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: 'medflow'
    },
    binary: {
      version: '7.0.3'
    }
  });
  
  const uri = mongoServer.getUri();
  console.log(`✅ Local In-Memory MongoDB started at: ${uri}`);
  
  // Set the MONGODB_URI environment variable so the app connects to it
  process.env.MONGODB_URI = uri;
  
  // Start the actual server
  require('./server.js');
}

start().catch(err => {
  console.error('❌ Failed to start local MongoDB:', err);
  process.exit(1);
});

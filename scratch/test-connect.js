const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// Parse .env to get the password
let password = '';
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('MONGODB_URI=')) {
        const parts = trimmed.split('MONGODB_URI=')[1];
        // Match universalinteriorr_db_user:PASSWORD@
        const match = parts.match(/universalinteriorr_db_user:([^@]+)@/);
        if (match) password = match[1];
      }
    });
  }
} catch (e) {
  console.error(e);
}

if (!password) {
  console.error('Could not find password in .env');
  process.exit(1);
}

// Build direct URI
const directUri = `mongodb://universalinteriorr_db_user:${password}@ac-enfi86n-shard-00-00.rnyjmow.mongodb.net:27017,ac-enfi86n-shard-00-01.rnyjmow.mongodb.net:27017,ac-enfi86n-shard-00-02.rnyjmow.mongodb.net:27017/universal-cms-dev?ssl=true&authSource=admin`;

console.log('Attempting direct connection to MongoDB shards...');
MongoClient.connect(directUri)
  .then(client => {
    const topology = client.topology || {};
    const setName = topology.description ? topology.description.setName : 'Unknown';
    console.log('Connection Successful!');
    console.log('Replica Set Name:', setName);
    client.close();
  })
  .catch(err => {
    console.error('Connection Failed:', err.message);
  });

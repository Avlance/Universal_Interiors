import { MongoClient } from 'mongodb';

const uri = "mongodb://universalinteriorr_db_user:l5rH39d3Fkl7xMdE@ac-enfi86n-shard-00-00.rnyjmow.mongodb.net:27017,ac-enfi86n-shard-00-01.rnyjmow.mongodb.net:27017,ac-enfi86n-shard-00-02.rnyjmow.mongodb.net:27017/universal-cms-dev?ssl=true&authSource=admin&replicaSet=atlas-jv7b0z-shard-0";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    
    console.log("Collections:");
    const collections = await db.listCollections().toArray();
    console.log(collections.map(c => c.name));

    console.log("\nSample guide:");
    const guide = await db.collection('guides').findOne({});
    console.log(JSON.stringify(guide, null, 2));

    if (collections.some(c => c.name === 'guides_category_items')) {
        console.log("\nSample guides_category_items:");
        const item = await db.collection('guides_category_items').findOne({});
        console.log(JSON.stringify(item, null, 2));
    } else if (collections.some(c => c.name === 'guide_items')) {
         console.log("\nSample guide_items:");
        const item = await db.collection('guide_items').findOne({});
        console.log(JSON.stringify(item, null, 2));
    }
  } finally {
    await client.close();
  }
}

run().catch(console.error);

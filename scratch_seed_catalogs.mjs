import { MongoClient } from 'mongodb';

const uri = "mongodb://universalinteriorr_db_user:l5rH39d3Fkl7xMdE@ac-enfi86n-shard-00-00.rnyjmow.mongodb.net:27017,ac-enfi86n-shard-00-01.rnyjmow.mongodb.net:27017,ac-enfi86n-shard-00-02.rnyjmow.mongodb.net:27017/universal-cms-dev?ssl=true&authSource=admin&replicaSet=atlas-jv7b0z-shard-0";

async function seedCatalogs() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    
    console.log("Seeding Catalogs...");

    const dummyCatalogs = [
      {
        slug: 'living-room-2025',
        title: 'Living Room Collection 2025',
        description: 'Discover modern, contemporary, and classic living room designs crafted for luxury and comfort.',
        coverImage: 'https://res.cloudinary.com/sevfdaro/image/upload/v1/local_assets_migrated/home/design-ideas/living-room-1.webp',
        totalPages: 10,
        pages: Array.from({length: 10}).map((_, i) => 
          `https://res.cloudinary.com/sevfdaro/image/upload/v1/local_assets_migrated/home/design-ideas/living-room-${(i % 4) + 1}.webp`
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'kitchen-masterpieces',
        title: 'Kitchen Masterpieces',
        description: 'Explore modular kitchens that blend seamless aesthetics with everyday utility.',
        coverImage: 'https://res.cloudinary.com/sevfdaro/image/upload/v1782664264/azure_migrated/guides/kitchen-guide/u-shaped-kitchen-frame.webp',
        totalPages: 8,
        pages: Array.from({length: 8}).map((_, i) => 
          `https://res.cloudinary.com/sevfdaro/image/upload/v1782664264/azure_migrated/guides/kitchen-guide/u-shaped-kitchen-frame.webp`
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'wardrobe-essentials',
        title: 'Wardrobe Essentials',
        description: 'A complete guide to sliding, hinged, and walk-in wardrobe architectures.',
        coverImage: 'https://res.cloudinary.com/sevfdaro/image/upload/v1782664282/azure_migrated/guides/wardrobe-guide/walkin-wardrobe-frame.webp',
        totalPages: 6,
        pages: Array.from({length: 6}).map((_, i) => 
          `https://res.cloudinary.com/sevfdaro/image/upload/v1782664282/azure_migrated/guides/wardrobe-guide/walkin-wardrobe-frame.webp`
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'luxury-bedrooms',
        title: 'Luxury Bedrooms',
        description: 'Transform your resting spaces into a 5-star suite with our luxury bedroom designs.',
        coverImage: 'https://res.cloudinary.com/sevfdaro/image/upload/v1782664290/azure_migrated/guides/wardrobe-guide/bedroom-isometric.webp',
        totalPages: 8,
        pages: Array.from({length: 8}).map((_, i) => 
          `https://res.cloudinary.com/sevfdaro/image/upload/v1782664290/azure_migrated/guides/wardrobe-guide/bedroom-isometric.webp`
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await db.collection('catalogs').deleteMany({});
    await db.collection('catalogs').insertMany(dummyCatalogs);

    console.log("Successfully seeded catalogs.");
  } finally {
    await client.close();
  }
}

seedCatalogs().catch(console.error);

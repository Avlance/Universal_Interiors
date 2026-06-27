/**
 * In-memory mock database for local development.
 * Mimics the MongoDB Node.js driver collection API so all API routes
 * work without a real MongoDB connection.
 *
 * Activated when MONGODB_URI=mock in .env
 */

// Shared in-memory store across all calls (survives HMR in dev thanks to global)
if (!global._mockStore) {
  global._mockStore = {};
}

function getStore(collectionName) {
  if (!global._mockStore[collectionName]) {
    global._mockStore[collectionName] = [];
  }
  return global._mockStore[collectionName];
}

function matchesFilter(doc, filter) {
  return Object.keys(filter).every((key) => {
    if (key === '_id') return doc._id === filter._id;
    return doc[key] === filter[key];
  });
}

class MockCollection {
  constructor(name) {
    this.name = name;
  }

  // find() is synchronous (returns a cursor), matching the real MongoDB driver API
  find(filter = {}) {
    const store = getStore(this.name);
    const results = Object.keys(filter).length === 0
      ? [...store]
      : store.filter((doc) => matchesFilter(doc, filter));

    // Chainable cursor
    let _skip = 0;
    let _limit = Infinity;

    const cursor = {
      skip(n) { _skip = n; return cursor; },
      limit(m) { _limit = m; return cursor; },
      async toArray() {
        return results.slice(_skip, _limit === Infinity ? undefined : _skip + _limit);
      },
    };

    return cursor;
  }

  async findOne(filter = {}) {
    const store = getStore(this.name);
    return store.find((doc) => matchesFilter(doc, filter)) || null;
  }

  async insertOne(doc) {
    const store = getStore(this.name);
    const newDoc = {
      _id: doc._id || `mock_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      ...doc,
    };
    store.push(newDoc);
    console.log(`[MockDB] insertOne into '${this.name}':`, JSON.stringify(newDoc, null, 2));
    return { insertedId: newDoc._id, acknowledged: true };
  }

  async replaceOne(filter, replacement, options = {}) {
    const store = getStore(this.name);
    const index = store.findIndex((doc) => matchesFilter(doc, filter));
    if (index !== -1) {
      store[index] = { ...store[index], ...replacement };
      console.log(`[MockDB] replaceOne in '${this.name}':`, JSON.stringify(store[index], null, 2));
      return { matchedCount: 1, modifiedCount: 1, upsertedId: null, acknowledged: true };
    } else if (options.upsert) {
      const newDoc = {
        _id: replacement._id || filter._id || `mock_${Date.now()}`,
        ...replacement,
      };
      store.push(newDoc);
      console.log(`[MockDB] upserted into '${this.name}':`, JSON.stringify(newDoc, null, 2));
      return { matchedCount: 0, modifiedCount: 0, upsertedId: newDoc._id, acknowledged: true };
    }
    return { matchedCount: 0, modifiedCount: 0, upsertedId: null, acknowledged: true };
  }

  async deleteOne(filter = {}) {
    const store = getStore(this.name);
    const index = store.findIndex((doc) => matchesFilter(doc, filter));
    if (index !== -1) {
      store.splice(index, 1);
      return { deletedCount: 1, acknowledged: true };
    }
    return { deletedCount: 0, acknowledged: true };
  }
}

export class MockDb {
  collection(name) {
    return new MockCollection(name);
  }
}

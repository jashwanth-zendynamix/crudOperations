const db = require("../models/index");

class CacheService {
  constructor() {
    this.db = db.cacheModel;
  }

  async create(cacheData) {
    try {
      const newCache = new this.db(cacheData);
      return newCache.save();
    } catch (err) {
      throw err;
    }
  }

  async find(id) {
    try {
      return this.db.find({ _id: id });
    } catch (err) {
      throw err;
    }
  }

  async update(id, cacheData) {
    try {
      return this.db.updateOne({ _id: id }, cacheData);
    } catch (err) {
      throw err;
    }
  }

  async delete(id) {
    try {
      return this.db.findOneAndDelete({ _id: id });
    } catch (err) {
      throw err;
    }
  }
}

const cacheService = new CacheService();
module.exports = cacheService;

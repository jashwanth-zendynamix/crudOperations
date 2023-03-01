const db = require("../models/index");

class UserService {
  constructor() {
    this.db = db.userModel;
  }

  async create(userData) {
    try {
      const newUser = new this.db(userData);
      return newUser.save();
    } catch (err) {
      throw err;
    }
  }

  async find(obj = {}) {
    try {
      return this.db.find(obj);
    } catch (err) {
      throw err;
    }
  }

  async update(id, userData) {
    try {
      return this.db.updateOne({ _id: id }, userData);
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

const userService = new UserService();
module.exports = userService;

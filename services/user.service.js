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

  async update(email, userData) {
    try {
      return this.db.updateOne({ email: email }, userData);
    } catch (err) {
      throw err;
    }
  }

  async delete(email) {
    try {
      return this.db.findOneAndDelete({ email: email });
    } catch (err) {
      throw err;
    }
  }
}

const userService = new UserService();
module.exports = userService;

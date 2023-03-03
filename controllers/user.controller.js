const userService = require("../services/user.service");
const { deleteFile } = require("../services/file.service");
const cacheService = require("../services/cache.service");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

function sendResponse(res, status, obj) {
  res.setHeader("content-type", "application/json");
  res.writeHead(status);
  res.end(JSON.stringify(obj));
}

function createError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

async function getImageById(req, res) {
  try {
    const id = req.params.id;
    if (myCache.has(id)) {
      const image = myCache.get(id).image;
      const buffer = Buffer.from(image, "base64");
      res.setHeader("Content-Type", "image/jpg");
      res.writeHead(200);
      res.end(buffer);
      return;
    }

    const findRes = await userService.find({ _id: id });
    if (findRes.length === 0) {
      throw createError(404, `no image found with given id`);
    }

    const image = findRes[0]._doc.image;
    const buffer = Buffer.from(image, "base64");
    res.setHeader("Content-Type", "image/jpg");
    res.writeHead(200);
    res.end(buffer);
  } catch (err) {
    sendResponse(res, err.status || 500, { message: err.message });
  }
}

async function createUser(req, res) {
  try {
    const email = req.body.email;
    const findRes = await userService.find({ email: email });
    if (findRes.length !== 0) {
      throw createError(409, `user with given email: ${email} already exists`);
    }

    const createRes = await userService.create(req.body);
    sendResponse(res, 201, createRes._doc);
  } catch (err) {
    sendResponse(res, err.status || 500, { message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const findRes = await userService.find({ _id: id });
    if (findRes.length === 0) {
      throw createError(404, `no user found with given id: ${id}`);
    }

    await userService.delete(id);
    myCache.del(id);
    sendResponse(res, 201, { message: "user delete successfully" });
  } catch (err) {
    sendResponse(res, err.status || 500, { message: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const findRes = await userService.find({ _id: id });
    if (findRes.length === 0) {
      throw createError(404, `user with id: ${id} doesn't exists`);
    }

    await userService.update(id, req.body);
    const updateRes = await userService.find({ _id: id });
    myCache.set(id, updateRes);
    sendResponse(res, 200, { message: "user updated successfully" });
  } catch (err) {
    sendResponse(res, err.status || 500, { message: err.message });
  }
}

async function findUserById(req, res) {
  try {
    const id = req.params.id;
    if (myCache.has(id)) {
      sendResponse(res, 200, myCache.get(id));
      return;
    }

    const findRes = await userService.find({ _id: id });
    if (findRes.length === 0) {
      throw createError(404, `no user found with given id: ${id}`);
    }

    const doc = findRes[0]._doc;
    // await cacheService.create({ _id: doc._id });
    myCache.set(id, doc);
    sendResponse(res, 200, findRes);
  } catch (err) {
    sendResponse(res, err.status || 500, { message: err.message });
  }
}

async function getAllUser(req, res) {
  try {
    const findRes = await userService.find();
    if (findRes.length === 0) {
      throw createError(404, "no users found");
    }

    sendResponse(res, 200, findRes);
  } catch (err) {
    sendResponse(res, err.status || 500, { message: err.message });
  }
}

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  findUserById,
  getAllUser,
  getImageById,
};

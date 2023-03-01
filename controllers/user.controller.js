const userService = require("../services/user.service");
const { deleteFile } = require("../services/file.service");

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
    deleteFile(req.files[0].filename);
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

    deleteFile(findRes[0]._doc.image);
    userService.delete(id);
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

    if (req.files.length > 0) deleteFile(findRes[0]._doc.image);
    const updateRes = await userService.update(id, req.body);
    sendResponse(res, 200, { message: "user updated successfully" });
  } catch (err) {
    if (req.files) deleteFile(req.files[0].filename);
    sendResponse(res, err.status || 500, { message: err.message });
  }
}

async function findUserById(req, res) {
  try {
    const findRes = await userService.find({ _id: req.params.id });
    if (findRes.length === 0) {
      throw createError(404, `no user found with given id: ${req.params.id}`);
    }

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
};

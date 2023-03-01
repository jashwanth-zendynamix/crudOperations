const userService = require("../services/user.service");

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
    sendResponse(res, err.status || 500, { message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const email = req.params.email;
    const findRes = await userService.find({ email: email });
    if (findRes.length === 0) {
      throw createError(404, `no user found with given email: ${email}`);
    }

    userService.delete(email);
    sendResponse(res, 201, { message: "user delete successfully" });
  } catch (err) {
    sendResponse(res, err.status || 500, { message: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const email = req.params.email;
    const findRes = await userService.find({ email: email });
    if (findRes.length === 0) {
      throw createError(404, `user with email: ${email} doesn't exists`);
    }

    const updateRes = await userService.update(email, req.body);
    sendResponse(res, 200, { message: "user updated successfully" });
  } catch (err) {
    sendResponse(res, err.status || 500, { message: err.message });
  }
}

async function findUserByQuery(req, res) {
  try {
    const findRes = await userService.find(req.query);
    if (findRes.length === 0) {
      throw createError(
        404,
        `no user found with given ${Object.keys(req.query)[0]}`
      );
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
  findUserByQuery,
  getAllUser,
};

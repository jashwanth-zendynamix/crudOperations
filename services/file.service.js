const multer = require("multer");
const crypto = require("crypto");
const { uploadDir } = require("../app");
const path = require("path");
const fs = require("fs");

function uploadFile(req, res, next) {
  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, callBack) {
        callBack(null, uploadDir);
      },
      filename: function (req, file, callBack) {
        callBack(
          null,
          crypto.randomBytes(20).toString("hex") +
            path.extname(file.originalname)
        );
      },
    }),
  }).any();

  upload(req, res, (err) => {
    if (err) {
      res.setHeader("content-type", "application/json");
      res.writeHead(500);
      res.end(JSON.stringify({ message: err.message }));
    }
    req.files?.forEach((file) => {
      req.body[file.mimetype.split("/")[0]] = file.filename;
    });
    next();
  });
}

function deleteFile(filename) {
  fs.unlink(uploadDir + "/" + filename, (err) => {});
}
module.exports = { uploadFile, deleteFile };

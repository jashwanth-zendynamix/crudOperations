const db = require("./models/index");
function validateId(req, res, next) {
  if (db.mongoose.Types.ObjectId.isValid(req.params.id)) {
    next();
  } else {
    res.setHeader("content-type", "application/json");
    res.writeHead(403);
    res.end(JSON.stringify({ message: "invalid id" }));
  }
}

module.exports = validateId;

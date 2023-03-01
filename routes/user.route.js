const { express } = require("../app");
const userController = require("../controllers/user.controller");
const validateId = require("../id.validator");
const router = express.Router();
const { uploadFile } = require("../services/file.service");

router.get("/find/:id", [validateId], userController.findUserById);
router.get("/findAll", userController.getAllUser);
router.put("/update/:id", [validateId, uploadFile], userController.updateUser);
router.post("/create", [uploadFile], userController.createUser);
router.delete("/delete/:id", [validateId], userController.deleteUser);

module.exports = router;

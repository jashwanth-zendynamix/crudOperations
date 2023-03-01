const { express } = require("../app");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get("/find", userController.findUserByQuery);
router.get("/findAll", userController.getAllUser);
router.put("/update/:email", userController.updateUser);
router.post("/create", userController.createUser);
router.delete("/delete/:email", userController.deleteUser);

module.exports = router;

const { addMsg, getAllMsg } = require("../controllers/messagesController");
const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/addmsg", addMsg);
router.post("/getmsg", getAllMsg);

module.exports = router;

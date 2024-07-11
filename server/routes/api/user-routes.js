const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../../controllers/user-controller');


const { authMiddleware } = require('../../utils/auth');



module.exports = router;

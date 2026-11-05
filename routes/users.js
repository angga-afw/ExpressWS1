// Router utama
var express = require('express');
var router = express.Router();
const VerifyToken = require('../middleware/VerifyToken');

const usersController = require('../controller/users');

/* GET users listing. */
router.get('/',VerifyToken, usersController.getusers.getUsers);
router.post('/register',VerifyToken, usersController.register);
router.put('/update/:id', VerifyToken, usersController.update);
router.delete('/delete/:id', VerifyToken, usersController.deluser);
router.post('/login', usersController.login);

module.exports = router;

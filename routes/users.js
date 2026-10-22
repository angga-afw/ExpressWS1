// Router utama
var express = require('express');
var router = express.Router();

const usersController = require('../controller/users');

/* GET users listing. */
router.get('/', usersController.getusers.getUsers);
router.post('/register', usersController.register);

module.exports = router;

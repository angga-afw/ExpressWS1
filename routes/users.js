// Router utama
var express = require('express');
var router = express.Router();

const usersController = require('../controller/users');

/* GET users listing. */
router.get('/', usersController.getusers.getUsers);

module.exports = router;

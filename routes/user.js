'use strict'

var express = require('express');
var userController = require('../controllers/userController');

var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });

var api = express.Router();

api.post('/login', userController.login);
api.post('/register', userController.register)
api.put('/modifyuser/:id', userController.modifyuser)
api.get('/getusers', userController.getUsers)
api.put('/resetuser/:id', userController.resetUser)
api.delete('/resetuser/:id', userController.deleteUser)
module.exports = api;
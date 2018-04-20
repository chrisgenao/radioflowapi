'use strict'

var express = require('express');
var reglaController = require('../controllers/reglaController');

var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });

var api = express.Router();

api.get('/getreglas', reglaController.getReglas);
module.exports = api;
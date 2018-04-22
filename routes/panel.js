'use strict'

var express = require('express');
var horaController = require('../controllers/horaController');

var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });

var api = express.Router();

api.get('/getHoras', horaController.getHoras);
api.put('/takehora/:id', horaController.takeHora);
api.put('/clearhora/:id', horaController.clearHora);

module.exports = api;
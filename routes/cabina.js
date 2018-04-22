'use strict'

var express = require('express');
var cabinaController = require('../controllers/cabinaController');

var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });

var api = express.Router();

api.get('/getpeticionesbyuser/:id', cabinaController.getPeticionesByUser);
api.delete('/deletepeticion/:peticion_id', cabinaController.deletePeticion)


module.exports = api;
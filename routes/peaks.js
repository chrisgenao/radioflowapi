'use strict'

var express = require('express');
var peakController = require('../controllers/peakController');

var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });

var api = express.Router();

api.post('/savePeak', peakController.savePeak)

module.exports = api;
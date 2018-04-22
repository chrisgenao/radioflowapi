'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    usuario: String,
    habbo_name: String,
    password: String,
    role: String
})

module.exports = mongoose.model('User', userSchema);
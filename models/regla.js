'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate')

var reglaSchema = new Schema({
    descripcion: String,
    tipo: String
})

reglaSchema.plugin(autopopulate)


module.exports = mongoose.model('regla', reglaSchema);
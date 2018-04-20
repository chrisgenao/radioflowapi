'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate')

var userSchema = new Schema({
    hora: String,
    locutor_select: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'habbo_name'}
    }
})

userSchema.plugin(autopopulate)


module.exports = mongoose.model('hora', userSchema);
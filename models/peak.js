'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate')

var peakSchema = new Schema({
    hora: {
        type: Date, default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'habbo_name'}
    },
    cantidad: String
})

peakSchema.plugin(autopopulate)


module.exports = mongoose.model('peak', peakSchema);
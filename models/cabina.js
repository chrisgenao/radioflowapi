'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate')

var cabinaSchema = new Schema({
    habbo_nombre: String,
    user_assign: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'habbo_name'}
    },
    tipo_peticion: String,
    comentario: String,
    fecha: { type: Date, default: Date.now() }
})

cabinaSchema.plugin(autopopulate)

cabinaSchema.statics.findByUser = function (user_id) {
    return this.find({ user_assign: user_id }).exec()
}


module.exports = mongoose.model('peticione', cabinaSchema);

'use strict'

var jwtSimple = require('jwt-simple');
var moment = require('moment');
var secret = "claveSecretaMenteMamasita";

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        usuario: user.usuario,
        habbo_name: user.habbo_name,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(1, 'hours').unix()
    }

    return jwtSimple.encode(payload, secret);
}
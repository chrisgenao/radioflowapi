'use strict'

//Modelos
var Regla = require('../models/regla');

//Servicios
var jwtService = require('../services/jwt');

function getReglas(req, res) {

    Regla.find((err, reglas) => {
        res.status(200).send(reglas)
    })
}

module.exports = {
    getReglas
}
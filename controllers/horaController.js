'use strict'

//Modelos
var Hora = require('../models/hora');

//Servicios
var jwtService = require('../services/jwt');

function getHoras(req, res) {
    Hora.find((err, horas) => {
        res.status(200).send(horas)
    })

    console.log("que asa")
}

function takeHora(req, res) {

    var horaId = req.params.id
    var update = req.body;

    Hora.findByIdAndUpdate(horaId, update, { new: true }, (err, horaUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            })
        } else {
            if (!horaUpdated) {
                res.status(404).send({
                    message: "No se ha actualizado el animal."
                })
            } else {
                res.status(200).send(horaUpdated)
            }
        }
    })
}

function clearHora(req, res) {

    var horaId = req.params.id
    var update = req.body;
    
    Hora.findByIdAndUpdate(horaId, update, { new: true }, (err, horaUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            })
        } else {
            if (!horaUpdated) {
                res.status(404).send({
                    message: "No se ha actualizado el animal."
                })
            } else {
                console.log(horaUpdated)
                res.status(200).send(horaUpdated)
            }
        }
    })
}

module.exports = {
    takeHora,
    getHoras,
    clearHora
}
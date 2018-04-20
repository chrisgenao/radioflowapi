'use strict'

//Modelos
var Cabina = require('../models/cabina');
const async = require('co')

//Servicios
var jwtService = require('../services/jwt');

exports.getPeticionesByUser = async.wrap(function* (req, res){
    
    var userId = req.params.id

    var peticiones = yield Cabina.findByUser(userId)


    res.status(200).send(peticiones)


})


exports.deletePeticion = async.wrap(function* (req, res){

    var peticionId = req.params.peticion_id;

    Cabina.findByIdAndRemove(peticionId, (err, peticionRemoved) => {
        if (err){
            res.status(500).send({
                message: "Error en la peticion."
            })  
        }else{
            if (!peticionRemoved){
                res.status(404).send({
                    message: "No se pudo borrar el animal"
                })
            }else{
                res.status(200).send({
                    peticion: peticionRemoved
                })
            }
        }
    })
})

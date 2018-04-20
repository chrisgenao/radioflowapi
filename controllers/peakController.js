'use strict'
//modulos internos de node
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
//Modelos
var Peak = require('../models/peak');

//Servicios
var jwtService = require('../services/jwt');

function savePeak(req, res){
    var peak = new Peak();

    var params = req.body;

    if(params){

        peak.user = params.user;
        peak.cantidad = params.cantidad;

        console.log(peak)
        peak.save((err, peakStored) => {
            if (err){
                console.log(err)
                res.status(500).send({ message: "Ha ocurrido un error en el servidor."})
            }else{
                if (!peakStored){
                    res.status(404).send({ message: "Ha ocurrido un error y no se ha guardo el animal"});
                }else{
                    res.status(200).send({ peak: peakStored, message: "Transaccion Exitosa"})
                }
            }
        })
    }else{
        res.status(200).send({
            message: "El nombre del animal es obligatorio."
        })
    }
}

function uploadImage(req, res){
    var userId = req.params.user_id;
    var file_name = "no subido..";

    console.log("Entramos")

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];


        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1]

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'|| file_ext == 'gif'){

            if (userId != req.user.sub){
                return res.status(500).send({ message: "No tienes permiso para subir esta imagen"})
            }
        
            User.findByIdAndUpdate(userId, { image: file_name}, {new: true}, (err, userUpdated) =>{
                if (err){
                    res.status(500).send({
                        message: "Error al actualizar usuario"
                    })  
                }else{
                    if (!userUpdated){
                        res.status(404).send({
                            message: "No se pudo actualizar el usuario"
                        })
                    }else{
                        res.status(200).send({
                            user: userUpdated,
                            image: file_name    
                        })

                        console.log("Enviamos")
                    }
                }
            })
        }else{
            fs.unlink(file_path, (err) =>{
                if (err){
                    res.status(200).send({ message: 'Fichero no Borrado'})
                }else{
                    res.status(200).send({ message: 'Extension no es valida'})
                }
            })
        }
    }else{
        res.status(200).send({ message: "No se ha subido ningun archivo.."})
    }
}


module.exports = {
    savePeak,
    uploadImage
}
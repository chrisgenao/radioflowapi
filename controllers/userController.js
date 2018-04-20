'use strict'
//modulos internos de node
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
//Modelos
var User = require('../models/user');

//Servicios
var jwtService = require('../services/jwt');

function login(req, res) {
    var params = req.body;
    console.log(params)

    var usuario = params.usuario;
    var password = params.password;

    User.findOne({ usuario: usuario.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error al comprobar el usuario" })
        } else {
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        //Comprobar y generar el token.
                        if (params.gettoken) {
                            //devolver token.
                            res.status(200).send({
                                token: jwtService.createToken(user)
                            })
                        } else {
                            res.status(200).send({ user })
                        }
                    } else {
                        res.status(404).send({
                            message: "El usuario no ha podido logearse"
                        })
                    }
                })
            } else {
                res.status(404).send({
                    message: 'El usuario no ha podido conectarse'
                })
            }
        }
    })
}

function register(req, res) {
    var user = new User();
    var params = req.body;

    if (params.password && params.usuario && params.habbo_name && params.role) {
        user.usuario = params.usuario;
        user.habbo_name = params.habbo_name;
        user.role = params.role

        User.findOne({ usuario: user.usuario.toLowerCase() }, (err, userFound) => {
            if (err) {
                res.status(500).send({ message: "Error al comprobar el usuario" })
            } else {
                if (!userFound) {
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        if (err) {
                            console.log(err)
                        } else {
                            //Guardo usuario en BD.
                            user.password = hash
                            user.save((err, userStored) => {
                                if (err) {
                                    res.status(500).send({ message: "Error al guardar el Usuario" })
                                } else {
                                    if (!userStored) {
                                        res.status(404).send({ message: "No se ha registrado el usuario" })
                                    } else {
                                        res.status(200).send({ user: userStored, message: "Transaccion Exitosa", status: "ok" })
                                    }
                                }
                            })
                        }
                    });
                } else {
                    res.status(500).send({ message: "El usuario ya existe" });
                }
            }
        })
    }
}

function modifyuser(req, res) {

    let user_id = req.params.id
    let params = req.body

    User.findById(user_id, (error, userFound) => {

        bcrypt.compare(params.old_password, userFound.password, (err, check) => {
            if (check) {
                //Comprobar y generar el token.

                bcrypt.hash(params.new_password, null, null, function (err, hash) {
                    if (err) {
                        console.log(err)
                    } else {
                        userFound.password = hash

                        User.findByIdAndUpdate(user_id, userFound, { new: true }, (err, userUpdated) => {
                            if (err) {
                                res.status(500).send({
                                    message: "Error en la peticion"
                                })
                            } else {
                                if (!userUpdated) {
                                    res.status(404).send({
                                        message: "No se ha actualizado el animal."
                                    })
                                } else {
                                    res.status(200).send({ message: "Transaccion Exitosa", status: "ok" })
                                }
                            }
                        })
                    }
                })
            } else {
                res.status(200).send({ message: "Contraseñas no coinciden.", status: "bad" })
            }
        })
    })
}

function getUsers(req, res) {
    User.find((err, usersFound) => {
        res.status(200).send(usersFound)
    })
}

function resetUser(req, res) {

    let userId = req.params.id

    User.findById(userId, (error, userFound) => {
        if (error) {
            res.status(500).send({ message: "Ha ocurrido un error en el servidor.", status: "bad", error: error })
        } else {
            if (!userFound) {
                res.status(404).send({ message: "El usuario no ha sido encontrado.", status: "bad" });

            } else {
                bcrypt.hash("123", null, null, function (error, hash) {
                    if (error) {
                        res.status(500).send({ message: "Ha ocurrido un error en el servidor.", status: "bad", error: error })
                    } else {
                        if (!hash) {
                            res.status(404).send({ message: "Ha ocurrido un error en el servidor.", status: "bad", error: error })
                        } else {
                            userFound.password = hash

                            User.findByIdAndUpdate(userId, userFound, { new: true }, (err, userUpdated) => {
                                if (err) {
                                    res.status(500).send({ message: "Ha ocurrido un error en el servidor.", status: "bad", error: error })

                                } else {
                                    if (!userUpdated) {
                                        res.status(404).send({ message: "Ha ocurrido un error en el servidor.", status: "bad", error: error })
                                    } else {
                                        res.status(200).send({ message: "Transaccion Exitosa", status: "ok", user: userUpdated })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}

function deleteUser(req, res) {

}

module.exports = {
    getUsers,
    login,
    register,
    modifyuser,
    resetUser,
    deleteUser
}
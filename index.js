'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 3789;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/radioflowdb')
    .then(() => {
        console.log('La conexion a la base de datos ha sido establecida.');

        app.listen(port, () => {
            console.log("El servidor esta corriendo.")
        })
    })
    .catch(err => console.log(err)) 
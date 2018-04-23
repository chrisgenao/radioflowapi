'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var clearPanel = require('./services/clearPanel');

//cargar Rutas.
var userRoutes = require('./routes/user');
var panelRoutes = require('./routes/panel');
var cabinaRoutes = require('./routes/cabina');
var reglaRoutes = require('./routes/reglas');
var peakRoutes = require('./routes/peaks');

//Configurar Middlewares de BodyParser.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//Configurar el CORS.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
})


//configurar rutas base.
app.use('/api', userRoutes)
app.use('/api', panelRoutes)
app.use('/api', cabinaRoutes)
app.use('/api', reglaRoutes)
app.use('/api', peakRoutes)

module.exports = app;
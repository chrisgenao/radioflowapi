'use strict'

var mongoose = require('mongoose')
var CronJob = require('cron').CronJob;
var Horas = require('../models/hora');
var job = new CronJob('00 00 * * *', function () {

    let update = {
        "locutor_select": null
    }

    Horas.find((err, horas) => {
        horas.forEach(function (hora) {
            Horas.findByIdAndUpdate(hora._id, update, { new: true }, (err, horaUpdated) => {
                console.log(horaUpdated)
            })
        })
    })
}, null, null, "America/Santiago")

job.start()
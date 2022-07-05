const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}).set('timestamps', true)

module.exports = mongoose.model('Vehicle', vehicleSchema)
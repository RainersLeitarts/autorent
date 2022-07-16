import { Schema, model, models } from 'mongoose'

const vehicleSchema = new Schema({
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

module.exports = models.Vehicle || model('Vehicle', vehicleSchema)
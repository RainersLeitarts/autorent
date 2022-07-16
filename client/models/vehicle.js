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
    },
    engineVolume: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    gearbox: {
        type: String,
        required: true
    },
    doors: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    cruise: {
        type: Boolean,
        required: true
    },
    images: [String]
}).set('timestamps', true)

module.exports = models.Vehicle || model('Vehicle', vehicleSchema)
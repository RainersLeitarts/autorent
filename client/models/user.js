import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}).set('timestamps', true)

module.exports = models.User || mongoose.model('User', userSchema)
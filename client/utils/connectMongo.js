import mongoose from 'mongoose'

console.log(process.env.MONGODB_URI)

const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI)

export default connectMongo
import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const dbString = process.env.MongoDB_String
        const connect = await mongoose.connect(dbString)
        console.info(`Connected to you database: ${mongoose.connection.name}`.blue.bgCyan.bold)
    } catch (error) {
        console.error(error)
    }
}
export default connectDB
import mongoose from "mongoose";

export const mongodbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URI)

        console.log(`the mongodb is connected to ${connection.connection.host}`)
    } catch (error) {
        console.error(`error getting the connection ${error}`)
        process.exit(1)
    }
}
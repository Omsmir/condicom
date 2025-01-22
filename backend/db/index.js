import mongoose from "mongoose";

export const mongodbConnection = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_PRODUCTS_DATABASE_URI}`,{
           
                user:process.env.MONGODB_USERNAME,
                pass:process.env.MONGODB_PWD,
                dbName:"products"
            
    })

      console.log(`the server is connected to database:${connection.connection.name}`)
    } catch (error) {
        console.error(`error getting the connection ${error}`)
        process.exit(1)
    }
}

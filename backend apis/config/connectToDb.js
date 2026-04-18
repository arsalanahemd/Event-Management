import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connected to db sucessfully")

    } catch (error) {
        console.log(`Connected to db Failed: ${error}`)
    }
}

export default connectToDB;
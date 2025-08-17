import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGODB connected successfully");
        return response
    } catch (error) {
        console.log("MONGODB connection error", error.message);
        process.exit(1);
    }
}

export default connectDB;
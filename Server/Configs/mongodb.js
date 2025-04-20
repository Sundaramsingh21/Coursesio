import mongoose from "mongoose";

//Connect to the MongoDb database

const connectDB = async () => {

    await mongoose.connect(`${process.env.MONGODB_URI}/Coursesio`).then(() => console.log("DB Connected"));

}

export default connectDB
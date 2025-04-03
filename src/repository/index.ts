import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const env = process.env.NODE_ENV;
        const username = process.env.db_username;
        const password = process.env.db_password;
        const database = process.env.database;
        const mongoURI = `mongodb+srv://${username}:${password}@xcorpion-work.6sg9o34.mongodb.net/${database}-${env}?retryWrites=true&w=majority&appName=Xcorpion-Work`;
        await mongoose.connect(mongoURI);
        console.log(`MongoDB ${database}-${env} connected...`);
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

export default connectDB;

import mongoose from 'mongoose';
const connectToDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined');
        }
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
};
export default connectToDB;
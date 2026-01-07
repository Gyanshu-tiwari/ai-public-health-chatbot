import mongoose from 'mongoose';


const connectDB = async () => {
  const uri = process.env.MONGODB_URI ;

  try {
    await mongoose.connect(uri, {
      autoIndex: true
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
};

export default connectDB;
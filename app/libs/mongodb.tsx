import mongoose from 'mongoose';

const connect = async (callback?: () => Promise<void>) => {
  try {
    const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

    if (!callback) {
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(mongodbUri);
        console.log('Connected to MongoDB');
      }
    }
    else {
      await mongoose.connect(mongodbUri);
      console.log('Connected to MongoDB');
      await callback();
      mongoose.connection.close();
    }
  } catch (err) {
    console.log(err);
  }
}

export default { connect }
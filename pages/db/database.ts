import mongoose from 'mongoose';

export default mongoose.connect(<string>process.env.DATABASE_URI);

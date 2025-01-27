import mongoose from 'mongoose';

const { Schema } = mongoose;

const OTPSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  otp: {
    type: String,
    required: [true, 'OTP is required'],
  }
});

export default mongoose.model('OTP', OTPSchema);

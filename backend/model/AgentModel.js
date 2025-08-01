// backend/model/agentModel.js
import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
    match: /^\+\d{1,3}\d{7,14}$/, // e.g. +919876543210
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Agent = mongoose.model('Agent', agentSchema);
export default Agent;

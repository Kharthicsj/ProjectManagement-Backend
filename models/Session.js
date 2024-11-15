import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    expirationDate: { type: Date, required: true }
});

export default mongoose.model('Session', sessionSchema);

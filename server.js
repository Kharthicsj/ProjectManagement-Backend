import express from 'express';
import api from './routes/index.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';

dotenv.config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
  }, () => console.log('MongoDB connected'));

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,  // 2 hours
        secure: process.env.NODE_ENV === 'production'
    }
}));

// Routes
app.use(api);

const PORT = process.env.SERVER_PORT || 9000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

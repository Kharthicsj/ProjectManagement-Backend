import express from 'express';
import api from './routes/index.js';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();

// MongoDB connection
async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://kharthicsj:BN1M1AbEspn0muOV@projectmanagementsystem.tyurl.mongodb.net/ProjectManagementSystem?retryWrites=true&w=majority&appName=ProjectManagementSystem', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
        });
        console.log('MongoDB connected');
        // Start the server after successful connection
        const PORT = process.env.SERVER_PORT || 9000;
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit on failure
    }
}

connectDB();

// Middlewares
app.use(cors({ origin: ['http://localhost:3000','https://project-management-frontend-magf.onrender.com'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration with MongoDB Store
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://kharthicsj:BN1M1AbEspn0muOV@projectmanagementsystem.tyurl.mongodb.net/ProjectManagementSystem?retryWrites=true&w=majority&appName=ProjectManagementSystem',
        collectionName: 'sessions',
    }),
    cookie: {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
    }
}));

// Routes
app.use(api);

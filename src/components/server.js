import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Add your frontend origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files and parse JSON-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use(express.json()); // Parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Set Content Security Policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", "http://localhost:3000"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["*"], // Allow fonts from any source during development
        connectSrc: ["'self'", "http://localhost:3000"],
        imgSrc: ["'self'", "data:"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"]
    }
}));
// Comment out the existing CSP middleware
// app.use(helmet.contentSecurityPolicy({...}));

// Replace with a more permissive CSP or remove it completely
app.use(helmet({
    contentSecurityPolicy: false
}));

// MongoDB Connection (Use environment variables in production)
mongoose.connect('mongodb+srv://priyanshujoshi10000:J0htCvDMozlYWyRa@cluster0.w6mxx.mongodb.net/Hola', {});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error("MongoDB connection error:", error);
});

db.once('open', () => {
    console.log("DB Connected");
});

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    Username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

// Login Route
app.post('/login', async (req, res) => {
    console.log('Login Attempt Received:', req.body);

    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and Password are required' });
        }

        // Check if username/email exists in the database (case-insensitive)
        const user = await User.findOne({
            $or: [
                { email: username.toLowerCase() }, 
                { Username: username.toLowerCase() }
            ]
        });

        if (!user) {
            console.log('User not found:', username);
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Invalid credentials for user:', username);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Successful login
        res.status(200).json({ 
            message: 'Login successful', 
            userId: user._id,
            username: user.username
        });

    } catch (error) {
        console.error('Detailed Login Error:', error);
        res.status(500).json({ 
            message: 'Server error during login', 
            error: error.message 
        });
    }
});

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { name, number, email, username, password } = req.body;

        // Validate input
        if (!name || !number || !email || !username || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            number: number,
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: hashedPassword
        });

        // Save user to the database
        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            userId: savedUser._id
        });

    } catch (error) {
        console.error('Detailed Signup Error:', error);

        // Handle duplicate key errors
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Email or Username already exists'
            });
        }

        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
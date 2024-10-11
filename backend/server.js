const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Create CORS restraints
const corsOption = {
    origin: 'http://localhost:5173',  // Frontend origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    optionSuccessStatus: 200
}

// Init Middleware
app.use(express.json());
app.use(cors(corsOption));  // Enable CORS for frontend communication
app.use(helmet());

// Define routes
app.use('/api/internships', require('./routes/internships'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/scholarships', require('./routes/scholarships'));
app.use('/api/organizations', require('./routes/organizations'));
app.use('/api/users', require('./routes/users'));
app.use('/api/saved', require('./routes/savedResources'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

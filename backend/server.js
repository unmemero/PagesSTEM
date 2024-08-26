const express = require('express');
const connectDB = require('./config/db');
/*
const cors = require('cors');
const helmet = require('helmet');
*/
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//Connect to DB
connectDB();

//Create cors restraints (May uncomment later)
/*
const corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    optionSuccessStatus: 200
}
*/

//Init Middleware (may uncomment later cors)
app.use(express.json());
/*
app.use(cors(corsOption));
app.use(helmet());
*/

//Define routes
app.use('/api/internships',require('./routes/internships'));
app.use('/api/jobs',require('./routes/jobs'));
app.use('/api/scholarships',require('./routes/scholarships'));
app.use('/api/organizations',require('./routes/organizations'));
app.use('/api/users',require('./routes/users'));
app.use('/api/saved',require('./routes/savedResources'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));

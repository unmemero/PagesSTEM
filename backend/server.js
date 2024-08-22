const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//Connect to DB
connectDB();

//Init Middleware
app.use(express.json());

//Define routes
app.use('/api/internships',require('./routes/internships'));
app.use('/api/jobs',require('./routes/jobs'));
app.use('/api/scholarships',require('./routes/scholarships'));
app.use('/api/organiations',require('./routes/organizations'));
app.use('/api/users',require('./routes/users'));
app.use('/api/saved',require('./routes/savedResources'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
